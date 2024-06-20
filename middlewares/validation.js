const { query, body, validationResult } = require("express-validator");

const validateUser = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/)
    .withMessage("Email must be a valid address ending with .com or .in")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required"),
  body("address").optional().isString().withMessage("Address must be a string"),
  body("userType")
    .optional()
    .isString()
    .withMessage("User type must be a string"),
  body("mobile")
    .optional()
    .isNumeric()
    .withMessage("Mobile number must be number"),
  // This is for <Middleware to check the validation result>
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateProduct = [
  body("product")
    .isString()
    .withMessage("Product must be a string")
    .notEmpty()
    .withMessage("Product is required"),
  body("productCategory")
    .optional()
    .isString()
    .withMessage("Product category must be a string"),
  body("productQuantity")
    .optional()
    .isNumeric({ min: 1 })
    .withMessage("Product quantity must be an integer greater than 0"),
  body("productPrize")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("Product prize must be a positive number"),
  body("productSupplier")
    .optional()
    .isString()
    .withMessage("Product supplier must be a string"),

   // This is for <Middleware to check the validation result>
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/)
    .withMessage("Email must be a valid address ending with .com or .in")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required"),

   // This is for <Middleware to check the validation result>
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateFilters = [
  query("pageOffset")
    .notEmpty()
    .withMessage("pageOffset is required")
    .isNumeric()
    .withMessage("pageOffset must be numeric")
    .isInt({ min: 0 })
    .withMessage("pageOffset must be a non-negative integer"),

  query("pageSize")
    .notEmpty()
    .withMessage("pageSize is required")
    .isNumeric()
    .withMessage("pageSize must be numeric")
    .isInt({ min: 1 })
    .withMessage("pageSize must be a positive integer"),

  query("category")
    .optional()
    .isString()
    .withMessage("Invalid category, must be a string"),

   // This is for <Middleware to check the validation result>
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {
  validateUser,
  validateProduct,
  validateLogin,
  validateFilters,
};
