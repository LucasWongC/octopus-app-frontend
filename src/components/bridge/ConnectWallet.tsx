import { useConnectModal } from "@rainbow-me/rainbowkit";
import { FC, useCallback } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

type Props = {
  fromChainId: number;
};

const ConnectWallet: FC<Props> = ({ fromChainId }) => {
  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();

  const handleSwitchNetwork = useCallback(() => {
    console.log("called");
    switchChain({ chainId: fromChainId });
  }, [fromChainId, switchChain]);

  return (
    <button
      type="button"
      onClick={() =>
        !isConnected ? openConnectModal!() : handleSwitchNetwork()
      }
      className="w-full px-4 py-3 sm:py-3.5 text-lg bg-blue-500 text-white hover:bg-blue-600 transition rounded-2xl duration-300"
    >
      {!isConnected ? <span>Connect Wallet</span> : <span>Switch Network</span>}
    </button>
  );
};

export default ConnectWallet;
