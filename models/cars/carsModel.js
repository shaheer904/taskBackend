const mongoose = require("mongoose");

const { ERRORS } = require("../../constants/index");


const carSchema = new mongoose.Schema(
  {
   
    color: {
      type: String,
    },
    model: {
        type: String,
      },
    make: {
        type: String,
      },
      category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
      }
  },
  {
    timestamps: true,
   
  }
);


carSchema.pre(/^find/, function (next) {
  this.populate(
    'category',
  )
  next();
});


const Car = mongoose.model("car", carSchema);
module.exports = Car;
