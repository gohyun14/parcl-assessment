import { NextResponse } from 'next/server';
import { prisma, type prismaTransaction } from '@/lib/prisma';

export async function POST(req: Request) {
  const data = (await req.json()) as prismaTransaction;

  const transaction = await prisma.transaction.create({
    data: { ...data },
  });

  return NextResponse.json(transaction);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fromAddress = searchParams.get('fromAddress') as string;

  const transactions = await prisma.transaction.findMany({
    where: { fromAddress: fromAddress },
    orderBy: { blockTime: 'desc' },
  });

  return NextResponse.json(transactions);
}
