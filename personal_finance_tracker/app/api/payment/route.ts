import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req:Request) {
    const {amount, description, date, category, accountId} = await req.json();

    try{
        await prisma.payment.create({
            data: {
                amount: parseFloat(amount),
                description,
                date: new Date(date),
                category,
                accountId,
            },
        });

        return new Response(JSON.stringify({success: true}), {status: 201});
    }catch(error){
        console.error(error);
        return new Response(JSON.stringify({error: 'Failed to add payment'}), {status: 500});
    }
}

