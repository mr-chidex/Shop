const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcryptJs = require("bcryptjs");

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [{
        product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
        qty: {
            type: Number,
            required: true
        }
    }]

});

userSchema.pre("save", async function (next) {
    try {
        const salt = await bcryptJs.genSalt(12);
        const hashedPassword = await bcryptJs.hash(this.password, salt);
        this.password = hashedPassword;
        this.confirmPassword = hashedPassword;
    }
    catch (err) {
        next(new Error(err));
    }
})

module.exports = mongoose.model("User", userSchema);