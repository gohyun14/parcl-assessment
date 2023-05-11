'use client';

import Link from 'next/link';

import SendForm from '@/components/send/SendForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center p-6 border bg-white border-zinc-300 drop-shadow-lg rounded-lg w-10/12 max-w-[25rem] sm:w-[27rem] sm:max-w-none">
          <SendForm />
        </div>
      </div>
    </main>
  );
}
