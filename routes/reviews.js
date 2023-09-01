const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.post('/submit', async (req, res) => {
    try {
        const { title, author, review, rating } = req.body;

        // Optional: Check if a review for this book by this user already exists
        // This prevents users from submitting multiple reviews for the same book

        const newReview = new Review({
            title,
            author,
            review,
            rating,
            submittedBy: req.user._id // Assuming you have user authentication in place.
        });

        await newReview.save();

        res.status(200).json({ message: "Review submitted successfully." });

    } catch (error) {
        res.status(500).json({ message: "Error submitting review.", error: error.message });
    }
});

module.exports = router;
