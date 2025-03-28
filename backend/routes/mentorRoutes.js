const express = require('express');
const Mentor = require('../models/Mentor');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, expertise, bio } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const mentor = await Mentor.create({ name, email, password: hashedPassword, expertise, bio });
        res.json(mentor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const mentor = await Mentor.findOne({ email });
    if (!mentor) return res.status(404).json({ error: "Mentor not found" });
    const valid = await bcrypt.compare(password, mentor.password);
    valid ? res.json(mentor) : res.status(400).json({ error: "Invalid password" });
});

module.exports = router;
