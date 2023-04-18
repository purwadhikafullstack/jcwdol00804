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
const { profileImgUploader } = require("../config/uploader");

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
  profileImgUploader("/imgProfile", "IMGPROFILE").array("images", 1),
  userController.uploadProfileImg
);
route.get("/get-user-info", readToken, userController.getUserInfo);

module.exports = route;
