import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { getMessageTemplateById, updateMessageTemplate, deleteMessageTemplate } from '@/lib/message-templates';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = context.params;
    
    const template = await getMessageTemplateById(id);
    
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    
    if (template.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    return NextResponse.json({ template });
  } catch (error) {
    console.error(`Error fetching template ${context.params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the template' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = context.params;
    const { name, content } = await request.json();
    
    if (!name || !content) {
      return NextResponse.json(
        { error: 'Name and content are required' },
        { status: 400 }
      );
    }
    
    const template = await getMessageTemplateById(id);
    
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    
    if (template.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    const updatedTemplate = await updateMessageTemplate(id, {
      name,
      content,
    });
    
    return NextResponse.json({ template: updatedTemplate });
  } catch (error) {
    console.error(`Error updating template ${context.params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while updating the template' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = context.params;
    
    const template = await getMessageTemplateById(id);
    
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    
    if (template.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    await deleteMessageTemplate(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting template ${context.params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the template' },
      { status: 500 }
    );
  }
}
