const route = require("express").Router();
const { readToken } = require("../config/token");
const { categoryImgUploader } = require("../config/uploader");
const { categoryController } = require("../controllers");

route.get("/categories", categoryController.fetchCategories);
route.get("/get-categories", readToken, categoryController.getCategories);
route.post("/add-category", readToken, categoryController.addCategory);
route.patch("/edit-category/:id", readToken, categoryController.editCategory);
route.patch("/delete-category/:id", categoryController.deleteCategory);
route.patch("/restore-category/:id", categoryController.restoreCategory);
route.get("/category-detail/:id", categoryController.getCategoryDetail);
route.patch(
    "/upload-category/:id",
    categoryImgUploader("/imgCategory", "IMGCATEGORY").array("images", 1),
    categoryController.uploadCategoryImg
);

module.exports = route;