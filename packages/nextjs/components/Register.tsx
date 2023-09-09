/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEventHandler, useEffect, useState } from "react";
import FactoryABI from "../utils/utils/factoryAbi.json";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

const Register = () => {
  const [symbol, setSymbol] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [unitAmount, setUnitAmount] = useState<number>(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    write?.();
    console.log("Successful");
  };

  const { config } = usePrepareContractWrite({
    address: "0x9f272C9F9578E288D9c4a153E449Bf729f5f3a43",
    abi: FactoryABI,
    functionName: "createDisco",
    args: [name, unitAmount],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const {
    data: sendWaitData,
    isError: errorWaitData,
    isLoading: loadWaitData,
  } = useWaitForTransaction({
    hash: data?.hash,

    onError(error) {
      console.log("Error Message: ", error);
    },

    onSuccess(data) {
      console.log("Success: ", data);
    },
  });

  if (sendWaitData) {
    console.log("Your wait data is ", sendWaitData);
  }

  return (
    <div className=" bg-[#F5F6FF] flex flex-col items-center justify-center h-screen">
      <div className="mb-10">
        <h1 className="flex items-center text-5xl font-extrabold text-gray-800 dark:text-black">
          Register Your Company with
          <span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">
            METRO
          </span>
        </h1>
      </div>
      <form onSubmit={handleSubmit} className=" bg-slate-900 rounded-2xl h-4/6 w-4/6 p-9">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium  text-white dark:text-white">
              Company Symbol
            </label>
            <input
              type="text"
              id="company"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="IBEDC"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value)}
              value={symbol}
              required
            />
          </div>
          <div>
            <label htmlFor="rate" className="block mb-2 text-sm font-medium text-white dark:text-white">
              Unit Price
            </label>
            <input
              type="number"
              id="rate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // placeholder="Price"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUnitAmount(Number(e.target.value))}
              value={unitAmount}
              // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">
            Company Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ibadan Electricity Distribution Plc "
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading || loadWaitData ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Register;
