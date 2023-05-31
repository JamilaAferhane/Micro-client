// store/index.ts
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { RootState } from "./types";

const initialState = {} as RootState;

// const middleware = applyMiddleware(thunk);
const middleware = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, initialState, middleware);

export default store;
