export interface User {
  id: number;
  token: string;
  email: string;
  exp: string;
  role: string;
  status: string;
  birthday?: null;
  avatar: {url?: null};
  username: string;
}

export interface Meta {
  message: string;
  status: boolean;
  type: string;
}

export interface UserSubmit {
  email: string;
  password: string;
}

export interface UserResponse {
  data?: (User[]) | null,
  meta?: Meta,
}

export interface Item {
  id: number;
  name: string;
  created_at: string;
  price: number;
  updated_at: string;
  avatar: string;
  link: string;
  lenght: string;
}

export interface ListItem {
  listItem?: (Item)[] | null;
  meta?: Meta;
  
}

