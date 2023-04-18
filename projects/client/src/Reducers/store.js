const INITIAL_STATE = {
  defaultStore: "Xmart PIK Jakarta",
};

export const storeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_STORE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
