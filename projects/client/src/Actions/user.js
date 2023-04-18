export const loginAction = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const logoutAction = () => {
  localStorage.removeItem("xmart_login");
  return {
    type: "LOGOUT",
  };
};

export const updateProfile = (data) => {
  return {
    type: "UPDATE_PROFILE",
    payload: data,
  };
};
