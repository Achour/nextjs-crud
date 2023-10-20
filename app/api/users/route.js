import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export async function GET(req) {
  const users = await prisma.user.findMany();

  return NextResponse.json({ users });
}

export async function POST(req) {
  const { data } = await req.json();

  const mySchema = z.object({
    firstname: z.string().min(5),
    lastname: z.string().min(5),
    email: z.string().email(),
  });

  const validate = mySchema.safeParse(data);

  if (validate.success == false) {
    return NextResponse.json({
      error: `${validate.error.issues[0].path[0]} : ${validate.error.issues[0].message}`,
    });
  }

  try {
    await prisma.user.create({
      data: data,
    });
    return NextResponse.json({
      code: "created",
      message: "successfully created",
      data: data,
    });
  } catch (e) {
    if (e.code == "P2002") {
      return NextResponse.json({
        error: "Email address already in use",
      });
    }
    return NextResponse.json({
      error: "Unkown Error",
    });
  }
}

export async function PUT(req) {
  const { data } = await req.json();
  const updateUser = await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    },
  });

  return NextResponse.json({ message: updateUser });
}
