const Mentor = require("../models/Mentor");
const Mentee = require("../models/Mentee");
const bcrypt = require("bcrypt");

// REGISTER
const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === "mentor") {
            const mentor = new Mentor({
                fullName,
                email,
                password: hashedPassword,
                role
            });
            await mentor.save();
            return res.status(201).json({ message: "Mentor registered successfully" });
        } else {
            const mentee = new Mentee({
                fullName,
                email,
                password: hashedPassword,
                role
            });
            await mentee.save();
            return res.status(201).json({ message: "Mentee registered successfully" });
        }

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Server error during registration" });
    }
};

// LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const Model = role === "mentor" ? Mentor : Mentee;
        const user = await Model.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error during login" });
    }
};

module.exports = { registerUser, loginUser };
