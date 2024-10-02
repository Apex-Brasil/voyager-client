import axios from "axios";

import {
  IBalance,
  ICollectionHolders,
  ICollectionStatus,
  ISpecificToken,
  IVoyagerScoreData,
  IDataAlreadyVoted,
  IMedian,
  IDataWashTrading,
  IDashboardUsers,
  IDataMarket,
} from "../@types";
import { config } from "../utils/config";
const api = config.apiEndpoint;

export class QueryCacheKeyGetters {
  static collectionRequest = (
    page: number,
    toggleWhitelist: boolean,
    sortBy = "",
  ) => {
    return `${process.env.apiEndpoint}/collection?page=${page}&sort=${sortBy}${
      toggleWhitelist ? "&whitelist=true" : ""
    }`;
  };

  static collectionStatus = async (
    collection: string,
  ): Promise<ICollectionStatus | undefined> => {
    if (!collection) return undefined;

    const url = `${api}/collection/status/${collection}`;
    const response = await axios.get(url);
    const data = response.data.data;
    return data || null;
  };

  static collectionAccounts = (collection: string) => {
    if (!collection) return undefined;

    return `${api}/collection/accounts/${collection}`;
  };

  static collectionMarket = async (
    collection: string,
  ): Promise<IDataMarket | undefined> => {
    if (!collection) return undefined;
    const url = `${api}/collection/market/${collection}`;
    const response = await axios.get(url);
    const data = response.data.data;
    return data || null;
  };

  static collectionFilters = async (collection: string) => {
    if (!collection) return undefined;
    const url = `${api}/collection/filters/${collection}`;
    const response = await axios.get(url);
    const data = response.data.data;
    return data;
  };

  static collectionHolders = async (
    collection: string,
  ): Promise<ICollectionHolders | undefined> => {
    if (!collection) return undefined;
    const url = `${api}/collection/holders/${collection}`;

    const response = await axios.get(url);
    const data = response.data.data;
    return data || null;
  };

  static getMedian = async (): Promise<IMedian> => {
    const url = `${api}/collection/pairs`;

    const response = await axios.get(url);
    const data = response.data;
    return data[0];
  };

  static voyagerScore = async (
    collection: string,
  ): Promise<IVoyagerScoreData> => {
    const url = `${api}/collection/scores?byCollection=${collection}`;

    const response = await axios.get(url);
    const data = response.data;
    return data || null;
  };

  static allVoyagerScore = async (): Promise<IVoyagerScoreData[]> => {
    const url = `${api}/collection/scores`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  };

  static consultAssessment = async (
    collectionName: string,
    wallet: string,
  ): Promise<IDataAlreadyVoted | null | undefined> => {
    if (!wallet) {
      return undefined;
    }

    const url = `${api}/collection/assessments?collectionName=${collectionName}&wallet=${wallet}`;
    const response = await axios.get(url);
    const data = response.data.data;
    return data || null;
  };

  static getSales = async (collectionName: string | undefined) => {
    if (!collectionName) {
      return undefined;
    }
    const url = `${api}/sales/${collectionName}`;
    const response = await axios.get(url);
    const data = response.data.response;
    return data;
  };

  static getAuctions = async (collectionName: string) => {
    if (!collectionName) {
      return undefined;
    }
    const url = `${api}/auctions/${collectionName}`;
    const response = await axios.get(url);
    const data = response.data.data;
    return data;
  };

  static getUserBalances = async (
    wallet: string,
  ): Promise<IBalance[] | undefined> => {
    if (!wallet) {
      return undefined;
    }

    const url = `${api}/user/balance/${wallet}`;

    const response = await axios.get(url);
    const data = response.data.data;
    return data;
  };

  static getCollectionsRankingFiltered = (page: number, sortBy = "sales") => {
    if (!page) {
      return undefined;
    }

    return `${config.apiEndpoint}/collection?page=${page}&sort=${sortBy}`;
  };

  static collectionWashTrading = async (
    collection: string,
  ): Promise<IDataWashTrading | undefined> => {
    if (!collection) {
      return undefined;
    }
    const url = `${api}/washtrading/${collection}`;

    const response = await axios.get(url);
    const data = response.data.data;
    return data || null;
  };

  static getTokensMarket = async (): Promise<ISpecificToken[]> => {
    const url = `${api}/tokens/market`;
    const response = await axios.get(url);
    const data = response.data.data;
    return data;
  };

  static getUserDashboard = async (
    wallet: string,
  ): Promise<IDashboardUsers[] | undefined> => {
    if (!wallet) {
      return undefined;
    }
    const url = `${api}/dashboard/users/${wallet}`;

    const response = await axios.get(url);
    const data = response.data.response;
    return data;
  };
}
