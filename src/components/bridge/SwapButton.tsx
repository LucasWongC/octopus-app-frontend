import { useConnectModal } from "@rainbow-me/rainbowkit";
import { FC, useCallback } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

type Props = {
  fromChainId: number;
  disableButton: boolean;
  isValidAddress: boolean;
  isProcessing: boolean;
  handleBridge: () => Promise<void>;
  fromAmount?: string;
};

const SwapButton: FC<Props> = ({
  fromChainId,
  disableButton,
  isValidAddress,
  isProcessing,
  handleBridge,
  fromAmount,
}) => {
  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const chainId = useChainId();

  const handleSwitchNetwork = useCallback(() => {
    console.log("called");
    switchChain({ chainId: fromChainId });
  }, [fromChainId, switchChain]);

  return (!isConnected || fromChainId != chainId) && fromChainId ? (
    <button
      type="button"
      onClick={() =>
        !isConnected ? openConnectModal!() : handleSwitchNetwork()
      }
      className="w-full px-4 py-3 sm:py-3.5 text-lg bg-blue-500 text-white hover:bg-blue-600 transition rounded-2xl duration-300"
    >
      {!isConnected ? <span>Connect Wallet</span> : <span>Switch Network</span>}
    </button>
  ) : (
    <button
      type="button"
      className="border border-transparent select-none transition-[background] w-full px-4 py-3 sm:py-3.5 text-lg font-medium rounded-2xl text-white bg-gradient-to-r from-green-400 to-green-600 disabled:from-[#ff0000] disabled:to-[#ff0000] outline-offset-4 disabled:opacity-60 disabled:cursor-not-allowed uppercase shadow-lg"
      disabled={disableButton}
      onClick={handleBridge}
    >
      {!fromAmount || fromAmount == "0"
        ? "Please enter amount"
        : !isValidAddress
        ? "Invalid address"
        : isProcessing
        ? "Swapping..."
        : "Swap"}
    </button>
  );
};

export default SwapButton;
