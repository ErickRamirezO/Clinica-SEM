const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Busca el usuario en la base de datos
      const user = await User.findOne({ username }).select('+password').exec();
  
      if (!user) {
        // Si el usuario no existe, responde con un error
        console.error('Inicio de sesión fallido: Usuario no encontrado');
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      // Simple comparison of passwords (not recommended for production)
      if (user.password !== password) {
        // Si la contraseña no coincide, responde con un error
        console.error('Inicio de sesión fallido: Credenciales inválidas');
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      // Si las credenciales son válidas, puedes generar un token JWT aquí si lo necesitas
      // ...
  
      // Responde con un mensaje de éxito
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

module.exports = router;
