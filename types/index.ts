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
  Category: string;
  Price: number;
  count: number;
  Thumb: string;
  Discount: number;
  description: string;
  sysReq: string;
  keyAct: string;
  lang: string;
  Url: string;
};

export type ProductTypeList = {
  id: string;
  name: string;
  price: number;
  image: string;
  discount: number;
  url: string;
};

export type ProductStoreType = {
  id: string;
  name: string;
  image: string;
  price: string;
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
