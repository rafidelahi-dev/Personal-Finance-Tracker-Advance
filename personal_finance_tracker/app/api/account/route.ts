import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function POST(req:Request) {
    try{
        const {userId, budget} = await req.json();

        const existing = await prisma.account.findUnique({
            where: {userId: Number(userId)},
        });

        if(existing){
            return new Response(JSON.stringify({error: "Account already exixts"}), {
                status: 400
            });
        }

        await prisma.account.create({
            data:{
                userId: Number(userId),
                budget: parseFloat(budget),
            }
        });

        return new Response(JSON.stringify({success: true}), {
            status: 201
        });
    }catch(error){
        console.error(error);
        return new Response(JSON.stringify({error: "Failed to create account"}), {
            status: 500,
        });
    }
}