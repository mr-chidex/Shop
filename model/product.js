const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);