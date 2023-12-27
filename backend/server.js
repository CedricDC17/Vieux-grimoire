const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://user1:user1@grimoire.bp122n4.mongodb.net/test?retryWrites=true&w=majority');
const db = mongoose.connection;

// Création du serveur
const server = http.createServer(app);

// Gestion des erreurs de connexion à MongoDB
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
    console.log('Connexion réussie à MongoDB !');
});

// Normalisation du port
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

// Gestionnaire d'erreurs liées au serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' nécessite des privilèges élevés.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' est déjà utilisé.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Gestion des erreurs et affichage de l'adresse d'écoute
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Écoute sur ' + bind);
});

// Démarrage du serveur
server.listen(port);
