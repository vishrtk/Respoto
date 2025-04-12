import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { CommentMonitoringService } from '@/lib/comment-monitoring';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
    
    const commentMonitoringService = new CommentMonitoringService();
    const logs = await commentMonitoringService.getResponseLogs(session.user.id, limit);
    
    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Error getting response logs:', error);
    return NextResponse.json(
      { error: 'An error occurred while getting response logs' },
      { status: 500 }
    );
  }
}
