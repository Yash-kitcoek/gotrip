const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js");
require("dotenv").config();

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URL);
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Database seeded");
  process.exit();
}

seedDB();
