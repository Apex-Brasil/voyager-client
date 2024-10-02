export const accountToken = "tokename";

export const IFPS_URL = "https://atomichub-ipfs.com/ipfs/";

export const GOOGLE_PATH = process.env.apiEndpoint + "/auth";

export const publicRoutes = [
  "/",
  "/sentry-example-page",
  "/explorer",
  "/explorer/[id]",
  "/ranking",
];
export const waxRoutes = ["/swap", "/tokens"];

export const config = {
  appName: process.env.appName as string,
  apiEndpoint: process.env.apiEndpoint as string,
  bloksEndpoint: process.env.bloksEndpoint as string,
  contractAccount: process.env.contractAccount as string,
  atomicEndpoint: process.env.atomicEndpoint as string,
  chainId: process.env.chainId as string,
  host: process.env.host as string,
  apiChainChampsEndpoint: process.env.apiChainChampsEndpoint as string,
  allowedWallets: process.env.allowedWallets as string,
};

export const allowedWallets = config.allowedWallets.split(",");
