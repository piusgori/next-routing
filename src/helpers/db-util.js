import { MongoClient } from "mongodb";

export async function connectDatabase () {
    const client = await MongoClient.connect('mongodb://localhost:27017/events');
    return client;
};

export async function insertDocument (client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client, collection, sort) {
    const db = client.db();
    const result = await db.collection(collection).find().sort(sort).toArray();
    return result;
}