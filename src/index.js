const express = require("express");
const { connection } = require("../config/config");
const { userRoute } = require("./routes/user");
const { productRoute } = require("./routes/product");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.use("/api", userRoute);
app.use("/api", productRoute);
app.get("/", async (req, res) => {
  try {
    res.status(201).send("server is Running....<br><br><h1>Welcome Myindiaa</h1>");

  } catch (error) {
    res.status(500).send({ message: "Something Went Wrong" });
  }
});

const port = process.env.PORT || 8000;

app.listen(port, async (req, res) => {
  try {
    await connection;
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
