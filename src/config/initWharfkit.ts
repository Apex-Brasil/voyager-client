import SessionKit, { Chains } from "@wharfkit/session";
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor";
import { WalletPluginCloudWallet } from "@wharfkit/wallet-plugin-cloudwallet";

import { isMainet } from "../utils/rede";

const appName = isMainet ? "voyager" : "test-voyager";
const chain = isMainet ? Chains.WAX : Chains.WAXTestnet;

export async function createSessionKit() {
  if (typeof document === "undefined") {
    throw new Error("WharfKit requires a browser environment.");
  }

  const { WebRenderer } = await import("@wharfkit/web-renderer");
  const ui = new WebRenderer();

  const { WalletPluginWombat } = await import("@wharfkit/wallet-plugin-wombat");

  const walletPlugins = [
    new WalletPluginCloudWallet(),
    new WalletPluginWombat(),
    new WalletPluginAnchor(),
  ];

  const newSessionKit = new SessionKit({
    appName,
    chains: [chain],
    ui,
    walletPlugins,
  });

  return newSessionKit;
}
