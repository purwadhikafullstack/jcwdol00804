const route = require("express").Router();
const { userController } = require("../controllers");
const {
  validateSignUp,
  validateForgot,
  validateNewPass,
  validateSignIn,
  validateEditProfile,
} = require("../config/validator");
const { readToken } = require("../config/token");
const { imgUploader } = require("../config/uploader");

// User
route.post("/sign-up", validateSignUp, userController.signUp);
route.patch("/verify", readToken, userController.verifyEmail);
route.post("/sign-in", validateSignIn, userController.signIn);
route.get("/keep-login", readToken, userController.keepLogin);
route.post("/forgot-password", validateForgot, userController.forgotPass);
route.patch(
  "/reset-password",
  validateNewPass,
  readToken,
  userController.resetPass
);
route.patch(
  "/change-password",
  validateNewPass,
  readToken,
  userController.changePass
);
route.patch(
  "/update-profile",
  validateEditProfile,
  readToken,
  userController.editProfile
);
route.get("/unique-email/:email", userController.uniqueEmail);
route.patch(
  "/upload-profile-img",
  readToken,
  imgUploader("/imgProfile", "IMGPROFILE").array("images", 1),
  userController.uploadProfileImg
);
route.get("/get-user-info", readToken, userController.getUserInfo);

// Admin
route.get("/get-branch-admin", userController.getBranchAdmin);
route.post("/add-branch-admin", userController.addBranchAdmin);

module.exports = route;
