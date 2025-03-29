// Mentor Schema
const mentorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    agreedToTerms: Boolean,
}, { collection: "mentor" }); // 💥 fixed

const Mentor = mongoose.model("Mentor", mentorSchema);