const route = require("express").Router();
const { readToken } = require("../config/token");
const { imgUploader } = require("../config/uploader");
const { validateAddOrEditProduct } = require("../config/validator");
const { productController } = require("../controllers");

// User
route.get("/detail/:id", productController.getDetail);
route.get("/product-list", productController.getProducts);
route.get("/featured-products", productController.getFeaturedProducts);
route.patch(
  "/adjust-stock-after-order",
  readToken,
  productController.adjustStockAfterOrder
);
route.get("/get-branch-list", productController.getBranchList);
route.get("/get-closest-store", productController.getClosestStore);

// Admin
route.get("/admin/product-list", readToken, productController.getProductsAdmin);
route.get(
  "/admin/product-detail/:id",
  readToken,
  productController.getProductDetailAdmin
);
route.post(
  "/admin/add-product",
  readToken,
  validateAddOrEditProduct,
  productController.addProductAdmin
);
route.patch(
  "/admin/add-product-img",
  readToken,
  imgUploader("/imgProduct", "IMGPRODUCT").array("images", 1),
  productController.addProductImg
);
route.patch(
  "/admin/edit-product/:id",
  readToken,
  validateAddOrEditProduct,
  productController.editProduct
);
route.patch(
  "/admin/edit-product-img/:id",
  readToken,
  imgUploader("/imgProduct", "IMGPRODUCT").array("images", 1),
  productController.editProductImg
);
route.patch(
  "/admin/delete-product/:id",
  readToken,
  productController.deleteProduct
);
route.patch(
  "/admin/set-featured-product/:id",
  readToken,
  productController.setFeaturedProduct
);
route.patch("/admin/add-stock/:id", readToken, productController.addStock);
route.patch(
  "/admin/adjust-stock/:id",
  readToken,
  productController.adjustStock
);

module.exports = route;
