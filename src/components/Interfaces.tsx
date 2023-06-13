export type IStateFromStore = {
  accountsRooms: {
    allAccounts: Record<string, IAccount>;
    allRooms: IRoom[];
  };
};

export type IItem = {
  Accounts: IAccount;
  Rooms: IRoom[];
};

export type IAccount = {
  image: string;
  password: string;
};

type IAccounts = Record<string, IAccount>;

export type IRoom = {
  checkInDate: string | null;
  description: string;
  features: string[];
  gallery: string[];
  guest: string;
  id: string;
  isCheckedIn: boolean;
  number: number;
  occupancy: number;
  price: number;
  type: string;
};

export type IAccountsRoomsSliceState = {
  allAccounts: IAccounts;
  allRooms: IRoom[];
};

export type IFormValues = {
  username: string;
  password: string;
  remember: boolean;
};

export type TableColoumns = {
  key: string;
  number: number;
  type: string;
  occupancy: number;
  price: number;
  guest: string;
  link: string;
};

export type FilterTable = {
  text: string | number;
  value: string | number;
};
