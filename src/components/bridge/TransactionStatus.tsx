import React, { FC } from "react";
import { FaCheckSquare } from "react-icons/fa";

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
    <div className={`flex flex-col items-center justify-center`}>
      {active ? (
        <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-blue-600" />
      ) : succeed ? (
        <FaCheckSquare className="w-6 h-6 text-green-600" />
      ) : (
        <div className="border-gray-300 h-6 w-6 rounded-full border-2" />
      )}
      <p className="pt-2 font-bold">{succeed ? succeedName : statusName}</p>
    </div>
  );
};

export default TransactionStatus;
