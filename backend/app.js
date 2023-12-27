const express = require('express');
const app = express();
const cors = require('./middlewares/cors');
// const Book = require('./models/book');
const User = require('./models/user');

app.use(cors);

app.use('/api/books', require('./routes/bookRoutes'));
// app.use('api/auth', require('./routes/authRoutes'));

// Inscription
app.post('/api/auth/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created!' });
    } catch (error) {
        res.status(500).send(error);
    }
    console.log(req.body);
});

module.exports = app;
