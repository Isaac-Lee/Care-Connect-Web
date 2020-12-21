const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, default: true },
    type: { type: String, required: true },
    long: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);