import { type prismaTransaction } from '@/lib/prisma';
import moment from 'moment';

type AssetTableRowProps = {
  transaction: prismaTransaction;
};

const TransactionTableRow = ({ transaction }: AssetTableRowProps) => {
  return (
    <div className="flex flex-row">
      <div className="w-[33.3%] sm:w-[40%] py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 overflow-ellipsis overflow-hidden">
        {transaction.signature}
      </div>
      <div className="w-[33.3%] sm:w-[40%] py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6 overflow-hidden overflow-ellipsis">
        {transaction.toAddress}
      </div>
      <div className=" w-[33.3%]sm:w-[20%] py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6 overflow-ellipsis">
        {moment
          .unix(Number(transaction.blockTime))
          .format('YYYY-MM-DD HH:mm:ss')}
      </div>
    </div>
  );
};

export default TransactionTableRow;
