import { cookies } from "next/headers"
import jwt from 'jsonwebtoken';
import LogoutButton from "../finance/LogoutButton"
import RedirectHome from "./RedirectHome";


export default async function FinancePage(){
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if(!token){
        return <RedirectHome/>
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET!);
        return(
            <div className="p-10  flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Welcome to the Finance Page</h1>
                    <p>User Name: {(user as any).fullName}</p>
                </div>
                <LogoutButton />
            </div>
            );
        } catch (error) {
            return <div className="p-10 text-red-600">Invalid or expired token</div>;
        }
}