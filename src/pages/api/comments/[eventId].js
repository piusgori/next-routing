import { connectDatabase, getAllDocuments, insertDocument } from "@/helpers/db-util";


const handler = async (req, res) => {
    const { eventId } = req.query;

    let client;

    try {
        client = await connectDatabase();
    } catch (err) {
        return res.status(500).json({ message: 'Connecting to db failed' })
    }


    if (req.method === 'POST') {
        const { email, name, text } = req.body;
        if (!email.includes('@') || !name || name.trim === '' || !text || text.trim === '') {
            await client.close();
            return res.status(422).json({ message: 'Invalid input' });
        }
        const newComment = { email, name, text, eventId };
        let result;
        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({ message: 'Added comment', comment: newComment })
        } catch (err) {
            res.status(500).json({ message: 'Inserting comment failed' });
        }
    }
    if (req.method === 'GET') {
        try {
            const result = await getAllDocuments(client, 'comments', { _id: -1 });
            res.status(200).json({ comments: result });
        } catch (err) {
            res.status(500).json({ message: 'Getting comments failed' });
        }
    }
    await client.close();
}

export default handler;