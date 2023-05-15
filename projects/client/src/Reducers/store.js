const INITIAL_STATE = {
  defaultStore: "",
  userLocation: "",
};

export const storeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_STORE":
      return { ...state, ...action.payload };
    case "SET_DEFAULT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
