const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        // Validator : used to match the regex with the new email entered
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email",
        ],
        // Not a validator, just creates a unique index for every user
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
});

// Setting up middleware for mongoose, rather writing code in controlers
// Used function keyword here so that `this` keyword will always point to our document in the DB we are inserting
UserSchema.pre(
    "save",
    await function (next) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
);

module.exports = mongoose.model("User", UserSchema);
