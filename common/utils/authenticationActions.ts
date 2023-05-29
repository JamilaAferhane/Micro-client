import { Dispatch } from "redux";
import { UserType } from "../types/@appTypes";
import { UserAction } from "../../store/types";

export const loginSuccess = (user: UserType): UserAction => ({
  type: "SET_USER",
  payload: user,
});

export const loginError = (error: string): UserAction => ({
  type: "LOGIN_ERROR",
  payload: error,
});

export const loginUser =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>): Promise<void> => {
    try {
      // Perform login API request
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        // Dispatch the login success action
        console.log(user);
        dispatch(loginSuccess(user));
      } else {
        // Handle login error
        const error = await response.text();
        console.log(error);
        dispatch(loginError(error));
      }
    } catch (error) {
      // Handle network error
      console.log(error);
      dispatch(loginError("Network error"));
    }
  };
export const registerUser =
  (email: string, password: string, fullname: string, credit: number) =>
  async (dispatch: Dispatch<UserAction>): Promise<void> => {
    try {
      // Perform login API request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, fullname, credit }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        const { email, password, fullname, credit, token } = data;
        const user: UserType = { email, password, fullname, credit, token };
        // Dispatch the login success action
        console.log(user);
        dispatch(loginSuccess(user));
      } else {
        // Handle login error
        const error = await response.text();
        console.log(error);
        dispatch(loginError(error));
      }
    } catch (error) {
      // Handle network error
      console.log(error);
      dispatch(loginError("Network error"));
    }
  };
