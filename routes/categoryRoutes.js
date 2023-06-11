const express = require("express");
const catController = require("../controllers/categoryController/categoryController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(
    authenticate,
    catController.createOne
  )
  .get(
    authenticate,
    catController.getAll
  );





router
  .route("/:id")
  .get(authenticate, catController.getOne)
  .patch(
    authenticate,
    catController.updateOne
  )
  .delete(
    authenticate,
    catController.deleteOne
  );

module.exports = router;
