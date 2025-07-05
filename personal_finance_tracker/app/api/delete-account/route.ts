import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function DELETE() {
    try{
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        if(!token){
            return new Response(JSON.stringify({error: 'Unauthorized'}), {status: 401});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = (decoded as any).userId;

        await prisma.payment.deleteMany({
            where: {
                account: {
                    userId
                }
            }
        });

        await prisma.account.delete({
            where: {userId}
        });

        (await cookieStore).delete('token');

        return new Response(JSON.stringify({success: true}), {status: 200});


    }catch(error){
        console.error(error)
        return new Response(JSON.stringify({error: 'Failed to delete account'}), {status: 500});
    }
}