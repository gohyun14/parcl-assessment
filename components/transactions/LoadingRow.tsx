const LoadingRow = () => {
  return (
    <li className="group flex flex-col bg-white last:rounded-b-md hover:cursor-pointer">
      <div className="flex basis-full animate-pulse flex-row p-4">
        <div className="w-[40%] rounded-full">
          <div className="h-2 w-5/6 rounded-full bg-fuchsia-600 bg-opacity-40 py-3 pl-4 pr-3"></div>
        </div>
        <div className="w-[40%] rounded-full">
          <div className="h-2 w-2/3 rounded-full bg-fuchsia-600 bg-opacity-40 py-3 pl-8 pr-3"></div>
        </div>
        <div className="w-[20%] rounded-full">
          <div className="h-2 w-3/4 rounded-full bg-fuchsia-600 bg-opacity-40 py-3 pl-8 pr-3"></div>
        </div>
      </div>
    </li>
  );
};

export default LoadingRow;
