import { tokens } from "@/config/tokens";
import { FC, useMemo } from "react";
import { formatUnits } from "viem";
import { FaCopy } from "react-icons/fa";

type Props = {
  tx: Transaction;
};

const WithdrawData: FC<Props> = ({ tx }) => {
  const toToken = useMemo(
    () =>
      tokens.filter(
        (token) => token.chain == tx.toChain && token.address == tx.toToken
      )[0],
    [tx]
  );

  return (
    <div className="w-full flex flex-col py-6 rounded-xl gap-3">
      <div>
        <label className="text-sm font-bold">You Get</label>
        <p className="text-lg font-bold">
          {formatUnits(BigInt(tx.amountOut), toToken.decimals)} {toToken.symbol}
        </p>
      </div>
      <div>
        <label className="text-sm font-bold">Recipient Wallet</label>
        <p className="text-lg font-bold">{tx.toAddress}</p>
      </div>
    </div>
  );
};

export default WithdrawData;
