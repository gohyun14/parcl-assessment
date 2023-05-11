import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export type prismaTransaction = {
  signature: string;
  fromAddress: string;
  toAddress: string;
  blockTime: string;
  blockNumber: string;
  fee: string;
  amount: string;
  previousBlockHash: string;
};
