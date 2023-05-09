import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {
    if (req.method !== 'POST') return;
    const { email, password } = req.body;
    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
        return res.status(422).json({ message: 'Invalid input -password should be at least 7 characters long.' });
    }
    const client = await connectToDatabase();
    const db = client.db();
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
        return res.status(422).json({ message: 'User exists already!' })
    }
    const hashedPassword = await hashPassword(password);
    const result = await db.collection('users').insertOne({ email: email, password: hashedPassword });
    res.status(201).json({ message: 'Created user!' });
};

export default handler;