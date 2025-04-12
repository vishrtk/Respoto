import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { InstagramApiClient } from '@/lib/instagram-api';
import { getTriggerWordsByMedia, renderMessageTemplate } from '@/lib/trigger-words';
import { getMessageTemplateById } from '@/lib/message-templates';

// Verify webhook
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === process.env.INSTAGRAM_WEBHOOK_SECRET) {
      // Respond with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      return new NextResponse(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return new NextResponse('Bad Request', { status: 400 });
}

// Process webhook notifications
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Make sure this is a page subscription
    if (body.object !== 'instagram') {
      return new NextResponse('Not an Instagram webhook', { status: 400 });
    }

    // Process each entry
    for (const entry of body.entry) {
      // Process each change
      for (const change of entry.changes) {
        // Only process comment changes
        if (change.field === 'comments') {
          await processComment(change.value);
        }
      }
    }

    return new NextResponse('EVENT_RECEIVED');
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Error processing webhook', { status: 500 });
  }
}

// Process a new comment
async function processComment(commentData: any) {
  try {
    const db = await connectToDatabase();
    
    // Extract data from the comment
    const { id: commentId, media_id: mediaId, text: commentText, username: commenterUsername, from } = commentData;
    
    // Check if we've already processed this comment
    const existingComment = await db.collection('processed_comments').findOne({ commentId });
    
    if (existingComment) {
      console.log(`Comment ${commentId} already processed`);
      return;
    }
    
    // Mark comment as processed
    await db.collection('processed_comments').insertOne({
      commentId,
      mediaId,
      processedAt: new Date().toISOString()
    });
    
    // Get the Instagram account associated with this media
    const mediaAccount = await db.collection('instagram_accounts').findOne({ mediaIds: mediaId });
    
    if (!mediaAccount) {
      console.log(`No Instagram account found for media ${mediaId}`);
      return;
    }
    
    const userId = mediaAccount.userId;
    const accessToken = mediaAccount.accessToken;
    
    // Get trigger words for this media
    const triggerWords = await getTriggerWordsByMedia(userId, mediaId);
    
    if (!triggerWords.length) {
      console.log(`No trigger words found for media ${mediaId}`);
      return;
    }
    
    // Check if comment contains any trigger words
    const lowerCaseComment = commentText.toLowerCase();
    
    for (const trigger of triggerWords) {
      if (lowerCaseComment.includes(trigger.word.toLowerCase())) {
        // Get the message template
        const template = await getMessageTemplateById(trigger.responseTemplateId);
        
        if (!template) {
          console.log(`Template ${trigger.responseTemplateId} not found`);
          continue;
        }
        
        // Render the template with variables
        const message = renderMessageTemplate(template.content, {
          username: commenterUsername,
          comment: commentText,
          post: mediaId // You might want to get the post caption here
        });
        
        // Send the response
        const instagramClient = new InstagramApiClient(accessToken);
        await instagramClient.sendPrivateReply(commentId, message);
        
        // Log the response
        await db.collection('response_logs').insertOne({
          userId,
          mediaId,
          commentId,
          commentText,
          commenterUsername,
          responseMessage: message,
          triggerWord: trigger.word,
          respondedAt: new Date().toISOString()
        });
        
        console.log(`Sent response to comment ${commentId}`);
        break; // Stop after first matching trigger word
      }
    }
  } catch (error) {
    console.error('Error processing comment:', error);
    throw error;
  }
}
