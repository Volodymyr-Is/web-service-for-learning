import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
    const { email, password, confirmPassword, name } = await request.json();

    if (password !== confirmPassword) {
        return new Response(JSON.stringify({ error: 'Passwords do not match' }), {
            status: 400,
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return new Response(JSON.stringify({ error: 'User already exists' }), {
            status: 400,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    return new Response(JSON.stringify({ user: { id: user.id, email: user.email } }), {
        status: 201,
    });
}
