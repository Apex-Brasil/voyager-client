export type AbiProviderProps = {
  endpoint: string;
  fetchBuiltin(): Promise<any>;
};

export type SignatureProviderProps = {
  getAvailableKeys(): Promise<any>;
  sign(value: any): Promise<any>;
};

export type RpcEndpointsProps = [
  {
    protocol: string;
    host: string;
    port: string;
  },
];

export type ChainProps = {
  chainId: string;
  rpcEndpoint: RpcEndpointsProps;
};

export interface ApiProps {
  abiProvider: AbiProviderProps;
  authorityProvider: AbiProviderProps;
  chainId: string;
  signatureProvider: SignatureProviderProps;
}

export interface ActiveUserProps {
  accountName: string;
  api: ApiProps;
  chain: ChainProps;
  pubKeys: string[];
  requestPermission: string;
  signTransaction: Function;
}

export interface ICollectionStatus {
  author: string;
  collection_name: string;
  created_at_time: string;
  img: string;
  name: string;
  data: {
    description: string;
    img: string;
    name: string;
    socials: any;
    creator_info: any;
    images: {
      banner: string;
      logo: string;
    };
  };
}

export interface IVoyagerScoreData {
  id: string;
  collection_name: string;
  holder_score: number;
  volume_score: number;
  age_score: number;
  community_user_experience_score: number;
  community_innovation_score: number;
  community_engagement_score: number;
  community_art_work_score: number;
  community_support_score: number;
  community_reliability_score: number;
  audit_score: number;
  created_at: string;
  updated_at: string;
  totalScore: number;
}
export interface IVoyagerScoreObj {
  collection_name: string; // by router
  wallet: string; // user data
  user_experience_score: number; // 1st question
  innovation_score: number; // 3rd question
  community_engagement_score: number; // 4th question
  art_work_score: number; // 5th question
  reliability_score: number; // 6th question
  support_score: number; // 2nd question
  comment: string; // text box question
}
export interface ICollectionHolders {
  collectionName: string;
  totalAssets: number;
  totalAssetsCirculating: number;
  totalBurned: number;
  owners: string;
  "1-10": string;
  "11-20": string;
  "21-30": string;
  "31-40": string;
  "41-50": string;
  "51+": string;
}

interface cardImages {
  [key: string]: string;
}

interface cardSocials {
  [key: string]: string;
}

export interface CollectionCard {
  name: string;
  creator_info: string;
  img: string;
  images: cardImages | {};
  socials: cardSocials | {};
  url: string;
  sales?: string;
  volume?: string;
  banner?: string;
  collection_name: string;
}

export interface VolumeFilters {
  AllTimeVolume: string;
  total_volume_24_hours: string;
  total_volume_7_days: string;
  total_volume_30_days: string;
  total_volume_90_days: string;
}

export interface ICollectionItem {
  collection_name: string;
  img: string;
  name: string;
  sales: string;
  volume: string;
  totalScore?: number;
}

export interface ICollectionItemRanking {
  collection_name: string;
  img: string;
  name: string;
  sales: string;
  volumeFilters: VolumeFilters;
  totalScore?: number;
}

export interface IMutateOptions {
  key: any;
  id: any;
  currentData: any;
  fetcher: (url: string) => Promise<any>;
  property: string;
}

export interface IBalance {
  alcor_LP: {
    amount: number;
    currency: string;
  };
  taco_LP: {
    amount: number;
    currency: string;
  };
  decimals: string;
  amount: string;
  contract: string;
  currency: string;
  tokenInfos: {
    token_currency: string;
    token_last_price: number;
  };
}

export interface ISpecificToken {
  base_token: {
    symbol: {
      name: string;
      precision: number;
    };
  };
  quote_token: {
    symbol: {
      name: string;
      precision: number;
    };
    contract: string;
  };
  last_price: number;
}

export interface IMedian {
  id: number;
  owner: string;
  value: number;
  median: number;
  timestamp: string;
}

export interface IDataAlreadyVoted {
  id: string;
  collection_name: string;
  wallet: string;
  user_experience_score: number;
  innovation_score: number;
  community_engagement_score: number;
  support_score: number;
  art_work_score: number;
  reliability_score: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface IDataWashTrading {
  wash_trading_score: number;
}

export interface IDashboardUsers {
  id: string;
  google_id: string;
  twitter_id: null;
  twitter_username: null;
  username: string;
  email: string;
  account: null;
  permission: null;
  terms_accepted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Symbol {
  token_symbol: string;
  token_contract: string;
  token_precision: number;
}
export interface IDataMarket {
  symbol: Symbol;
  collection_name: string;
  volume: string;
  sales: string;
  img: string;
  author: string;
  authorized_accounts: string[];
}
