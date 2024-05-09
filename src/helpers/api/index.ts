import axios from "./axios";

export const estimateOut = async (
  from: string,
  to: string,
  amountIn: string
) => {
  const { data } = await axios.post("/estimate/out", {
    from,
    to,
    amountIn,
  });

  return data as FeeResult;
};

export const estimateIn = async (
  from: string,
  to: string,
  amountOut: string
) => {
  const { data } = await axios.post("/estimate/in", {
    from,
    to,
    amountOut,
  });

  return data as FeeResult;
};

export const createTransaction = async (
  from: string,
  to: string,
  amountIn: string,
  toAddress: string
) => {
  const { data } = await axios.post("/create", {
    from,
    to,
    amountIn,
    toAddress,
  });

  return data as Transaction;
};

export const getTransaction = async (key: string) => {
  const { data } = await axios.get(`/tx/${key}`);

  return data as Transaction;
};

export const getSign = async (key: string, from: string) => {
  const { data } = await axios.get(`/sign/${key}?from=${from}`);

  return data.sig as Sig;
};

export const getTxList = async (offset: number, limit: number = 10) => {
  const { data } = await axios.get(
    `/retrieve/tx?offset=${offset}&limit=${limit}`
  );

  const { total, txs } = data;

  return {
    total: total as number,
    transactions: txs as Transaction[],
  };
};
