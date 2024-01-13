const express = require('express');
const app = express();
const cors = require('./middlewares/cors');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require("path");

app.use(cors);
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
