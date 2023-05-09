import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017/authentication');
    return client;
}