const express = require("express");
const productRoute = express.Router();
const { auth, authorize } = require("../../middlewares/autherization");

const {
  validateProduct,
  validateFilters,
} = require("../../middlewares/validation");
const {
  handleProductUpload,
  getAllProducts,
  handleProductById,
  getProductsUsingFilter,
} = require("../controllers/controller");

productRoute.post(
  "/productUpload",
  auth,
  authorize(["seller"]),
  validateProduct,
  handleProductUpload
);
productRoute.get("/products", getAllProducts);
productRoute.get("/filterProducts", validateFilters, getProductsUsingFilter);
productRoute.get("/product/:id", handleProductById);

module.exports = { productRoute };
