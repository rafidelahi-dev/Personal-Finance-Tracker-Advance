import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }
        const existingUser = await prisma.user.findUnique({where: {email}});
        if(existingUser){
            return new Response(JSON.stringify({error: "Email already in use"}), {status: 400});
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                fullName,
                email, 
                password: hashedpassword,
            },
        });
        return new Response(JSON.stringify({ success: true, userId: newUser.id }), { status: 201 });
    }catch (error) {
    console.error("[SIGNUP ERROR]", error); // ✅ log actual error
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}