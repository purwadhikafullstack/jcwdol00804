const { readToken } = require("../config/token");
const { transactionController } = require("../controllers");
const route = require("express").Router();

route.get("/order-list-branch-admin", readToken, transactionController.orderListBranchAdmin);
route.get("/order-list-branch-admin/:id", transactionController.orderDetailBranchAdmin);
route.get("/get-product-info/:id", transactionController.getProductInfo);
route.patch("/accept-payment/:id", transactionController.acceptPayment);
route.patch("/refuse-payment/:id", transactionController.refusePayment);
route.patch("/send-order/:id", transactionController.sendOrder);
route.patch("/cancel-order/:id", transactionController.cancelOrder);
route.patch("/complete-order/:id", transactionController.completeOrder);

module.exports = route;