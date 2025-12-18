// init/index.js
const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.MONGO_URL;

if (!dbUrl) {
  throw new Error("MONGO_URL is not defined");
}

mongoose.connect(dbUrl)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
