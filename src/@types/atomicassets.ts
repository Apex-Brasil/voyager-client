export interface Collection {
  collection_name: string;
  name: string;
  img: string;
  images: string;
  author: string;
  allow_notify: boolean;
  authorized_accounts: string[];
  notify_accounts: string[];
  market_fee: number;
  created_at_block: string;
  created_at_time: string;
}

export interface Data {
  img?: string;
  video?: string;
  ease?: number;
  luck?: number;
  name?: string;
  type?: string;
  delay?: number;
  shine?: string;
  cardid?: number;
  rarity?: string;
  backimg?: string;
  difficulty?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MutableData = any;
export interface Token {
  token_symbol: string;
  token_precision: number;
  token_contract: string;
}
export interface Price {
  market_contract: string;
  token: Token;
  median: string;
  average: string;
  suggested_median: string;
  suggested_average: string;
  min: string;
  max: string;
  sales: string;
}

export interface Format {
  name: string;
  type: string;
}
export interface Schema {
  schema_name: string;
  format: Format[];
  created_at_block: string;
  created_at_time: string;
}

export interface Template {
  template_id: string;
  max_supply: string;
  is_transferable: boolean;
  is_burnable: boolean;
  issued_supply: string;
  immutable_data: Data;
  created_at_time: string;
  created_at_block: string;
}

export interface TemplateBuyoffer {
  market_contract: string;
  buyoffer_id: string;
  token_symbol: string;
}

export interface IAtomicAsset {
  contract: string;
  asset_id: string;
  owner: string;
  is_transferable: boolean;
  is_burnable: boolean;
  collection: Collection;
  schema: Schema;
  template: Template;
  mutable_data: MutableData;
  immutable_data: MutableData;
  template_mint: string;
  backed_tokens: any[];
  burned_by_account: null;
  burned_at_block: null;
  burned_at_time: null;
  updated_at_block: string;
  updated_at_time: string;
  transferred_at_block: string;
  transferred_at_time: string;
  minted_at_block: string;
  minted_at_time: string;
  sales: any[];
  auctions: any[];
  prices: Price[];
  template_buyoffers: TemplateBuyoffer[];
  data: Data;
  name: string;
}
