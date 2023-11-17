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
  ParentId: string;
  ProgramName: string;
  Category: string;
  Price: number;
  count: string;
  Thumb: string;
  Discount: number;
  Url: string;
  Devices: string;
  Years: string;
};

export type ProductTypeList = {
  id: string;
  name: string;
  price: number;
  image: string;
  discount: number;
  url: string;
  devices: string;
  years: string;
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
export type ProductDataType = {
  Category: string;
  Steps: string[];
  Description: string;
  DownloadLink: string;
  Images: string[];
  SystemRequirements: {
    HardDiskSpace: string;
    Memory: string;
    OperatingSystem: string;
    Others: string;
    Processor: string;
  };
  Tag: string;
};

export type GtagEventType = {
  action: string;
  category: string;
  label: string;
  value: string;
};
