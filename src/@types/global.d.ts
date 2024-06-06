type Chain = "Bitcoin" | "Ethereum" | "Arbitrum" | "BSC" | "Bitlayer";

type ChainConfig = {
  chain: Chain;
  bridge: `0x${string}`;
  chainId: number;
};

type Currency = {
  id: string;
  chain: Chain;
  address: `0x${string}`;
  decimals: number;
  name: string;
  symbol: string;
  icon: string;
  max: number;
  min: number;
};

type FeeResult = {
  amountIn: number;
  amountOut: number;
  platformFee: number;
  txFee: number;
};

type TransactionStatus =
  | "Issued"
  | "Deposited"
  | "Sent"
  | "Finished"
  | "Expired";

type Transaction = {
  key: string;
  status: TransactionStatus;

  fromChain: Chain;
  fromToken: string;
  toChain: Chain;
  toToken: string;
  amountIn: string;
  amountOut: string;
  toAddress: string;

  depositAddress: string;
  sendingTx: null;

  issuedTime: number;
  expireTime: number;
};

type Sig = {
  r: string;
  s: string;
  v: number;
};
