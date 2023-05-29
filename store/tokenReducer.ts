// store/tokenReducer.ts
import { TokenActionTypes, TokenState } from "./types";

const initialState: TokenState = {
  token: "",
};

const tokenReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: TokenActionTypes
): TokenState => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default tokenReducer;
