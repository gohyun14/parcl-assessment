import React, { useState, useEffect } from 'react';
import { type prismaTransaction } from '@/lib/prisma';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

import TransactionTableHeader from './TransactionTableHeader';
import TransactionTableRow from './TransactionTableRow';
import LoadingRow from './LoadingRow';
import TransactionDetails from './TransactionDetails';
import Modal from '../UI/Modal';
import AutoComplete from '../UI/AutoComplete';

type TransactionsTableProps = {
  transactions: prismaTransaction[] | undefined;
  isLoading: boolean;
};

const TransactionsTable = ({
  transactions,
  isLoading,
}: TransactionsTableProps) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<prismaTransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState('All');
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  useEffect(() => {
    if (selectedSearch === 'All') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions?.filter(
          (transaction) => transaction.signature === selectedSearch
        )
      );
    }
  }, [selectedSearch, transactions]);

  return (
    <>
      <div className="mt-14">
        <div className="mb-5 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900">
              Transactions
            </h1>
            <p className="mt-2 sm:text-xl text-zinc-700">
              A list of all the transactions you have made using this
              application.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:flex-none sm:w-80">
            <h2 className="sm:text-lg font-medium text-zinc-800">Search</h2>
            <AutoComplete
              options={
                transactions
                  ? [
                      'All',
                      ...transactions?.map(
                        (transaction) => transaction.signature
                      ),
                    ]
                  : ['All']
              }
              selected={selectedSearch}
              setSelected={setSelectedSearch as () => void}
            />
          </div>
        </div>
        <div className="flex flex-col rounded-md border border-gray-300 shadow-md">
          <TransactionTableHeader />
          <ul className="max-h-[77vh] divide-y divide-gray-300 overflow-y-auto rounded-b-md text-left">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => <LoadingRow key={i} />)
            ) : transactions && transactions.length > 0 ? (
              filteredTransactions?.map((transaction, index) => (
                <motion.li
                  key={transaction.signature}
                  className="hover:cursor-pointer bg-white hover:bg-fuchsia-100 transition-colors duration-200 ease-in-out"
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setIsModalOpen(true);
                  }}
                  variants={{
                    hidden: (index) => ({ opacity: 0, y: -50 * index }),
                    visible: (index) => ({
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.075 },
                    }),
                    removed: { opacity: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="removed"
                  custom={index}
                >
                  <TransactionTableRow transaction={transaction} />
                </motion.li>
              ))
            ) : (
              <li className="flex flex-row">
                <div className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 overflow-ellipsis overflow-hidden">
                  No transactions found. Please send some SOL to see your
                  transactions.
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        {selectedTransaction && (
          <TransactionDetails
            transaction={selectedTransaction}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default TransactionsTable;
