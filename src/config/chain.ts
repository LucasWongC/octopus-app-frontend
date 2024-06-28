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
    chain: "Bitlayer",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 200810,
  },
  {
    chain: "LayerEdge",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 3456,
  },
];

export const chains: Chain[] = [
  "Bitcoin",
  "Ethereum",
  "Arbitrum",
  "BSC",
  "Bitlayer",
  "LayerEdge",
];

export const getChainIcon = (chain: Chain) => {
  const chainLowerCase = chain.toLowerCase();

  switch (chainLowerCase) {
    case "bitcoin":
      return "btc.svg";
    case "ethereum":
      return "eth.svg";
    case "arbitrum":
      return "arb.svg";
    case "bsc":
      return "bnb.svg";
    case "bitlayer":
      return "lbtc.png";
    case "layeredge":
      return "le.svg";
    default:
      return undefined;
  }
};
