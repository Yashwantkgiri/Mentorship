import Mentor from "../models/mentor.js";
import Mentee from "../models/mentee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER Controller
export const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user;

        if (role === "mentor") {
            const existingMentor = await Mentor.findOne({ email });
            if (existingMentor) return res.status(400).json({ message: "Mentor already exists" });

            user = new Mentor({ fullName, email, password: hashedPassword });
            await user.save();
        } else if (role === "mentee") {
            const existingMentee = await Mentee.findOne({ email });
            if (existingMentee) return res.status(400).json({ message: "Mentee already exists" });

            user = new Mentee({ fullName, email, password: hashedPassword });
            await user.save();
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        res.status(201).json({ message: `${role} registered successfully` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed" });
    }
};

// LOGIN Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await Mentor.findOne({ email });
        let role = "mentor";

        if (!user) {
            user = await Mentee.findOne({ email });
            role = "mentee";
        }

        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
};
