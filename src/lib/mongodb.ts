import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/instagram-auto-responder';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  // If no connection, create a new one
  const client = new MongoClient(MONGODB_URI);
  
  await client.connect();
  
  const db = client.db();
  
  // Cache the client and connection
  cachedClient = client;
  cachedDb = db;
  
  return db;
}

export default connectToDatabase;
