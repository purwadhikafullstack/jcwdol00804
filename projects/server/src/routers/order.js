const { readToken } = require("../config/token");
const { orderController } = require("../controllers");
const route = require("express").Router();

route.post("/create-new-order", readToken, orderController.createNewOrder);
route.get("/get-order-list", readToken, orderController.getOrderList);
route.get("/get-order-detail/:id", readToken, orderController.getOrderDetail);
route.get("/get-product-info/:id", readToken, orderController.getProductInfo);

module.exports = route;
