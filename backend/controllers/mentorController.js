const Mentee = require('../models/Mentee');
const bcrypt = require('bcrypt');

// Register Mentee
exports.registerMentee = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingMentee = await Mentee.findOne({ email });

        if (existingMentee) {
            return res.status(400).json({ message: 'Mentee already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const mentee = new Mentee({ username, email, password: hashedPassword });

        await mentee.save();
        res.status(201).json({ message: 'Mentee registered successfully', mentee });
    } catch (error) {
        console.error('Mentee Registration Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login Mentee
exports.loginMentee = async (req, res) => {
    try {
        const { email, password } = req.body;
        const mentee = await Mentee.findOne({ email });

        if (!mentee) {
            return res.status(400).json({ message: 'Mentee not found' });
        }

        const isMatch = await bcrypt.compare(password, mentee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Mentee logged in successfully', mentee });
    } catch (error) {
        console.error('Mentee Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
