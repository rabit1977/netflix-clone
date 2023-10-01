import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return new NextResponse(`User Email`, { status: 200 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
