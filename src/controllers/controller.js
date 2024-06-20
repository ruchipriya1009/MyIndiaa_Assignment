const {
  userRegister,
  userLogin,
  handleUpload,
  handleGetAllProducts,
  getProductsByFilter,
  getProductById,
} = require("../transactions/transaction");
const bcrypt = require("bcrypt");
const { JSONResponse, ErrorResponse } = require("../../views/views");

const handleRegister = async (req, res) => {
  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 4);
    req.body.password = hash;
    console.log(req.body.password);
    await userRegister(req);
    JSONResponse(res, 201, { msg: "user registered successfull" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: error.message });
  }
};

const handleLogin = async (req, res) => {
  try {
    const result = await userLogin(req);
    if (result.status) {
      JSONResponse(res, 200, { result, msg: "user login successfull" });
    } else {
      ErrorResponse(res, 400, { msg: result.msg });
    }
  } catch (error) {
    ErrorResponse(res, 500, { msg: "something went wrong" });
  }
};

const handleProductUpload = async (req, res) => {
  try {
    const data = await handleUpload(req);
    JSONResponse(res, 201, { data, msg: "product uploaded succesfully" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: "something went wrong" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const pageOffset = parseInt(req.query.pageOffset) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    console.log(pageOffset, pageSize, "hi1");
    const data = await handleGetAllProducts(pageOffset, pageSize);
    JSONResponse(res, 200, { data, msg: "fetched Successfully" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: error });
  }
};

const handleProductById = async (req, res) => {
  try {
    const user = req.params.id;
    const data = await getProductById(user);
    JSONResponse(res, 200, { data, msg: "product fetched successfull" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: error });
  }
};

const getProductsUsingFilter = async (req, res) => {
  try {
    const pageOffset = parseInt(req.query.pageOffset) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;
    console.log(pageOffset, pageSize, "h1");
    const data = await getProductsByFilter(req, pageOffset, pageSize);
    JSONResponse(res, 200, { data, msg: "fetched successfully" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: error });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleProductUpload,
  getAllProducts,
  handleProductById,
  getProductsUsingFilter,
};
