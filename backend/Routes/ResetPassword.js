const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); 

router.post('/resetpassword', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.updateOne({ email }, { password: hashedPassword });

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ success: true, message: 'Password changed successfully!' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ success: false, message: 'Error resetting password. Please try again.' });
    }
});

module.exports = router;
