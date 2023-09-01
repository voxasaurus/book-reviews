// models/Book.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    // ... other fields
});

module.exports = mongoose.model('Book', bookSchema);

// routes/books.js
app.get('/search', async (req, res) => {
    try {
        const { title, author, genre } = req.query;
        const searchCriteria = {};
        if (title) searchCriteria.title = { $regex: title, $options: 'i' }; // regex for partial matching, case insensitive
        if (author) searchCriteria.author = { $regex: author, $options: 'i' };
        if (genre) searchCriteria.genre = genre;

        const books = await Book.find(searchCriteria);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error searching books', error });
    }
});
