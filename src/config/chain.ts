export const evmChains: ChainConfig[] = [
  // {
  //   chain: "Ethereum",
  //   bridge: "0x391eD49Ae1CF6a2B60Ef533aDEeFCdF6C92DAeA7",
  //   chainId: 11155111,
  // },
  {
    chain: "Arbitrum",
    bridge: "0xDEb95032edE2DE2c58ad68c6f85ab7bE3aC3bDA3",
    chainId: 42161,
  },
  // {
  //   chain: "BSC",
  //   bridge: "0xcD411d9E5543B12b1d87DDDc1F949Bd5fc800253",
  //   chainId: 97,
  // },
  {
    chain: "Bitlayer",
    bridge: "0x14c05B38ef1546045472428B0708971416F00be6",
    chainId: 200901,
  },
];

export const chains: Chain[] = [
  // "Bitcoin",
  // "Ethereum",
  "Arbitrum",
  // "BSC",
  "Bitlayer",
];

export const getChainIcon = (chain: Chain) => {
  switch (chain) {
    case "Bitcoin":
      return "btc.svg";
    case "Ethereum":
      return "eth.svg";
    case "Arbitrum":
      return "arb.svg";
    case "BSC":
      return "bnb.svg";
    case "Bitlayer":
      return "lbtc.png";
    default:
      return undefined;
  }
};
