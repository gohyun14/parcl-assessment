'use client';

import { type prismaTransaction } from '@/lib/prisma';
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/20/solid';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import Input from '../UI/Input';

const SendForm = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: prismaTransaction) => {
      await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions', publicKey?.toBase58()]);
    },
  });

  const [amount, setAmount] = useState('');
  const debouncedAmount = useDebounce<string>(amount, 300);

  const [recipient, setRecipient] = useState('');
  const debouncedRecipient = useDebounce<string>(recipient, 300);

  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [transactionSignature, setTransactionSignature] = useState('');
  const [transactionConfirmation, setTransactionConfirmation] = useState('');

  const [userBalance, setUserBalance] = useState<number | undefined>();

  useEffect(() => {
    if (publicKey) {
      connection
        .getBalance(publicKey)
        .then((balance) => {
          setUserBalance(balance / 10 ** 9); // Convert lamports to SOL
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserBalance(undefined);
    }
  }, [connection, publicKey]);

  const isRecipientValid = useMemo(() => {
    if (debouncedRecipient === '') return true;

    try {
      new PublicKey(debouncedRecipient);
      return true;
    } catch (err) {
      return false;
    }
  }, [debouncedRecipient]);

  const handleSend = useCallback(async () => {
    if (!publicKey || !isRecipientValid) return;

    setIsTransactionLoading(true);
    setTransactionSignature('');
    setTransactionConfirmation('');

    try {
      const latestBlockHash = await connection.getLatestBlockhash();

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(debouncedRecipient),
          lamports: Number(debouncedAmount) * 10 ** 9,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      setTransactionSignature(signature);

      const confirmation = await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      });

      setTransactionConfirmation(
        confirmation?.value?.err ? 'error' : 'confirmed'
      );

      const transactionInfo = await connection.getTransaction(signature, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 1,
      });

      if (confirmation?.value?.err || !transactionInfo) return;

      mutate({
        signature,
        fromAddress: publicKey.toBase58(),
        toAddress: debouncedRecipient,
        blockTime: transactionInfo?.blockTime?.toString() || '',
        blockNumber: transactionInfo?.slot.toString() || '',
        fee: transactionInfo?.meta?.fee.toString() || '',
        amount: debouncedAmount,
        previousBlockHash:
          transactionInfo?.transaction?.message?.recentBlockhash || '',
      });
    } catch (err) {
      setTransactionConfirmation('error');
    } finally {
      setIsTransactionLoading(false);
    }
  }, [
    publicKey,
    sendTransaction,
    connection,
    debouncedRecipient,
    debouncedAmount,
    isRecipientValid,
    mutate,
  ]);

  return (
    <div className="flex flex-col w-full gap-y-8">
      <h1 className="text-3xl text-zinc-800">Send SOL</h1>
      <Input
        label="Amount"
        description={
          userBalance ? `Balance: ${userBalance.toFixed(2)} SOL` : undefined
        }
        error={
          userBalance !== undefined && Number(debouncedAmount) > userBalance
        }
        errorMessage="Amount exceeds balance"
        value={amount}
        setValue={setAmount}
        isNumber
      />
      <Input
        label="Recipient"
        value={recipient}
        setValue={setRecipient}
        error={!isRecipientValid}
        errorMessage="Recipient address is not valid"
      />
      <motion.button
        type="button"
        disabled={
          !publicKey ||
          !isRecipientValid ||
          debouncedAmount === '' ||
          debouncedRecipient === '' ||
          (userBalance !== undefined && Number(debouncedAmount) > userBalance)
        }
        className="rounded-full mt-1 flex flex-row items-center justify-center bg-fuchsia-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-500 disabled:bg-zinc-400 disabled:cursor-not-allowed"
        onClick={handleSend}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 10,
          mass: 0.25,
        }}
      >
        {isTransactionLoading ? (
          <>
            <span>Sending</span>
            <svg className="ml-1 h-4 w-4 animate-spin rounded-full border-2 border-t-fuchsia-800 text-fuchsia-200" />
          </>
        ) : (
          <>
            <span>Send</span>
            <ArrowRightIcon className="w-5 h-5 ml-1 stroke-2" />
          </>
        )}
      </motion.button>
      {transactionConfirmation !== '' &&
        (transactionConfirmation === 'confirmed' ? (
          <motion.a
            href={`https://solscan.io/tx/${transactionSignature}?cluster=devnet`}
            target="_blank"
            className="p-2 bg-fuchsia-100 text-fuchsia-800 rounded-lg flex flex-col items-start justify-center shadow-sm hover:cursor-pointer hover:bg-fuchsia-200"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: {
                opacity: 1,
                height: 'auto',
                transition: {
                  duration: 0.15,
                  ease: 'easeInOut',
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-row items-center justify-between w-full">
              <h3 className="text-lg font-medium">Success!</h3>
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </div>
            <p className="text-sm">
              Your transaction has been confirmed! Click here to view the
              transaction in SOLScan.
            </p>
          </motion.a>
        ) : (
          <motion.div
            className="p-2 bg-red-100 text-red-600 rounded-lg flex flex-col items-start justify-center shadow-sm hover:cursor-pointer"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: {
                opacity: 1,
                height: 'auto',
                transition: {
                  duration: 0.15,
                  ease: 'easeInOut',
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-lg font-medium">Error!</h3>
            <p className="text-sm">
              There was an error with your transaction. Please check your
              connection, the amount, and your recipient and try again.
            </p>
          </motion.div>
        ))}
    </div>
  );
};

export default SendForm;
