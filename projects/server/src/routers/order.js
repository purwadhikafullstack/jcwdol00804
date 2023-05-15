const { readToken } = require("../config/token");
const { orderController } = require("../controllers");
const route = require("express").Router();
const { paymentImgUploader } = require("../config/uploader")

route.post("/create-new-order", readToken, orderController.createNewOrder);
route.get("/get-order-list", readToken, orderController.getOrderList);
route.get("/get-order-detail/:id", readToken, orderController.getOrderDetail);
route.get("/get-product-info/:id", readToken, orderController.getProductInfo);
route.get("/payment/:id", readToken, orderController.getPayment);
route.patch(
    "/upload-payment/:id",
    paymentImgUploader("/imgPayment", "IMGPAYMENT").array("images", 1),
    orderController.uploadPaymentImg
);
route.patch("/cancel-order/:id", orderController.cancelOrder);

module.exports = route;
