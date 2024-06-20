const { userSchema } = require("./user.model");
const { productSchema } = require("./product.model");
const { orderSchema } = require("./order.model");
const mongoose = require("mongoose");

const User = mongoose.model("user", userSchema);
const products = mongoose.model("products", productSchema);
const ordersModel = mongoose.model("orders", orderSchema);

module.exports = { User, products, ordersModel };
