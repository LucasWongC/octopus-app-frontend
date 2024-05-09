"use client";

import DepositForm from "@/components/bridge/DepositForm";
import TransactionStatus from "@/components/bridge/TransactionStatus";
import WithdrawData from "@/components/bridge/WithdrawData";
import { useCurrentTime } from "@/contexts/CurrentTimeContext";
import { getTransaction } from "@/helpers/api";
import { truncate } from "@/helpers/utils";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaCopy } from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export default function Page() {
  const { key } = useParams<{ key: string }>();
  const [tx, setTx] = useState<Transaction>();
  const [deposited, setDeposited] = useState<boolean>(false);
  const now = useCurrentTime();

  useEffect(() => {
    if (!key || tx?.status == "Finished" || (tx && now % 5 != 0)) {
      return;
    }

    getTransaction(key).then(setTx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, now]);

  const handleCopy = () => toast.success("Transaction id copied to clipboard");

  const title = useMemo(() => {
    switch (tx?.status) {
      case "Issued":
        return "Please send the funds you would like to exchange";
      case "Deposited":
      case "Sent":
        return "Wait until swap is done";
      case "Expired":
        return "This transaction expired";
      case "Finished":
        return "Transaction succeed";
      default:
        return "Unknown state";
    }
  }, [tx?.status]);

  return (
    <div className="w-full flex flex-col max-w-2xl">
      <div className="w-full flex justify-end items-center">
        <div className="flex items-center gap-1">
          <p>Transaction Id:</p>
          <p>{truncate(key, 10)}</p>
          <CopyToClipboard text={key} onCopy={handleCopy}>
            <FaCopy className="w-4 h-4 cursor-pointer" />
          </CopyToClipboard>
        </div>
      </div>
      {tx ? (
        <div className="flex flex-col bg-darkgrey dark:bg-cream p-6 rounded-2xl bg-opacity-30 dark:bg-opacity-30">
          <label className="text-xl font-bold mb-6">{title}</label>
          {tx.status == "Issued" && !deposited && (
            <DepositForm tx={tx} setDeposited={setDeposited} />
          )}
          <div className="relative w-full my-10 flex justify-between items-center">
            {/* <div className="absolute left-0 w-full top-[14px] h-1 bg-gray-300 -z-10" /> */}
            <TransactionStatus
              status="Issued"
              active={tx.status == "Issued"}
              succeed={
                deposited ||
                tx.status == "Deposited" ||
                tx.status == "Sent" ||
                tx.status == "Finished"
              }
            />
            <TransactionStatus
              status="Deposited"
              active={tx.status == "Deposited"}
              succeed={tx.status == "Sent" || tx.status == "Finished"}
            />
            <TransactionStatus
              status="Sent"
              active={tx.status == "Sent"}
              succeed={tx.status == "Finished"}
            />
          </div>
          <WithdrawData tx={tx} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
