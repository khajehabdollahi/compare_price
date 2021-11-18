const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  comparePrice: {
    type: Number,
    required: true,
  },
  shopName: {
    type: String
  },
});

productSchema.index({ category: "text" });
module.exports = mongoose.model("Product", productSchema);
