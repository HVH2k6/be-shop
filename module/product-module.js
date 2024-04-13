const mongoose = require("mongoose");

 const  slug = require('mongoose-slug-updater')
 mongoose.plugin(slug)
// Define the schema
const productSchema = new mongoose.Schema({
    name_product: String,
    price_product: Number,
    image_product: String,
    product_category: {
        type:String,
        default:""
    },
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    position: Number,
    deleted_at: Date,
    
    sale:Number,
    quantity:Number,
    description:String,
    image_product:String,
    slug:{
        type: String,
        slug: "name_product",
        unique: true
    }
    


},{
    timestamps: true
});

// Define the model
const Product = mongoose.model("Product", productSchema, "products");

// Export the model
module.exports = Product;
