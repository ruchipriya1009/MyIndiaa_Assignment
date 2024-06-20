const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  Product: {
    type: String,
  },
  amount: {
    type: Number,
  },
  username: {
    type: String,
  },
  user: {
    type: String,
  },
  ProductId: {
    type: String,
  },
  billingAddress: {
    type: String,
  },
});

module.exports = { orderSchema };
