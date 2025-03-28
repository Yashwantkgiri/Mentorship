const mongoose = require("mongoose");

const menteeSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    agreedToTerms: Boolean
});

const Mentee = mongoose.model("Mentee", menteeSchema);
module.exports = Mentee;
