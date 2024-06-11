"use client";

import Pagination from "@/components/explorer/Pagination";
import { getChainIcon } from "@/config/chain";
import { tokens } from "@/config/tokens";
import { getTxList } from "@/helpers/api";
import { getExplorerUrl, toLocalTime, truncate } from "@/helpers/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { formatUnits } from "viem";
import cn from "classnames";

const ExplorerPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetch = useCallback(
    async (offset: number) => {
      try {
        setLoading(true);
        const { total, transactions } = await getTxList(offset, 10, query);
        setOffset(offset);
        setTotal(total);
        setTransactions(transactions);
      } catch (err: any) {
        toast.error(err?.response?.data);
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    fetch(0);
  }, [fetch]);

  return (
    <div className="relative px-2 py-2 sm:py-4 sm:px-4 lg:py-6 lg:px-8">
      <div className="mb-2 sm:mb-3">
        <div className="relative rounded-md shadow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 sm:text-sm w-4 h-4" />
          </div>
          <form>
            <input
              type="string"
              className="focus:ring-none block w-full pl-9 pr-2 py-2 rounded-md text-black dark:text-white bg-white dark:bg-darkgrey-600"
              placeholder="Search by swap id or address"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="overflow-hidden border-b border-gray-200 shadow bg-white dark:bg-darkgrey-600 dark:border-darkgrey-100 rounded-md">
        <div className="px-4 pt-5 sm:px-6 -mb-px">
          <div className="flex items-center h-8">
            <div className="text-xl font-medium leading-6 text-gray-900 dark:text-white">
              Latest Swaps
            </div>
            <div className="ml-2 flex-1"></div>
            <div></div>
          </div>
          <div className="mt-1 text-gray-500 dark:text-white break-all"></div>
          <div className="max-w-screen text-gray-500 dark:text-white mt-4 flex overflow-auto -ml-1"></div>
        </div>
        <div className="border-t border-gray-200 dark:border-darkgrey-400">
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-darkgrey-100">
              <thead className="bg-gray-50 dark:bg-darkgrey-400">
                <tr>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider pl-4 pr-3 sm:pl-6 py-2 hidden sm:table-cell"
                  >
                    swap id / time
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider px-2 md:px-3 sm:py-3 py-2 pl-4 sm:hidden"
                  >
                    swap id
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider px-2 md:px-3 sm:py-3 py-2 hidden sm:table-cell"
                  >
                    status
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider px-2 md:px-3 sm:py-3 py-2"
                  >
                    to
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider px-2 md:px-3 sm:py-3 py-2"
                  >
                    input
                  </th>
                  <th
                    scope="col"
                    className="text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider px-2 md:px-3 sm:py-3 py-2"
                  >
                    output
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading && (
                  <tr className="bg-white dark:bg-darkgrey-600 hover:bg-primary-50">
                    <td
                      className="whitespace-nowrap pl-4 pr-3 sm:pl-6 py-2"
                      colSpan={5}
                    >
                      <div className="w-full flex justify-center items-center">
                        <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-2 border-t-blue-600" />
                      </div>
                    </td>
                  </tr>
                )}
                {transactions.map((tx) => {
                  const fromToken = tokens.filter(
                    (token) =>
                      token.chain == tx.fromChain &&
                      token.address == tx.fromToken
                  )[0];
                  const toToken = tokens.filter(
                    (token) =>
                      token.chain == tx.toChain && token.address == tx.toToken
                  )[0];

                  console.log(tx, fromToken, toToken);

                  return (
                    <tr
                      key={tx.key}
                      className="odd:bg-white even:bg-gray-50 dark:odd:bg-darkgrey-600 dark:even:bg-darkgrey-400 hover:bg-primary-50"
                    >
                      <td className="whitespace-nowrap pl-4 pr-3 sm:pl-6 py-2">
                        <div className="text-primary hover:underline hidden lg:block">
                          <Link href={`/tx/${tx.key}`}>
                            {truncate(tx.key, 8, 6)}
                          </Link>
                        </div>
                        <div className="text-primary hover:underline hidden sm:inline-block lg:hidden">
                          <Link href={`/tx/${tx.key}`}>
                            {truncate(tx.key, 6, 4)}
                          </Link>
                        </div>
                        <div className="text-primary hover:underline sm:hidden">
                          <Link href={`/tx/${tx.key}`}>
                            {truncate(tx.key, 6)}
                          </Link>
                        </div>
                        <div className="text-xs text-gray-500 hidden sm:block">
                          {toLocalTime(tx.issuedTime)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 md:px-3 sm:py-4 py-2 hidden sm:table-cell">
                        <div className="flex items-center">
                          <div className="flex relative flex-shrink-0">
                            <span
                              className={cn(
                                "px-2 inline-flex text-sm leading-5 font-semibold rounded-full shadow-sm",
                                tx.status == "Issued" && "bg-purple-500",
                                tx.status == "Deposited" && "bg-blue-500",
                                tx.status == "Sent" && "bg-yellow-500",
                                tx.status == "Finished" && "bg-green-500",
                                tx.status == "Expired" && "bg-red-500"
                              )}
                            >
                              {tx.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 md:px-3 sm:py-4 py-2">
                        <div className="flex items-center text-gray-500 text-xs">
                          <div className="items-center font-bold gap-2 hidden sm:flex">
                            <Image
                              width={20}
                              height={20}
                              src={`/icons/${getChainIcon(tx.toChain)}`}
                              className="w-5 h-5 shrink-0"
                              alt="icon"
                            />
                            {tx.toChain}
                            <Link
                              href={`${getExplorerUrl(tx.toChain)}address/${
                                tx.toAddress
                              }`}
                              className="inline-flex items-center"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FaExternalLinkAlt className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                        <div className="text-normal hover:text-white hidden lg:inline-block">
                          {truncate(tx.toAddress, 8, 6)}
                        </div>
                        <div className="text-normal hover:text-white hidden sm:inline-block lg:hidden">
                          {truncate(tx.toAddress, 6, 4)}
                        </div>
                        <div className="text-normal hover:text-white sm:hidden">
                          {truncate(tx.toAddress, 6)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 md:px-3 sm:py-4 py-2">
                        <div className="flex lg:flex-col">
                          <div className="relative flex items-center self-start mr-1">
                            {(+formatUnits(
                              BigInt(tx.amountIn),
                              fromToken.decimals
                            )).toFixed(4)}
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center text-gray-500 cursor-pointer hover:text-white gap-1">
                              <Image
                                width={20}
                                height={20}
                                src={`/icons/${fromToken.icon}`}
                                className="w-5 h-5 shrink-0"
                                alt="icon"
                              />
                              {fromToken.symbol} ({tx.fromChain})
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 md:px-3 sm:py-4 py-2">
                        <div className="flex lg:flex-col">
                          <div className="relative flex items-center self-start mr-1">
                            {(+formatUnits(
                              BigInt(tx.amountOut),
                              toToken.decimals
                            )).toFixed(4)}
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center text-gray-500 cursor-pointer hover:text-white gap-1">
                              <Image
                                width={20}
                                height={20}
                                src={`/icons/${toToken.icon}`}
                                className="w-5 h-5 shrink-0"
                                alt="icon"
                              />
                              {toToken.symbol} ({tx.toChain})
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            total={total}
            offset={offset}
            limit={10}
            count={transactions.length}
            fetch={fetch}
          />
        </div>
      </div>
    </div>
  );
};

export default ExplorerPage;
