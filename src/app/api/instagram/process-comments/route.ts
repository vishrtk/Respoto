import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { CommentMonitoringService } from '@/lib/comment-monitoring';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    if (!body.mediaId) {
      return NextResponse.json(
        { error: 'Missing required field: mediaId' },
        { status: 400 }
      );
    }
    
    // Get the user's Instagram account
    const db = await connectToDatabase();
    const instagramAccount = await db.collection('instagram_accounts').findOne({
      userId: session.user.id
    });
    
    if (!instagramAccount) {
      return NextResponse.json(
        { error: 'No Instagram account connected' },
        { status: 400 }
      );
    }
    
    // Process comments
    const commentMonitoringService = new CommentMonitoringService();
    const responseCount = await commentMonitoringService.processNewComments(
      session.user.id,
      body.mediaId,
      instagramAccount.accessToken
    );
    
    return NextResponse.json({ responseCount });
  } catch (error) {
    console.error('Error processing comments:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing comments' },
      { status: 500 }
    );
  }
}
