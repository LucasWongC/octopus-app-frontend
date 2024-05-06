"use client";

import { NumericFormat } from "react-number-format";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createTransaction, estimateIn, estimateOut } from "@/helpers/api";
import TokenSelect from "@/components/bridge/TokenSelect";
import { validate } from "bitcoin-address-validation";
import { isAddress, formatUnits, parseUnits } from "viem";
import { tokens } from "@/config/tokens";
import cn from "classnames";

export default function Page() {
  const router = useRouter();
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [fromToken, setFromToken] = useState<Currency>(tokens[0]);
  const [fromAmount, setFromAmount] = useState<string>("0.1");
  const [toToken, setToToken] = useState<Currency>(tokens[1]);
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
      return validate(toAddress);
    } else {
      return isAddress(toAddress);
    }
  }, [toAddress, toToken]);

  const disableButton = useMemo(
    () => isProcessing || isCalculating || !toAddress || !fromAmount,
    [fromAmount, isCalculating, isProcessing, toAddress]
  );

  const onChangeIn = useCallback(async () => {
    if (!changePoint) {
      return;
    }

    const amountIn = Number(fromAmount.replaceAll(",", ""));
    if (Number.isNaN(amountIn)) {
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
    const timer = setTimeout(onChangeIn, 500);
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
    const timer = setTimeout(onChangeOut, 500);
    return () => clearTimeout(timer);
  }, [onChangeOut]);

  const handleBridge = useCallback(async () => {
    const amountIn = Number(fromAmount.replaceAll(",", ""));
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
    } catch (err) {
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  }, [fromAmount, fromToken, router, toAddress, toToken]);

  return (
    <section>
      <div className="mt-6 px-5 py-4 rounded-2xl bg-darkgrey-400 flex flex-col gap-3">
        <h6 className="text-darkgrey-50">From</h6>

        <div className="flex items-center gap-2 justify-between">
          <TokenSelect value={fromToken} setValue={setFromToken} />

          <div>
            <NumericFormat
              placeholder="at least 0.00005"
              className="bg-darkgrey-400 sm:min-w-48 w-full font-bold text-right text-darkgrey-50 outline-none"
              allowNegative={false}
              allowLeadingZeros={false}
              decimalScale={5}
              fixedDecimalScale={true}
              thousandSeparator={true}
              prefix=""
              suffix=""
              value={fromAmount}
              onChange={(e) => {
                setChangePoint(true);
                setFromAmount(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="flex justify-center items-center w-8 h-8 mt-4 bg-red-700 text-white font-bold py-2 rounded-lg">
          <Image
            src="/icons/convert.svg"
            alt="convert"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </button>
      </div>

      <div className="mt-4 px-5 py-4 rounded-2xl bg-darkgrey-400 flex flex-col gap-3">
        <h6 className="text-darkgrey-50">To</h6>

        <div className="flex items-center gap-2 justify-between">
          <TokenSelect value={toToken} setValue={setToToken} />

          <div>
            <NumericFormat
              placeholder="at least 0.00005"
              className="bg-darkgrey-400 sm:min-w-48 w-full font-bold text-right text-darkgrey-50 outline-none"
              allowNegative={false}
              allowLeadingZeros={false}
              decimalScale={5}
              fixedDecimalScale={true}
              thousandSeparator={true}
              prefix=""
              suffix=""
              value={toAmount}
              onChange={(e) => {
                setChangePoint(false);
                setToAmount(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl flex flex-col gap-3">
        <div className="mb-4">
          <label
            className="block text-darkgrey-50 text-sm font-bold mb-2 dark:text-darkgrey"
            htmlFor="toAddress"
          >
            To Address
          </label>
          <input
            className={cn(
              "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-darkgrey-400 sm:min-w-48 font-bold text-darkgrey-50 outline-none",
              isValidAddress ? "border-none" : "border-red-600"
            )}
            id="toAddress"
            type="text"
            placeholder="Address to receive"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
        </div>
      </div>

      <button
        color={disableButton ? "default" : "secondary"}
        disabled={disableButton}
        onClick={() => handleBridge()}
        className="disabled:cursor-not-allowed w-full font-bold mt-2 text-lg bg-green-500 disabled:bg-green-800 py-2 px-4 rounded-lg"
      >
        {isProcessing ? "SENDING..." : "SEND"}
      </button>
    </section>
  );
}
