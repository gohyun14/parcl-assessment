'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useRouter, usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { publicKey } = useWallet();
  const pathname = usePathname();

  return (
    <>
      <Link
        href={pathname.includes('transactions') ? '/' : '/transactions'}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 sm:bottom-8 sm:left-9 sm:translate-x-0"
      >
        <motion.button
          type="button"
          className="rounded-full mt-1 flex flex-row items-center justify-center bg-fuchsia-600 px-3.5 py-2.5 sm:px-6 sm:py-3 sm:text-lg font-semibold text-white shadow-md hover:bg-fuchsia-500 disabled:bg-zinc-400 disabled:cursor-not-allowed"
          whileTap={{
            scale: 0.9,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10,
            mass: 0.25,
          }}
        >
          {pathname.includes('transactions') ? 'Send SOL' : 'View Transactions'}
        </motion.button>
      </Link>
      <div className="absolute right-1 top-1 bg-slate-700 rounded">
        {!publicKey ? <WalletMultiButton /> : <WalletDisconnectButton />}
      </div>
    </>
  );
};

export default Navbar;
