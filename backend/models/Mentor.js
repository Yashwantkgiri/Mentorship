const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    agreedToTerms: Boolean
});

const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;
