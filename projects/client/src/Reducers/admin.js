const INITIAL_STATE = {
  toogleSideBar: true,
};

export const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOOGLE_SIDEBAR":
      return { ...state, toogleSideBar: action.payload };
    default:
      return state;
  }
};
