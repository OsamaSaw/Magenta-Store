export type VotesType = {
  count: number;
  value: number;
};

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[];
};

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
};

export type ProductType = {
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  images: string[];
  discount?: string;
  description: string;
  sysReq: string;
  keyAct: string;
  lang: string;
};

export type ProductTypeList = {
  id: string;
  name: string;
  price: string;
  color: string;
  images: string[];
  discount?: string;
};

export type ProductStoreType = {
  id: string;
  name: string;
  thumb: string;
  price: number;
  count: number;
  // color: string;
  // size: string;
};

export type GtagEventType = {
  action: string;
  category: string;
  label: string;
  value: string;
};
