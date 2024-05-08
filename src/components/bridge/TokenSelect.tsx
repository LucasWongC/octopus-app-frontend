import { tokens } from "@/config/tokens";
import Image from "next/image";
import { FC, useMemo } from "react";

type Props = {
  chain: Chain;
  value: Currency;
  setValue: (value: Currency) => void;
};

const TokenSelect: FC<Props> = ({ chain, value, setValue }) => {
  const anotherTokens = useMemo(
    () =>
      tokens.filter((token) => token.chain == chain && token.id != value.id),
    [chain, value.id]
  );

  return (
    <div className="flex flex-row items-center mb-1 gap-1">
      <button
        type="button"
        className="border-transparent select-none transition-[background] text-xs font-normal leading-loose rounded-full flex flex-row items-center border-0 p-0 h-6 text-black order-first"
      >
        <Image
          width={24}
          height={24}
          src={`/icons/${value.icon}`}
          className="shrink-0 select-none w-6 h-6"
          alt="icon"
        />
        <div className="flex items-center text-base font-medium transition-all pl-1.5 mt-px">
          <span>{value.symbol}</span>
        </div>
      </button>
      {anotherTokens.map((token) => (
        <button
          key={token.id}
          type="button"
          className="border-transparent select-none transition-[background] text-xs font-normal leading-loose rounded-full flex flex-row items-center border-0 p-0 h-6 text-gray opacity-60 hoverSupported:hover:opacity-60"
          onClick={() => setValue(token)}
        >
          <Image
            width={24}
            height={24}
            src={`/icons/${token.icon}`}
            className="shrink-0 select-none w-6 h-6"
            alt="icon"
          />
          <div className="flex items-center text-base font-medium transition-all w-0 overflow-hidden">
            <span>{token.symbol}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TokenSelect;
