import { cookies } from "next/headers"
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
import RedirectHome from "./RedirectHome";
import FinanceClient from "./FinanceClient";


export default async function FinancePage(){
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    const prisma = new PrismaClient();

    if(!token){
        return <RedirectHome/>
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = (decoded as any).userId;

        const account = await prisma.account.findUnique({
            where: {userId},
        })

        let payments: {
        id: string;
        amount: number;
        description: string;
        date: Date;
        category: 'MONTHLY' | 'EXTERNAL';
        }[] = [];


        if(account){
            payments = await prisma.payment.findMany({
                where: {accountId: account.id},
                orderBy: {date: "desc"},
                take: 5,
            });
        };

        return <FinanceClient user={decoded} account={account} payments={payments} />
        } catch (error) {
            return <div className="p-10 text-red-600">Invalid or expired token</div>;
        }
}