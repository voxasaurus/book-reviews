require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('config/passport-config')(passport); // Path might change based on where you put it

// Initialize the app
const app = express();

// Constants
const PORT = process.env.PORT || 3000;

// Connect to the database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware (if any, should be added here)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret', // In production, use a proper secret key
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.get('/', (req, res) => res.send('Book Review API'));

const bookRoutes = require('./routes/books');
app.use('/books', bookRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const readingListRoutes = require('./routes/readingLists');
app.use('/reading-lists', readingListRoutes);

const reviewRoutes = require('./routes/reviews');

app.use('/reviews', reviewRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


// ... rest of your code


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
