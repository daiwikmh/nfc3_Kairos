const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Adjust the path if needed

// Admin Signup Route
router.post(
    '/signup',
    [
        check('companyName', 'Company Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { companyName, email, password } = req.body;

        try {
            let admin = await Admin.findOne({ email });

            if (admin) {
                return res.status(400).json({ message: 'Admin already exists' });
            }

            admin = new Admin({
                companyName,
                email,
                password,
            });

            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);

            await admin.save();

            const payload = {
                admin: {
                    id: admin.id,
                    companyName: admin.companyName,
                    email: admin.email,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, admin: payload.admin });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Admin Login Route
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        

        try {
            let admin = await Admin.findOne({ email });
            console.log(admin)

            if (!admin) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const payload = {
                admin: {
                    id: admin.id,
                    companyName: admin.companyName,
                    email: admin.email,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, admin: payload.admin });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
