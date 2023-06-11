const mongoose = require("mongoose");

const db = process.env.DB_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      autoIndex: true,
    });
    console.log("Mongo DB Connected Successfuly");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
