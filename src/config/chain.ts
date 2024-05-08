export const evmChains: ChainConfig[] = [
  {
    chain: "Ethereum",
    bridge: "0x391eD49Ae1CF6a2B60Ef533aDEeFCdF6C92DAeA7",
    chainId: 11155111,
  },
  {
    chain: "Arbitrum",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 421614,
  },
  {
    chain: "BSC",
    bridge: "0xcD411d9E5543B12b1d87DDDc1F949Bd5fc800253",
    chainId: 97,
  },
  {
    chain: "BitLayer",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 200810,
  },
];

export const chains: Chain[] = [
  "Bitcoin",
  "Ethereum",
  "Arbitrum",
  "BSC",
  "BitLayer",
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
    case "BitLayer":
      return "lbtc.png";
    default:
      return undefined;
  }
};
