const mongoose = require("mongoose");

const { ERRORS } = require("../../constants/index");


const categorySchema = new mongoose.Schema(
  {
   
    title: {
      type: String,
      unique: true,
      required: [true, ERRORS.REQUIRED.TITLE_REQUIRED],    },
      
   
  },
  {
    timestamps: true,
   
  }
);





const Category = mongoose.model("category", categorySchema);
module.exports = Category;
