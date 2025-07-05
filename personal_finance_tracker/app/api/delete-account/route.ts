import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
type JwtPayload = {
  userId: string;
  email: string;
  fullName: string;
};


export async function DELETE() {
    try{
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        if(!token){
            return new Response(JSON.stringify({error: 'Unauthorized'}), {status: 401});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const userId = Number(decoded.userId);


        await prisma.payment.deleteMany({
            where: {
                account: {
                    userId,
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