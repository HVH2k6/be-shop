const mongoose = require("mongoose");

module.exports.connect = async () => {

    try {
        await mongoose.connect("mongodb://localhost:27017/shop");
        console.log("connect success");
    } catch (error) {
        console.log(error);
    }
}


/**
 * 
 * const Product = mongoose.model("Product", {
    name: String
    
})
 */