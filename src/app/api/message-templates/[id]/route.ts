import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getMessageTemplateById, updateMessageTemplate, deleteMessageTemplate } from '@/lib/message-templates';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const template = await getMessageTemplateById(params.id);
    
    if (!template) {
      return NextResponse.json({ error: 'Message template not found' }, { status: 404 });
    }
    
    if (template.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    return NextResponse.json({ template });
  } catch (error) {
    console.error(`Error fetching message template ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the message template' },
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
    
    const template = await getMessageTemplateById(params.id);
    
    if (!template) {
      return NextResponse.json({ error: 'Message template not found' }, { status: 404 });
    }
    
    if (template.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    const body = await request.json();
    
    if (!body.name && !body.content) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }
    
    const updatedTemplate = await updateMessageTemplate(params.id, {
      name: body.name,
      content: body.content
    });
    
    return NextResponse.json({ template: updatedTemplate });
  } catch (error) {
    console.error(`Error updating message template ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while updating the message template' },
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
    
    const template = await getMessageTemplateById(params.id);
    
    if (!template) {
      return NextResponse.json({ error: 'Message template not found' }, { status: 404 });
    }
    
    if (template.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    const success = await deleteMessageTemplate(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete message template' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting message template ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the message template' },
      { status: 500 }
    );
  }
}
