// Mentee Schema
const menteeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    agreedToTerms: Boolean,
}, { collection: "mentee" }); // 💥 fixed

const Mentee = mongoose.model("Mentee", menteeSchema);
