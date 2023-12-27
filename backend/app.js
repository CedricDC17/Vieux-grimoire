const express = require('express');
const Thing = require('./models/thing');
const authController = require('./authController
');

const app = express();

// Middleware  CORS , parsing JSON
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

// Thing test
const thing = new Thing({
    title: 'Mon premier objet',
    description: 'Les infos de mon premier objet',
    imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    userId: 'qsomihvqios',
    review: 'Très bon livre.',
});

// Save Thing
thing.save()
    .then(thing => {
        console.log('Objet enregistré avec succès !', thing);
    })
    .catch(err => {
        console.error('Erreur lors de l\'enregistrement de l\'objet :', err);
    });

// API 
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

app.get('/api/auth', authController.get);

// Export app
module.exports = app;