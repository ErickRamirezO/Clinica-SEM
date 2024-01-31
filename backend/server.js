const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'hospital' });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error);
});

db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Rutas de autenticación
app.use('/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});