import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

export interface TriggerWord {
  _id?: string | ObjectId;
  userId: string;
  mediaId: string;
  word: string;
  responseTemplateId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function createTriggerWord(triggerWord: Omit<TriggerWord, '_id' | 'createdAt' | 'updatedAt'>): Promise<TriggerWord> {
  const db = await connectToDatabase();
  
  const now = new Date().toISOString();
  
  const newTriggerWord = {
    ...triggerWord,
    createdAt: now,
    updatedAt: now
  };
  
  const result = await db.collection('trigger_words').insertOne(newTriggerWord);
  
  return {
    ...newTriggerWord,
    _id: result.insertedId
  };
}

export async function getTriggerWordsByUser(userId: string): Promise<TriggerWord[]> {
  const db = await connectToDatabase();
  
  const triggerWords = await db
    .collection('trigger_words')
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
  
  return triggerWords as unknown as TriggerWord[];
}

export async function getTriggerWordsByMedia(userId: string, mediaId: string): Promise<TriggerWord[]> {
  const db = await connectToDatabase();
  
  const triggerWords = await db
    .collection('trigger_words')
    .find({ userId, mediaId, isActive: true })
    .toArray();
  
  return triggerWords as unknown as TriggerWord[];
}

export async function getTriggerWordById(id: string): Promise<TriggerWord | null> {
  const db = await connectToDatabase();
  
  const triggerWord = await db
    .collection('trigger_words')
    .findOne({ _id: new ObjectId(id) });
  
  return triggerWord as unknown as TriggerWord | null;
}

export async function updateTriggerWord(id: string, updates: Partial<TriggerWord>): Promise<TriggerWord | null> {
  const db = await connectToDatabase();
  
  const now = new Date().toISOString();
  
  const result = await db
    .collection('trigger_words')
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
  
  return result.value as unknown as TriggerWord | null;
}

export async function deleteTriggerWord(id: string): Promise<boolean> {
  const db = await connectToDatabase();
  
  const result = await db
    .collection('trigger_words')
    .deleteOne({ _id: new ObjectId(id) });
  
  return result.deletedCount === 1;
}
