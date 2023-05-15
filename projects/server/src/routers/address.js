const route = require("express").Router();
const { addressController } = require("../controllers");
const { readToken } = require("../config/token");

route.get("/my-address", readToken, addressController.getAddress);
route.post("/add-address", readToken, addressController.addAddress);
route.put("/delete/:id", addressController.deleteAddress);
route.put("/set-main/:id", readToken, addressController.setMain);
route.get(
  "/available-courier",
  readToken,
  addressController.getAvailableCourier
);
route.get("/my-address/:id", addressController.getDetailAddress);
route.patch("/edit-address/:id", addressController.editDetailAddress);

module.exports = route;
