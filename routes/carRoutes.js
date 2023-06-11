  const express = require("express");
    const carController = require("../controllers/carsController/carsController");
    const { authenticate } = require("../middlewares/auth");
    
    const router = express.Router();
    
    router
      .route("/")
      .post(
        authenticate,
        
        carController.createOne
      )
      .get(
        authenticate,
        carController.getAll
      );
    
    
    
    
    
    router
      .route("/:id")
      .get(authenticate, carController.getOne)
      .patch(
        authenticate,
        carController.updateOne
      )
      .delete(
        authenticate,
        carController.deleteOne
      );
    
    module.exports = router;
    