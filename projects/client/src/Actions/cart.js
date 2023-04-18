import axios from "axios";
import { API_URL } from "../helper";

export const getCartList = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("xmart_login");
      let result = await axios.get(`${API_URL}/cart/get-cart-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "CART_LIST",
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
