// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Load env
dotenv.config();

// Express App
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

// ============= SCHEMAS =============

// Mentee Schema
const menteeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    agreedToTerms: Boolean,
}, { collection: "mentees" });

const Mentee = mongoose.model("Mentee", menteeSchema);

// Mentor Schema
const mentorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    agreedToTerms: Boolean,
}, { collection: "mentors" });

const Mentor = mongoose.model("Mentor", mentorSchema);

// ============= REGISTER API =============

app.post("/api/register", async (req, res) => {
    const { firstName, lastName, email, password, role, agreedToTerms } = req.body;

    if (!firstName || !lastName || !email || !password || !role || !agreedToTerms) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        if (role === "mentee") {
            const mentee = new Mentee({ firstName, lastName, email, password: hashedPassword, agreedToTerms });
            await mentee.save();
        } else if (role === "mentor") {
            const mentor = new Mentor({ firstName, lastName, email, password: hashedPassword, agreedToTerms });
            await mentor.save();
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }

        res.json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// ============= LOGIN API =============

app.get("/api/login", async (req, res) => {
    const { email, password, role } = req.query;

    if (!email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    let user;
    if (role === "mentee") {
        user = await Mentee.findOne({ email });
    } else if (role === "mentor") {
        user = await Mentor.findOne({ email });
    } else {
        return res.status(400).json({ error: "Invalid role" });
    }

    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    res.json(user);
});

// ============= SERVER START =============

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
