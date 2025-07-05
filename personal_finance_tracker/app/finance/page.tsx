import { cookies } from "next/headers"
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
import RedirectHome from "./RedirectHome";
import FinanceClient from "./FinanceClient";
import type { JwtPayload } from "@/lib/types";


export default async function FinancePage(){
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    const prisma = new PrismaClient();

    if(!token){
        return <RedirectHome/>
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const userId = Number(decoded.userId);


        const account = await prisma.account.findUnique({
            where: {userId},
        })

        let payments: {
        id: string;
        amount: number;
        description: string;
        date: string;
        category: 'MONTHLY' | 'EXTERNAL';
        }[] = [];


        if (account) {
            const rawPayments = await prisma.payment.findMany({
                where: { accountId: account.id },
                orderBy: { date: "desc" },
                take: 5,
            });

            payments = rawPayments.map((p) => ({
                id: p.id,
                amount: p.amount,
                description: p.description,
                date: p.date.toISOString(), // ✅ convert Date to string
                category: p.category, // "MONTHLY" | "EXTERNAL"
            }));
        }
        return <FinanceClient user={decoded} account={account} payments={payments} />
        } catch (error) {
            console.error(error);
            return <div className="p-10 text-red-600">Invalid or expired token</div>;
        }
}