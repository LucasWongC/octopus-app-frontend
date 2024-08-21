export const evmChains: ChainConfig[] = [
  {
    chain: "Ethereum",
    bridge: "0x391eD49Ae1CF6a2B60Ef533aDEeFCdF6C92DAeA7",
    chainId: 11155111,
    name: "Ethereum",
  },
  {
    chain: "Arbitrum",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 421614,
    name: "Arbitrum",
  },
  {
    chain: "BSC",
    bridge: "0xcD411d9E5543B12b1d87DDDc1F949Bd5fc800253",
    chainId: 97,
    name: "BSC",
  },
  {
    chain: "Bitlayer",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 200810,
    name: "Bitlayer",
  },
  {
    chain: "LayerEdge",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 3456,
    name: "LayerEdge",
  },
  // {
  //   chain: "GMNetwork",
  //   bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
  //   chainId: 202402181627,
  //   name: "GM Network",
  // },
  {
    chain: "AILayer",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 2648,
    name: "AILayer",
  },
  {
    chain: "BEVM",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 11503,
    name: "BEVM",
  },
  {
    chain: "Berachain",
    bridge: "0xCE2330E60c6cDf86eb77745a52334193c07F1Da9",
    chainId: 80084,
    name: "Berachain",
  },
];

export const chains: Chain[] = [
  "Bitcoin",
  "Ethereum",
  "Arbitrum",
  "BSC",
  "Bitlayer",
  "LayerEdge",
  // "GMNetwork",
  "AILayer",
  "BEVM",
  "Berachain",
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
    case "gmnetwork":
      return "gm.png";
    case "ailayer":
      return "ai.png";
    case "bevm":
      return "bevm.png";
    case "berachain":
      return "bera.svg";
    default:
      return undefined;
  }
};
