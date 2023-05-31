// store/reducers.ts
import { combineReducers, Reducer } from "redux";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import productReducer from "./productReducer";
import { RootState } from "./types";
import orderReducer from "./orderReducer";

const rootReducer: Reducer<RootState> = combineReducers({
  user: userReducer,
  token: tokenReducer,
  products: productReducer,
  order: orderReducer,
});

export default rootReducer;
