const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Paciente = require('../models/Paciente');


const router = express.Router();

// Registro de usuario
// En tu archivo authRoutes.js

// Ruta para obtener los datos del usuario actual
router.get('/profile', async (req, res) => {
  try {
    // Aquí obtienes el usuario actual autenticado (puedes usar información del token de autenticación)
    const currentUser = req.user; // Por ejemplo, si estás usando Passport.js, puedes acceder al usuario autenticado a través de req.user
    
    // Si el usuario no está autenticado, responde con un error
    if (!currentUser) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Si el usuario está autenticado, responde con los datos del usuario
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const {
      username,
      password,
      apellido,
      caPrincipal,
      caSecundaria,
      cedula,
      correo,
      direccion,
      especialidad,
      nacimiento,
      nombre,
      pais,
      sexo,
      telefono
    } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      apellido,
      caPrincipal,
      caSecundaria,
      cedula,
      correo,
      direccion,
      especialidad,
      nacimiento,
      nombre,
      pais,
      sexo,
      telefono
    });

    await newUser.save();

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

  //--------------------------------------------------------------------------------------------------PACIENTES
  // Ruta para registrar un nuevo paciente
router.post('/registro-paciente', async (req, res) => {
  try {
    const {
      fechaCreacion,
      nombres,
      apellidos,
      fechaNacimiento,
      estatura,
      cedula,
      telefono,
      peso,
      temperatura
    } = req.body;

    const nuevoPaciente = new Paciente({
      fechaCreacion,
      nombres,
      apellidos,
      fechaNacimiento,
      estatura,
      cedula,
      telefono,
      peso,
      temperatura
    });

    await nuevoPaciente.save();

    res.status(201).json({ message: 'Paciente registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener la lista de pacientes
router.get('/lista-pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.find();

    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener la lista de pacientes completa
router.get('/pacientes/:id', async (req, res) => {
  try {
    const pacientes = await Paciente.find();

    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un paciente por su ID
router.get('/paciente-historial/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Ruta para actualizar un paciente
router.put('/actualizar-paciente/:id', async (req, res) => {
  try {
    const pacienteId = req.params.id;
    const updatedPaciente = req.body; 

    // Realiza la actualización en la base de datos
    const result = await Paciente.findByIdAndUpdate(pacienteId, updatedPaciente, { new: true });

    res.json(result);
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).json({ error: 'Error al actualizar paciente' });
  }
});


//-------------------------------------------------------------------------------------------------------------------


module.exports = router;