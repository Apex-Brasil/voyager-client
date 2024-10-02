/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const { withSentryConfig } = require("@sentry/nextjs");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: !isProd,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ipfs.io",
      "atomichub-ipfs.com",
      "cloudflare-ipfs.com",
      "resizer.atomichub.io",
    ],
  },
  env: {
    apiEndpoint: process.env.API_ENDPOINT,
    bloksEndpoint: process.env.BLOKS_ENDPOINT,
    contractAccount: process.env.CONTRACT_ACCOUNT,
    atomicEndpoint: process.env.ATOMIC_ENDPOINT,
    chainId: process.env.CHAIN_ID,
    host: process.env.HOST,
    appName: process.env.APP_NAME,
    apiChainChampsEndpoint: process.env.API_CHAINCHAMPS_ENDPOINT,
    allowedWallets: process.env.ALLOWED_WALLETS,
  },
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

module.exports = withPWA(withSentryConfig(nextConfig));
