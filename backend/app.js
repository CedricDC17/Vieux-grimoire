const express = require('express');
const app = express();
const cors = require('./middlewares/cors');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');


// const Book = require('./models/book');
// const bcrypt = require('bcrypt');
// const User = require('./models/user');
// const jwt = require('jsonwebtoken');

app.use(cors);
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);



module.exports = app;
