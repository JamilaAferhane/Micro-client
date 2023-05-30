// store/productReducer.ts
import { ProductActionTypes, ProductsState } from "./types";

const initialState: ProductsState = {
  products: [],
  shoppingCart: [],
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
    case "ADD_TO_SHOPPING_CART": {
      const newItems = Array.isArray(action.payload)
        ? action.payload // If payload is an array, use it directly
        : [action.payload]; // If payload is a single object, create an array with it

      return {
        ...state,
        shoppingCart: [...state.shoppingCart, ...newItems],
      };
    }
    case "REMOVE_FROM_SHOPPING_CART": {
      const removedItem = state.shoppingCart.filter(
        (prod) => prod._id === action.payload._id
      )[0];
      if (removedItem.quantity === 1) {
        return {
          ...state,
          shoppingCart: [
            ...state.shoppingCart.filter(
              (prod) => prod._id === removedItem._id
            ),
          ],
        };
      }

      return {
        ...state,
        shoppingCart: [
          ...state.shoppingCart.filter((prod) => prod._id === removedItem._id, {
            ...removedItem,
            quantity: removedItem.quantity ? removedItem.quantity - 1 : 0,
          }),
        ],
      };
    }

    default:
      return state;
  }
};

export default productReducer;
