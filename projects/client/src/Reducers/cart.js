const INITIAL_STATE = [];

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CART_LIST":
      return action.payload;
    default:
      return state;
  }
};
