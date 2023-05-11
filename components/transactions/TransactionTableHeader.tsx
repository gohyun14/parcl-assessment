import { ChevronDownIcon } from '@heroicons/react/20/solid';

const headerColums = ['Signature', 'To', 'Time'];

const TransactionTableHeader = () => {
  return (
    <header className="flex flex-row rounded-t-md border-b border-b-gray-300 bg-gray-100">
      <div className="group flex w-[33.3%] sm:w-[40%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
        Signature
      </div>
      <div className="group flex w-[33.3%] sm:w-[40%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
        To
      </div>
      <div className="group flex w-[33.3%] sm:w-[20%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
        Time
      </div>
    </header>
  );
};

export default TransactionTableHeader;
