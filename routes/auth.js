const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    const user = new User({ username, password });
    await user.save();

    res.status(200).send("Registered successfully");
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send("Logged in");
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send("Logged out");
});

module.exports = router;
