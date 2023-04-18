const INITIAL_STATE = {};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    case "UPDATE_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
