import { connectToDatabase } from './mongodb';
import { InstagramApiClient } from './instagram-api';
import { getTriggerWordsByMedia } from './trigger-words';
import { getMessageTemplateById } from './message-templates';

export class CommentMonitoringService {
  private db: any;
  
  constructor() {
    // Initialize database connection
    connectToDatabase().then(db => {
      this.db = db;
    });
  }
  
  /**
   * Process new comments for a specific media
   */
  async processNewComments(userId: string, mediaId: string, accessToken: string): Promise<number> {
    try {
      // Ensure database is initialized
      if (!this.db) {
        this.db = await connectToDatabase();
      }
      
      // Get Instagram API client
      const instagramClient = new InstagramApiClient(accessToken);
      
      // Get comments for the media
      const commentsResponse = await instagramClient.getMediaComments(mediaId);
      
      if (!commentsResponse.data || commentsResponse.data.length === 0) {
        console.log(`No comments found for media ${mediaId}`);
        return 0;
      }
      
      // Get trigger words for this media
      const triggerWords = await getTriggerWordsByMedia(userId, mediaId);
      
      if (!triggerWords.length) {
        console.log(`No trigger words found for media ${mediaId}`);
        return 0;
      }
      
      let responseCount = 0;
      
      // Process each comment
      for (const comment of commentsResponse.data) {
        // Check if we've already processed this comment
        const existingComment = await this.db.collection('processed_comments').findOne({ commentId: comment.id });
        
        if (existingComment) {
          continue;
        }
        
        // Mark comment as processed
        await this.db.collection('processed_comments').insertOne({
          commentId: comment.id,
          mediaId,
          processedAt: new Date().toISOString()
        });
        
        // Check if comment contains any trigger words
        const lowerCaseComment = comment.text.toLowerCase();
        
        for (const trigger of triggerWords) {
          if (lowerCaseComment.includes(trigger.word.toLowerCase())) {
            // Get the message template
            const template = await getMessageTemplateById(trigger.responseTemplateId);
            
            if (!template) {
              console.log(`Template ${trigger.responseTemplateId} not found`);
              continue;
            }
            
            // Render the template with variables
            const message = template.content.replace(/{{username}}/g, comment.username)
              .replace(/{{comment}}/g, comment.text);
            
            // Send the response
            await instagramClient.sendPrivateReply(comment.id, message);
            
            // Log the response
            await this.db.collection('response_logs').insertOne({
              userId,
              mediaId,
              commentId: comment.id,
              commentText: comment.text,
              commenterUsername: comment.username,
              responseMessage: message,
              triggerWord: trigger.word,
              respondedAt: new Date().toISOString()
            });
            
            responseCount++;
            break; // Stop after first matching trigger word
          }
        }
      }
      
      return responseCount;
    } catch (error) {
      console.error(`Error processing comments for media ${mediaId}:`, error);
      throw error;
    }
  }
  
  /**
   * Get response logs for a user
   */
  async getResponseLogs(userId: string, limit = 50): Promise<any[]> {
    try {
      // Ensure database is initialized
      if (!this.db) {
        this.db = await connectToDatabase();
      }
      
      const logs = await this.db.collection('response_logs')
        .find({ userId })
        .sort({ respondedAt: -1 })
        .limit(limit)
        .toArray();
      
      return logs;
    } catch (error) {
      console.error(`Error getting response logs for user ${userId}:`, error);
      throw error;
    }
  }
}
