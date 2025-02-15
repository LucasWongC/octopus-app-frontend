import Image from "next/image";
import React, { FC } from "react";

type Props = {
  status: TransactionStatus;
  active: boolean;
  succeed: boolean;
};

const TransactionStatus: FC<Props> = ({ status, active, succeed }) => {
  let statusName = "";
  let succeedName = "";

  switch (status) {
    case "Issued":
      statusName = "Waiting For Deposit";
      succeedName = "Deposited";
      break;
    case "Deposited":
      statusName = "Exchanging";
      succeedName = "Exchanged";
      break;
    case "Sent":
      statusName = "Sending to you";
      succeedName = "Sent";
      break;
    default:
      break;
  }

  return (
    <div className={`relative flex flex-col items-center justify-center`}>
      {active ? (
        <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-2 border-t-blue-600" />
      ) : succeed ? (
        <Image
          width={32}
          height={32}
          src="/icons/check.png"
          className="w-8 h-8 text-green-600"
          alt="check"
        />
      ) : (
        <div className="border-gray-300 h-8 w-8 rounded-full border-2" />
      )}
      <p className="pt-2 font-bold absolute left-1/2 -translate-x-1/2 -bottom-full whitespace-nowrap">
        {succeed ? succeedName : statusName}
      </p>
    </div>
  );
};

export default TransactionStatus;
