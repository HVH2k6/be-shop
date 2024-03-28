const mongoose = require("mongoose");

// Define the schema
const productSchema = new mongoose.Schema({
    name_product: String,
    price_product: Number,
    image_product: String,
    status: String,
    deleted: Boolean,
    position: Number,
});

// Define the model
const Product = mongoose.model("Product", productSchema, "products");

// Export the model
module.exports = Product;
