const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name must be provided"],
    },
    price: {
        type: Number,
        required: [true, "product price must be provided"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        // Limit Possible options for company field
        // Custom error message if any value entered is out of the scope of our hardcoded ones
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not supported",
        },
        // enum: ["ikea", "liddy", "caressa", "marcos"],
    },
});

module.exports = mongoose.model("Product", productSchema);
