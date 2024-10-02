import { config } from "../utils/config";
const api = config.apiEndpoint;

export class RSRCacheKeyGetters {
  static collectionRequest = (
    page: number,
    toggleWhitelist: boolean,
    sortBy = "",
  ) => {
    return `${process.env.apiEndpoint}/collection?page=${page}&sort=${sortBy}${
      toggleWhitelist ? "&whitelist=true" : ""
    }`;
  };

  static collectionStatus = (collection: string) => {
    if (!collection) return null;

    return `${api}/collection/status/${collection}`;
  };

  static collectionAccounts = (collection: string) => {
    if (!collection) return null;

    return `${api}/collection/accounts/${collection}`;
  };

  static collectionMarket = (collection: string) => {
    if (!collection) return null;

    return `${api}/collection/market/${collection}`;
  };

  static collectionFilters = (collection: string) => {
    if (!collection) return null;

    return `${api}/collection/filters/${collection}`;
  };

  static collectionHolders = (collection: string) => {
    if (!collection) return null;

    return `${api}/collection/holders/${collection}`;
  };

  static getMedian = () => {
    return `${api}/collection/pairs`;
  };

  static voyagerScore = (collection: string) => {
    return `${api}/collection/scores?byCollection=${collection}`;
  };

  static allVoyagerScore = () => {
    return `${api}/collection/scores`;
  };

  static consultAssessment = (collectionName: string, wallet: string) => {
    if (!wallet) {
      return undefined;
    }
    return `${api}/collection/assessments?collectionName=${collectionName}&wallet=${wallet}`;
  };

  static getSales = (collectionName: string | undefined) => {
    if (!collectionName) {
      return undefined;
    }

    return `${api}/sales/${collectionName}`;
  };

  static getAuctions = (collectionName: string | undefined) => {
    if (!collectionName) {
      return undefined;
    }

    return `${api}/auctions/${collectionName}`;
  };

  static getUserBalances = (wallet: string) => {
    if (!wallet) {
      return undefined;
    }

    return `${api}/user/balance/${wallet}`;
  };

  static getCollectionsRankingFiltered = (page: number, sortBy = "sales") => {
    if (!page) {
      return undefined;
    }

    return `${config.apiEndpoint}/collection?page=${page}&sort=${sortBy}`;
  };

  static washTrading = (collection: string) => {
    if (!collection) {
      return undefined;
    }

    return `${api}/washtrading/${collection}`;
  };

  static getTokensMarket = () => {
    return `${api}/tokens/market`;
  };

  static getUserDashboard = (wallet: string) => {
    if (!wallet) {
      return undefined;
    }

    return `${api}/dashboard/users/${wallet}`;
  };
}

export const fetcher = async (url: string) => {
  try {
    if (url === "") {
      return undefined;
    }

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
