const express = require('express');
const app = express();
const cors = require('./middlewares/cors');
// const Book = require('./models/book');
const bcrypt = require('bcrypt');




const User = require('./models/user');
const jwt = require('jsonwebtoken');

app.use(cors);
app.use(express.json());

app.use('/api/books', require('./routes/bookRoutes'));
// app.use('api/auth', require('./routes/authRoutes'));

// Inscription
app.post('/api/auth/signup', async (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
});

// Connexion
app.post('/api/auth/login', async (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
                    res.status(200).json({
                        userId: user._id,
                        token: token,
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
});

module.exports = app;
