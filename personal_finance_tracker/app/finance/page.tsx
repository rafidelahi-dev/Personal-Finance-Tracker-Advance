import { cookies } from "next/headers"
import jwt from 'jsonwebtoken';


export default async function FinancePage(){
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if(!token){
        return <div className="p-10 text-red-600">Unauthorized: No session</div>
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET!);
        return(
            <div className="p-10">
                <h1 className="text-3xl font-bold">Welcome to the Finance Page</h1>
                <p>User Email: {(user as any).email}</p>
            </div>
            );
        } catch (error) {
            return <div className="p-10 text-red-600">Invalid or expired token</div>;
        }
}