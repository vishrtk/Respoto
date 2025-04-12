import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { createMessageTemplate, getMessageTemplatesByUser } from '@/lib/message-templates';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const templates = await getMessageTemplatesByUser(session.user.id);
    
    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error fetching message templates:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching message templates' },
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
    
    if (!body.name || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields: name, content' },
        { status: 400 }
      );
    }
    
    const template = await createMessageTemplate({
      userId: session.user.id,
      name: body.name,
      content: body.content
    });
    
    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error('Error creating message template:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the message template' },
      { status: 500 }
    );
  }
}
