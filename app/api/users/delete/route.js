import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const id = parseInt(req.nextUrl.searchParams.get("id"));

  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ data: deleteUser });
  } catch (e) {
    if (e.code == "P2025") {
      return NextResponse.json({ error: e.meta.cause });
    } else {
      return NextResponse.json({ error: "Unkown Error" });
    }
  }
}
