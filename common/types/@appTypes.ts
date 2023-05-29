/* eslint-disable no-undef */
export type ChildrenProps = {
  children: JSX.Element[] | JSX.Element;
};

export type Product = {
  _id: any;
  title: string;
  description: String;
  image: string;
  price: number;
};

export interface UserType {
  email: string;
  fullname: string;
  password?: string;
  token?: string;
  role?: string;
  credit?: number;
}
