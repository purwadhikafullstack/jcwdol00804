export const changeStoreAction = (data) => {
  return {
    type: "CHANGE_STORE",
    payload: data,
  };
};

export const setDefaultStore = () => {
  return {
    type: "CHANGE_STORE",
    payload: { defaultStore: "Xmart Jakarta" },
  };
};
