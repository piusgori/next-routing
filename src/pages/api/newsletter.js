import { connectDatabase, insertDocument } from "@/helpers/db-util";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;
        if (!email || !email.includes('@')) {
            return res.status(422).json({ message: 'Invalid Email Address' });
        }
        let client;
        try {
            client = await connectDatabase();
        } catch (err) {
            return res.status(500).json({ message: 'Connecting to the database failed' });
        }
        try {
            await insertDocument(client, 'newsletter', { email })
            await client.close();
        } catch (err) {
            return res.status(500).json({ message: 'Inserting data failed' });
        }
        res.status(201).json({ message: 'Signed up' })
    }
};

export default handler;