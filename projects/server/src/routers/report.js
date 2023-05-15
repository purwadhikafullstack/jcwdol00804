const route = require("express").Router();
const { readToken } = require("../config/token");
const { reportController } = require("../controllers");

route.get(
  "/get-stock-movement-report",
  readToken,
  reportController.getStockMovementReport
);
route.get(
  "/get-stock-movement-detail",
  readToken,
  reportController.getStockMovementDetail
);
route.get(
  "/get-category-data-branch",
  readToken,
  reportController.getCategoryDataBranch
);
route.get(
  "/get-sales-data-branch",
  readToken,
  reportController.getSalesDataBranch
);

module.exports = route;
