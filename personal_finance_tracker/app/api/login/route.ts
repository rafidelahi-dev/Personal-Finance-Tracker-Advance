import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req:Request) {
    const {email, password} = await req.json();

    try{
        console.log('[LOGIN] Received:', { email });
        const user = await prisma.user.findUnique({where: {email}});

        if(!user){
            console.log('[LOGIN] User not found');
            return new Response(JSON.stringify({error: 'Email not found'}), {status: 404});
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            console.log('[LOGIN] Password incorrect');
            return new Response(JSON.stringify({error: 'Password is incorrect'}), {status: 401});
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, fullName: user.fullName },
            process.env.JWT_SECRET!,
            {expiresIn: '5m'}
        )

        console.log('[LOGIN] Token created');

        return new Response(JSON.stringify({success: true}), {
            status: 200,
            headers: {
                'Set-Cookie': `token=${token}; httpOnly; Path=/; Max-Age=300; SameSite=Stict`,
            },
        });
    }catch(error){
        console.error(error);
        return new Response(JSON.stringify({error: 'Server Error'}), {status: 500})
    }
}