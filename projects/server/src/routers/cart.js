const { cartController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require("../config/token");
const { validateAddToCart } = require("../config/validator");
const { differentStoreAddToCart } = require("../middleware/cart");

route.get("/get-cart-list", readToken, cartController.getCartList);
route.post("/add-new-cart", cartController.initCartUser);
route.post(
  "/add-to-cart",
  readToken,
  validateAddToCart,
  differentStoreAddToCart,
  cartController.addToCart
);
route.patch("/update-cart-qty", readToken, cartController.updateCartQuantity);
route.patch("/delete-item", readToken, cartController.deleteFromCart);
route.patch("/replace-cart", readToken, cartController.replaceCart);
route.patch(
  "/delete-cart-item-after-order",
  readToken,
  cartController.deleteCartItemAfterOrder
);

module.exports = route;
