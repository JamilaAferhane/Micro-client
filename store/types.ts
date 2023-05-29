// store/types.ts
import { UserType } from "../common/types/@appTypes";

// types.ts

export interface UserState {
  authenticatedUser: UserType | null;
  error?: string | null;
}

export interface SetUserAction {
  type: "SET_USER";
  payload: UserType;
}

export interface LogoutUserAction {
  type: "LOGOUT_USER";
}
export interface LoginErrorAction {
  type: "LOGIN_ERROR";
  payload: string;
}
export type UserAction = SetUserAction | LogoutUserAction | LoginErrorAction;

export interface TokenState {
  token: string | null;
}

export interface SetTokenAction {
  type: "SET_TOKEN";
  payload: string;
}

export type TokenActionTypes = SetTokenAction;

export interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface ProductsState {
  products: Product[];
}

export interface SetProductsAction {
  type: "SET_PRODUCTS";
  payload: Product[];
}

export interface RootState {
  user: UserState;
  token: TokenState;
  products: ProductsState;
}

export type ProductActionTypes = SetProductsAction;
