import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export async function GET(req) {
  const users = await prisma.user.findMany();

  return NextResponse.json({ users });
}

export async function POST(req) {
  //await new Promise((r) => setTimeout(r, 2000));
  const { data } = await req.json();

  const mySchema = z.object({
    firstname: z.string().min(3),
    lastname: z.string().min(3),
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

  const mySchema = z.object({
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    email: z.string().email(),
  });

  const validate = mySchema.safeParse(data);

  if (validate.success == false) {
    return NextResponse.json({
      error: `${validate.error.issues[0].path[0]} : ${validate.error.issues[0].message}`,
    });
  }

  try {
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

export async function DELETE(req) {
  const { id } = await req.json();

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
