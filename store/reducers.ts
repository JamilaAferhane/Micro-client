// store/reducers.ts
import { combineReducers, Reducer } from "redux";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import productReducer from "./productReducer";
import { RootState } from "./types";

const rootReducer: Reducer<RootState> = combineReducers({
  user: userReducer,
  token: tokenReducer,
  products: productReducer,
});

export default rootReducer;
