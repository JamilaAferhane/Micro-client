// store/productReducer.ts
import { ProductActionTypes, ProductsState } from "./types";

const initialState: ProductsState = {
  products: [],
};

const productReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: ProductActionTypes
): ProductsState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
