import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { error } from "console";

const prisma = new PrismaClient();

export async function POST(req:Request) {
    const {email, password} = await req.json();

    try{
        const user = await prisma.user.findUnique({where: {email}});

        if(!user){
            return new Response(JSON.stringify({error: 'Email not found'}), {status: 404});
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            return new Response(JSON.stringify({error: 'Password is incorrect'}), {status: 401});
        }

        return new Response(JSON.stringify({success: true}), {status: 200});
    }catch(error){
        console.error(error);
        return new Response(JSON.stringify({error: 'Server Error'}), {status: 500})
    }
}