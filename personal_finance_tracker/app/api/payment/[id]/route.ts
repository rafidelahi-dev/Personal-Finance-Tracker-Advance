import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req:Request, {params}: {params: {id:string}}) {
   try{
    const {id} = params;

    await prisma.payment.delete({
        where: {id},
    });
    return new Response(JSON.stringify({success: true}), {status: 201});
   }catch(error){
    console.error(error);
    return new Response(JSON.stringify({error: 'Delete Failed'}), {status: 500});
   }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { amount, description, date, category } = await req.json();

  try {
    await prisma.payment.update({
      where: { id },
      data: {
        amount: parseFloat(amount),
        description,
        date: new Date(date),
        category,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Edit payment error:", err);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}
