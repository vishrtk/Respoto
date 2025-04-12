import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getTriggerWordById, updateTriggerWord, deleteTriggerWord } from '@/lib/trigger-words';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Add this function to the trigger-words.ts file
async function getTriggerWordById(id: string): Promise<any> {
  const db = await connectToDatabase();
  return db.collection('trigger_words').findOne({ _id: new ObjectId(id) });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const triggerWord = await getTriggerWordById(params.id);
    
    if (!triggerWord) {
      return NextResponse.json({ error: 'Trigger word not found' }, { status: 404 });
    }
    
    if (triggerWord.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    return NextResponse.json({ triggerWord });
  } catch (error) {
    console.error(`Error fetching trigger word ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the trigger word' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const triggerWord = await getTriggerWordById(params.id);
    
    if (!triggerWord) {
      return NextResponse.json({ error: 'Trigger word not found' }, { status: 404 });
    }
    
    if (triggerWord.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    const body = await request.json();
    
    const updatedTriggerWord = await updateTriggerWord(params.id, {
      word: body.word?.toLowerCase(),
      responseTemplateId: body.responseTemplateId,
      isActive: body.isActive,
      mediaId: body.mediaId
    });
    
    return NextResponse.json({ triggerWord: updatedTriggerWord });
  } catch (error) {
    console.error(`Error updating trigger word ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while updating the trigger word' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const triggerWord = await getTriggerWordById(params.id);
    
    if (!triggerWord) {
      return NextResponse.json({ error: 'Trigger word not found' }, { status: 404 });
    }
    
    if (triggerWord.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    const success = await deleteTriggerWord(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete trigger word' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting trigger word ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the trigger word' },
      { status: 500 }
    );
  }
}
