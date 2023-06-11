const express = require("express");
const {
    loginUser,
  } = require("../utils/validation");
  const userController = require("../controllers/auth/authController");
  const { authenticate } = require("../middlewares/auth");
  
const router = express.Router();

router.route("/signup").post(userController.signup);

router.route("/login").post(userController.login);


//current user
router.route("/current-user").get(authenticate, userController.currentUser);

module.exports = router;
