/* eslint-disable no-undef */
export type ChildrenProps = {
  children: JSX.Element[] | JSX.Element;
};

export type Product = {
  _id: any;
  title: string;
  description: string;
  price: number;
  quantity?: number;
  rating?: string;
  image?: string[];
  inStock?: boolean;
  review?: string[];
  categories: string;
};

export interface UserType {
  email: string;
  fullname: string;
  password?: string;
  token?: string;
  role?: string;
  credit: number;
}
export interface CartItem extends Product {
  quantity: number;
}

export type Cart = {
  cartItems: CartItem[];
  shippingAddress?: Object;
  paymentMethod?: string;
};
