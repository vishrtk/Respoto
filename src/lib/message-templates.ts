import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

export interface MessageTemplate {
  _id?: string | ObjectId;
  userId: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export async function createMessageTemplate(template: Omit<MessageTemplate, '_id' | 'createdAt' | 'updatedAt'>): Promise<MessageTemplate> {
  const db = await connectToDatabase();
  
  const now = new Date().toISOString();
  
  const newTemplate = {
    ...template,
    createdAt: now,
    updatedAt: now
  };
  
  const result = await db.collection('message_templates').insertOne(newTemplate);
  
  return {
    ...newTemplate,
    _id: result.insertedId
  };
}

export async function getMessageTemplatesByUser(userId: string): Promise<MessageTemplate[]> {
  const db = await connectToDatabase();
  
  const templates = await db
    .collection('message_templates')
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
  
  return templates as unknown as MessageTemplate[];
}

export async function getMessageTemplateById(id: string): Promise<MessageTemplate | null> {
  const db = await connectToDatabase();
  
  const template = await db
    .collection('message_templates')
    .findOne({ _id: new ObjectId(id) });
  
  return template as unknown as MessageTemplate | null;
}

export async function updateMessageTemplate(id: string, updates: Partial<MessageTemplate>): Promise<MessageTemplate | null> {
  const db = await connectToDatabase();
  
  const now = new Date().toISOString();
  
  const result = await db
    .collection('message_templates')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updates,
          updatedAt: now
        } 
      },
      { returnDocument: 'after' }
    );
  
  return result.value as unknown as MessageTemplate | null;
}

export async function deleteMessageTemplate(id: string): Promise<boolean> {
  const db = await connectToDatabase();
  
  const result = await db
    .collection('message_templates')
    .deleteOne({ _id: new ObjectId(id) });
  
  return result.deletedCount === 1;
}

export function renderMessageTemplate(template: string, variables: Record<string, string>): string {
  let renderedTemplate = template;
  
  for (const [key, value] of Object.entries(variables)) {
    renderedTemplate = renderedTemplate.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  
  return renderedTemplate;
}
