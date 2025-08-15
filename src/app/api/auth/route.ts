// src/api/auth/index.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
// token verification


export async function GET() {
  const { userId } = await auth();
  


  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // User is authenticated
  return NextResponse.json({ message: 'You are authenticated', userId });
}
