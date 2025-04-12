import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { createTriggerWord, getTriggerWordsByUser } from '@/lib/trigger-words';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const triggerWords = await getTriggerWordsByUser(session.user.id);
    
    return NextResponse.json({ triggerWords });
  } catch (error) {
    console.error('Error fetching trigger words:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching trigger words' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    if (!body.mediaId || !body.word || !body.responseTemplateId) {
      return NextResponse.json(
        { error: 'Missing required fields: mediaId, word, responseTemplateId' },
        { status: 400 }
      );
    }
    
    const triggerWord = await createTriggerWord({
      userId: session.user.id,
      mediaId: body.mediaId,
      word: body.word.toLowerCase(),
      responseTemplateId: body.responseTemplateId,
      isActive: body.isActive !== undefined ? body.isActive : true
    });
    
    return NextResponse.json({ triggerWord }, { status: 201 });
  } catch (error) {
    console.error('Error creating trigger word:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the trigger word' },
      { status: 500 }
    );
  }
}
