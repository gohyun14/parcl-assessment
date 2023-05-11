'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { type prismaTransaction } from '@/lib/prisma';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import TransactionsTable from '@/components/transactions/TransactionsTable';

export default function Transactions() {
  const { publicKey, connected } = useWallet();

  const { data: transactionData, isLoading } = useQuery({
    queryKey: ['transactions', publicKey],
    queryFn: async () => {
      const res = await fetch(
        `/api/transaction?fromAddress=${publicKey?.toBase58()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      return data as prismaTransaction[];
    },
    enabled: connected && !!publicKey,
  });

  return (
    <>
      {connected && !!publicKey ? (
        <main className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
          <TransactionsTable
            transactions={transactionData}
            isLoading={isLoading}
          />
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center">
            <div className="flex flex-col items-center text-2xl mx-4 py-4 px-2 font-medium text-fuchsia-800 text-center sm:text-3xl rounded-lg bg-fuchsia-100">
              <ExclamationTriangleIcon className="h-16 w-16" />
              <p>
                It looks like you are not connected. Please connect a wallet to
                view your transactions!
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
