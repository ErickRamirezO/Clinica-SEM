const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User')
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: true }));

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

//Insertar un registro de persona
app.post('/crearP',(req,res )=>{
  User.create(req.body).then(users=>res.json(users))
  .catch(err=> res.json(err))
})

//mostrar los registros
app.get('/getUser/:id',(req,res)=>{
  const id= req.params.id;
  User.findById({_id:id})
  .then(users => res.json(users))
  .catch(err=>res.json(err))
})

// Mostrar todos los registros de usuarios
app.get('/getUser', (req, res) => {
  User.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

// Actualizar un usuario existente
app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  const updatedUserData = req.body; // Datos actualizados del usuario

  User.findByIdAndUpdate(id, updatedUserData, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(updatedUser);
    })
    .catch(err => res.status(500).json({ message: err.message }));
});