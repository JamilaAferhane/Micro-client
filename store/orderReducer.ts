// store/orderReducer.ts

const initialState = {
  order: Object,
};

const orderReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: { type: "SET_ORDER"; payload: any }
) => {
  switch (action.type) {
    case "SET_ORDER":
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
