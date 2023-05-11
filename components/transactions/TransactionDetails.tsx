import React from 'react';
import { type prismaTransaction } from '@/lib/prisma';
import moment from 'moment';
import {
  PencilIcon,
  CubeIcon,
  ClockIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid';

type TransactionDetailsProps = {
  transaction: prismaTransaction;
  onClose: () => void;
};

const TransactionDetails = ({
  transaction,
  onClose,
}: TransactionDetailsProps) => {
  return (
    <div>
      <h3 className="text-xl font-medium leading-6 text-zinc-900">
        Transaction details
      </h3>
      <div className="mt-4 flex flex-row gap-x-8">
        <div className="flex flex-col text-sm text-zinc-500 gap-y-3 overflow-x-hidden break-words">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-[23%] flex flex-row items-center h-min mb-1 sm:mb-0">
              <PencilIcon className="h-3 w-3 mr-1" />
              <span>Signature</span>
            </div>
            <p className="sm:w-[77%] text-zinc-700 font-medium">
              {transaction.signature}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-[23%] flex flex-row items-center h-min mb-1 sm:mb-0">
              <CubeIcon className="h-3 w-3 mr-1" />
              <span>Block</span>
            </div>
            <p className="sm:w-[77%] text-zinc-700 font-medium">
              #{transaction.blockNumber}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-[23%] flex flex-row items-center h-min mb-1 sm:mb-0">
              <ClockIcon className="h-3 w-3 mr-1" />
              <span>Timestamp</span>
            </div>
            <p className="sm:w-[77%] text-zinc-700 font-medium">
              {moment
                .unix(Number(transaction.blockTime))
                .format('YYYY-MM-DD HH:mm:ss')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-[23%] flex flex-row items-center h-min mb-1 sm:mb-0">
              <ArrowUpCircleIcon className="h-3 w-3 mr-1" />
              <span>Sender</span>
            </div>
            <p className="sm:w-[77%] text-zinc-700 font-medium">
              {transaction.fromAddress}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-[23%] flex flex-row items-center h-min mb-1 sm:mb-0">
              <ArrowDownCircleIcon className="h-3 w-3 mr-1" />
              <span>Recipient</span>
            </div>
            <p className="sm:w-[77%] text-zinc-700 font-medium">
              {transaction.toAddress}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-[23%] flex flex-row items-center h-min mb-1 sm:mb-0">
              <BanknotesIcon className="h-3 w-3 mr-1" />
              <span>Amount</span>
            </div>
            <p className="sm:w-[77%] text-zinc-700 font-medium">
              {transaction.amount} SOL
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-[23%] flex flex-row items-center h-min mb-1 sm:mb-0">
              <CurrencyDollarIcon className="h-3 w-3 mr-1" />
              <span>Fee</span>
            </div>
            <p className="sm:w-[77%] text-zinc-700 font-medium">
              {Number(transaction.fee) / 10 ** 9} SOL
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-fuchsia-100 px-4 py-2 text-sm font-medium text-fuchsia-800 hover:bg-fuchsia-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
