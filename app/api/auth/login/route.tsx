import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request) {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
            status: 401,
        });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
            status: 401,
        });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.NEXTAUTH_SECRET, {
        expiresIn: '1h',
    });

    return new Response(JSON.stringify({ token }), { status: 200 });
}
