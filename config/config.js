require("dotenv").config();
const mongoose = require("mongoose");
const connection = mongoose.connect(`${process.env.mongoURL}`);

connection
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.export = { connection };
