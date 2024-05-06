import React, { FC } from "react";

type Props = {
  status: TransactionStatus;
  active: boolean;
  succeed: boolean;
};

const TransactionStatus: FC<Props> = ({ status, active, succeed }) => {
  let statusName = "";

  switch (status) {
    case "Issued":
      statusName = "Waiting For Deposit";
      break;
    case "Deposited":
      statusName = "Exchanging";
      break;
    case "Sent":
      statusName = "Sending to you";
      break;
    default:
      break;
  }

  return (
    <div className={`flex flex-col items-center justify-center`}>
      {active ? (
        <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-blue-600" />
      ) : succeed ? (
        <div className="h-6 w-6 rounded-full border-2 border-blue-600" />
      ) : (
        <div className="border-gray-300 h-6 w-6 rounded-full border-2" />
      )}
      <p className="pt-2 font-bold">{statusName}</p>
    </div>
  );
};

export default TransactionStatus;
