"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createTransaction, estimateIn, estimateOut } from "@/helpers/api";
import TokenSelect from "@/components/bridge/TokenSelect";
import { Network, validate } from "bitcoin-address-validation";
import { isAddress, formatUnits, parseUnits } from "viem";
import { tokens } from "@/config/tokens";
import cn from "classnames";
import toast from "react-hot-toast";
import ChainSelect from "@/components/bridge/ChainSelect";
import { isDevelopment } from "@/config";
import { chains } from "@/config/chain";

export default function Page() {
  const router = useRouter();
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [fromChain, setFromChain] = useState<Chain>(tokens[0].chain);
  const [fromToken, setFromToken] = useState<Currency>(tokens[0]);
  const [fromAmount, setFromAmount] = useState<string>();
  const [toChain, setToChain] = useState<Chain>(tokens[2].chain);
  const [toToken, setToToken] = useState<Currency>(tokens[2]);
  const [toAmount, setToAmount] = useState<string>();
  const [toAddress, setToAddress] = useState<string>();
  const [changePoint, setChangePoint] = useState<boolean>(true);
  const [feeResult, setFeeResult] = useState<FeeResult>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isValidAddress = useMemo(() => {
    if (!toAddress) {
      return true;
    }

    if (toToken.chain == "Bitcoin") {
      return validate(
        toAddress,
        isDevelopment ? Network.testnet : Network.mainnet
      );
    } else {
      return isAddress(toAddress);
    }
  }, [toAddress, toToken]);

  const disableButton = useMemo(
    () =>
      isProcessing ||
      isCalculating ||
      !toAddress ||
      !fromAmount ||
      !isValidAddress,
    [fromAmount, isCalculating, isProcessing, isValidAddress, toAddress]
  );

  const onChangeIn = useCallback(async () => {
    if (!changePoint) {
      return;
    }

    const amountIn = Number(fromAmount?.replaceAll(",", ""));
    if (Number.isNaN(amountIn)) {
      return;
    }
    if (amountIn <= 0) {
      return;
    }

    try {
      setIsCalculating(true);
      const data = await estimateOut(
        fromToken.id,
        toToken.id,
        parseUnits(amountIn.toString(), fromToken.decimals).toString()
      );
      setFeeResult(data);
      setToAmount(formatUnits(BigInt(data.amountOut), toToken.decimals));
    } catch (err) {
      console.log(err);
    } finally {
      setIsCalculating(false);
    }
  }, [changePoint, fromAmount, fromToken, toToken]);

  useEffect(() => {
    const timer = setTimeout(onChangeIn, 1000);
    return () => clearTimeout(timer);
  }, [onChangeIn]);

  const onChangeOut = useCallback(async () => {
    if (changePoint) {
      return;
    }

    const amountOut = Number(toAmount?.replaceAll(",", ""));
    if (Number.isNaN(amountOut)) {
      return;
    }
    if (amountOut <= 0) {
      return;
    }

    try {
      setIsCalculating(true);
      const data = await estimateIn(
        fromToken.id,
        toToken.id,
        parseUnits(amountOut.toString(), toToken.decimals).toString()
      );
      setFeeResult(data);
      setFromAmount(formatUnits(BigInt(data.amountIn), fromToken.decimals));
    } catch (err) {
      console.log(err);
    } finally {
      setIsCalculating(false);
    }
  }, [changePoint, toAmount, fromToken, toToken]);

  useEffect(() => {
    const timer = setTimeout(onChangeOut, 1000);
    return () => clearTimeout(timer);
  }, [onChangeOut]);

  const handleBridge = useCallback(async () => {
    const amountIn = Number(fromAmount?.replaceAll(",", ""));
    if (Number.isNaN(amountIn) || !toAddress || fromToken == toToken) {
      return;
    }

    try {
      setIsProcessing(true);
      const data = await createTransaction(
        fromToken.id,
        toToken.id,
        parseUnits(amountIn.toString(), fromToken.decimals).toString(),
        toAddress
      );
      router.push(`/tx/${data.key}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.reason);
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  }, [fromAmount, fromToken, router, toAddress, toToken]);

  const handleSwapInput = useCallback(() => {
    setFromChain(toChain);
    setToChain(fromChain);
    setFromToken(toToken);
    setToToken(fromToken);
    setChangePoint(true);
  }, [fromChain, fromToken, toChain, toToken]);

  useEffect(() => {
    if (fromChain != fromToken?.chain) {
      const defaultToken = tokens.filter(
        (token) => token.chain == fromChain
      )[0];
      setFromToken(defaultToken);
    }
  }, [fromChain, fromToken?.chain]);

  useEffect(() => {
    if (toChain != toToken?.chain) {
      const defaultToken = tokens.filter((token) => token.chain == toChain)[0];
      setToToken(defaultToken);
    }
  }, [toChain, toToken?.chain]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fromToken && fromAmount) {
        if (+fromAmount > fromToken.max) {
          setFromAmount(fromToken.max.toString());
        } else if (+fromAmount < fromToken.min) {
          setFromAmount(fromToken.min.toString());
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [fromAmount, fromToken]);

  return (
    <div className="flex flex-col items-center z-[100] pt-1 px-2 xs:px-4 w-full max-w-[32rem] xs:max-w-full sm:w-[31rem] text-darkgrey">
      <div className="w-full bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col p-2 w-full">
          <div className="flex justify-between items-center bg-white h-9">
            <label className="ml-px pl-3 text-base font-semibold">FROM</label>
            <ChainSelect value={fromChain} setValue={setFromChain} />
          </div>
          <div className="mt-1">
            <div
              id="token-amount-view"
              className="border-darkgrey-100 p-0 overflow-hidden transition-[height,border-color,border-radius,background] border hover:border-primary h-[100px] rounded-xl"
            >
              <div className="flex w-full flex-col pt-3 pb-1 pl-3 pr-2">
                <div className="grid grid-cols-[1fr_auto] gap-4 items-end justify-between mb-1">
                  <input
                    role="textbox"
                    contentEditable="true"
                    inputMode="decimal"
                    className="overflow-hidden box-content font-light leading-none whitespace-nowrap transition-[font-size,margin] ease-linear text-[60px] -mb-[3px] text-black focus-visible:outline-none"
                    placeholder={`${fromToken.min} ~ ${fromToken.max}`}
                    value={fromAmount}
                    onChange={(e) => {
                      setFromAmount(e.target.value);
                      setChangePoint(true);
                    }}
                  />
                  <TokenSelect
                    chain={fromChain}
                    value={fromToken}
                    setValue={setFromToken}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="flex z-10 justify-center items-center -my-3 w-10 h-10 sm:-my-4 sm:w-10 sm:h-10 rounded-xl border-4 border-white cursor-pointer hoverSupported:hover:bg-primary-100 hoverSupported:active:bg-primary-200 bg-white"
        onClick={handleSwapInput}
      >
        <div className="flex items-center justify-center shrink-0 select-none md:w-6 w-4 h-4 md:h-6">
          <Image width={32} height={32} src="/icons/transfer.png" alt="swap" />
        </div>
      </button>
      <div className="w-full bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col p-2 w-full">
          <div className="flex justify-between items-center bg-white h-9">
            <label className="ml-px pl-3 text-base font-semibold">TO</label>
            <ChainSelect value={toChain} setValue={setToChain} />
          </div>
          <div className="mt-1">
            <div
              id="token-amount-view"
              className="border-darkgrey-100 p-0 overflow-hidden transition-[height,border-color,border-radius,background] border h-[100px] rounded-t-xl focus-within:shadow-inner focus-within:bg-gray-100 cursor-text"
            >
              <div className="flex w-full flex-col pt-3 pb-1 pl-3 pr-2">
                <div className="grid grid-cols-[1fr_auto] items-end justify-between mb-1">
                  <input
                    role="textbox"
                    contentEditable="true"
                    inputMode="decimal"
                    className="overflow-hidden box-content font-light leading-none whitespace-nowrap transition-[font-size,margin] ease-linear text-[60px] -mb-[3px] text-black focus-visible:outline-none"
                    placeholder="0"
                    value={toAmount}
                    onChange={(e) => {
                      setToAmount(e.target.value);
                      setChangePoint(false);
                    }}
                  />
                  <TokenSelect
                    chain={toChain}
                    value={toToken}
                    setValue={setToToken}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end mx-px px-3 text-sm font-medium overflow-hidden transition-[height] text-error h-0"></div>
            <div
              className={cn(
                "relative flex flex-row justify-between mt-1 p-px leading-loose transition-[border-color,border-radius,background] rounded-b-lg border hoverSupported:hover:shadow-inner focus-within:shadow-inner focus-within:bg-gray-100 hover:border hover:border-primary",
                isValidAddress ? "border-darkgrey-100" : "border-red-500"
              )}
            >
              <label
                className="my-1 mx-3 text-gray whitespace-nowrap"
                htmlFor="address"
              >
                Recipient
              </label>
              <input
                id="address"
                type="text"
                className="caret-primary-600 flex-1 text-right text-black bg-transparent border-none outline-none px-0 overflow-hidden text-ellipsis placeholder:text-gray"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                placeholder="0x000"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
              />
            </div>
            <div className="flex items-end mx-px px-3 text-sm font-medium text-error overflow-hidden transition-[height] h-0"></div>
          </div>
        </div>
      </div>
      <div className="flex w-full transition-[height] h-0"></div>
      <div className="w-full mt-3 md:mb-10">
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
      </div>
    </div>
  );
}
