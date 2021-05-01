const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connect to DB");
});

app.listen(3000);
