import { tokens } from "@/config/tokens";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { formatUnits } from "viem";
import { FaCopy } from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import {
  useAccount,
  useSwitchChain,
  useChainId,
  useReadContract,
  useWriteContract,
  useConfig,
} from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { getSign } from "@/helpers/api";
import { evmChains } from "@/config/chain";
import { erc20Abi } from "viem";
import BridgeAbi from "@/helpers/abi/Bridge.abi.json";
import { delay } from "@/helpers/utils";

type Props = {
  tx: Transaction;
};

const DepositForm: FC<Props> = ({ tx }) => {
  const { isConnected, address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const chainId = useChainId();
  const config = useConfig();
  const [sig, setSig] = useState<Sig>();
  const [chainConfig, setChainConfig] = useState<ChainConfig>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const depositToken = useMemo(
    () =>
      tokens.filter(
        (token) => token.chain == tx.fromChain && token.address == tx.fromToken
      )[0],
    [tx]
  );

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: depositToken.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address!, chainConfig?.bridge!],
    query: {
      select: (data) => {
        return data as bigint;
      },
    },
  });

  const { writeContractAsync } = useWriteContract();

  const handleApprove = useCallback(async () => {
    if (allowance == undefined || !chainConfig) {
      return;
    }

    setIsProcessing(true);
    try {
      if (allowance < BigInt(tx.amountIn)) {
        const hash = await writeContractAsync({
          address: depositToken.address,
          abi: erc20Abi,
          functionName: "approve",
          args: [chainConfig.bridge, BigInt(tx.amountIn)],
        });
        // await delay(2);
        await waitForTransactionReceipt(config, { hash });
        await refetchAllowance();
      }
    } catch (err) {
      console.log(err);
    }

    setIsProcessing(false);
  }, [
    allowance,
    chainConfig,
    config,
    depositToken.address,
    refetchAllowance,
    tx.amountIn,
    writeContractAsync,
  ]);

  const handleDeposit = useCallback(async () => {
    if (!sig || allowance == undefined || !chainConfig) {
      return;
    }

    setIsProcessing(true);
    try {
      if (allowance < BigInt(tx.amountIn)) {
        throw new Error("Should approve token before");
      }

      console.log(tx.key, tx.fromToken, BigInt(tx.amountIn), sig);

      const hash = await writeContractAsync({
        address: chainConfig.bridge,
        abi: BridgeAbi,
        functionName: "deposit",
        args: [tx.key, tx.fromToken, BigInt(tx.amountIn), sig],
      });
      // await delay(2);
      await waitForTransactionReceipt(config, { hash });
    } catch (err) {
      console.log(err);
    }

    setIsProcessing(false);
  }, [
    allowance,
    chainConfig,
    config,
    sig,
    tx.amountIn,
    tx.fromToken,
    tx.key,
    writeContractAsync,
  ]);

  const handleCopy = useCallback(
    () => toast.success("Address copied to clipboard"),
    []
  );

  useEffect(() => {
    if (!address || tx.fromChain == "Bitcoin") {
      return;
    }
    getSign(tx.key, address).then(setSig);
  }, [address, tx.fromChain, tx.key]);

  useEffect(() => {
    setChainConfig(
      evmChains.filter((chain) => chain.chain == tx.fromChain)?.[0]
    );
  }, [tx.fromChain]);

  useEffect(() => {
    if (chainConfig?.chainId && switchChain) {
      switchChain({ chainId: chainConfig.chainId });
    }
  }, [switchChain, chainConfig]);

  return (
    <div className="w-full flex flex-col bg-darkgrey dark:bg-cream p-6 rounded-xl bg-opacity-30 dark:bg-opacity-30 gap-5">
      <div>
        <label className="text-sm font-bold">Amount</label>
        <p className="text-lg font-bold">
          {formatUnits(BigInt(tx.amountIn), depositToken.decimals)}{" "}
          {depositToken.symbol}
        </p>
      </div>
      <div>
        <label className="text-sm font-bold">To this address</label>
        {tx.fromChain == "Bitcoin" ? (
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">{tx.depositAddress}</p>
            <CopyToClipboard text={tx.depositAddress} onCopy={handleCopy}>
              <FaCopy className="w-4 h-4 cursor-pointer" />
            </CopyToClipboard>
          </div>
        ) : (
          <div className="flex w-full">
            {!isConnected ? (
              <button
                type="button"
                onClick={() => openConnectModal!()}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Connect Wallet
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  (allowance ?? 0) < BigInt(tx.amountIn)
                    ? handleApprove()
                    : handleDeposit()
                }
                className={`w-full px-4 py-2 rounded-md ${
                  isProcessing || chainConfig?.chainId !== chainId
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                } transition duration-300`}
                disabled={isProcessing || chainConfig?.chainId !== chainId}
              >
                {chainConfig?.chainId !== chainId
                  ? "Invalid Network"
                  : (allowance ?? 0) < BigInt(tx.amountIn)
                  ? "Approve"
                  : "Deposit"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositForm;
