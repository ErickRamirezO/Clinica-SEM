const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');
const Paciente = require('../models/Paciente');
const Historial = require('../models/Historial');
const Doctor = require('../models/Doctor');


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

//registro con chat-engine
router.post("/registro-chat-engine", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  // Store a user-copy on Chat Engine!
  // Docs at rest.chatengine.io
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      { headers: { "Private-Key": "fdcb07a1-6a66-4b28-9e48-eaac089255ff" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
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
    res.status(200).json({ message: 'Inicio de sesión exitoso', userId: user._id });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


//inicio sesion chat-engine
router.post('/login/chat-engine', async (req, res) => {
  const { username, password } = req.body;

  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": "d003e5d0-9566-45cd-97a2-2e23bab076bd",
        "User-Name": username,
        "User-Secret": password,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    console.error('Error al comunicarse con Chat Engine:', e);
    return res.status(e.response.status).json(e.response.data);
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
      correo,
      peso,
      temperatura,
      img
    } = req.body;

    const nuevoPaciente = new Paciente({
      fechaCreacion,
      nombres,
      apellidos,
      fechaNacimiento,
      estatura,
      cedula,
      telefono,
      correo,
      peso,
      temperatura,
      img
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


//------------------------------------------------------------------------------------------------------------------- HISTORIAL
//guardar historial
router.post('/guardar-historial', async (req, res) => {
  try {
    const {
      fechaCreacion,
      paciente,
      cedula,
      doctor,
      especialidad,
      diagnostico,
      receta,
      alergias,
    } = req.body;

    const nuevoHistorial = new Historial({
      fechaCreacion,
      paciente,
      cedula,
      doctor,
      especialidad,
      diagnostico,
      receta,
      alergias,
    });

    await nuevoHistorial.save();

    res.status(201).json({ message: 'Paciente registrado exitosamente' });
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


// Ruta para obtener historiales por cedula de paciente
router.get('/obtener-historiales/:cedula', async (req, res) => {
  try {
    const { cedula } = req.params;
    const historiales = await Historial.find({ cedula });

    if (historiales.length === 0) {
      return res.status(404).json({ error: 'No hay historiales médicos para este paciente' });
    }

    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener la lista de doctores por especialidad
router.get('/doctores-especialidad/:especialidad', async (req, res) => {
  try {
    const { especialidad } = req.params;
    const doctores = await User.find({ especialidad });

    res.status(200).json(doctores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener las especialidades únicas de los doctores
router.get('/especialidades-doctores', async (req, res) => {
  try {
    // Busca todos los doctores
    const doctores = await User.find({ role: 'Doctor' });
    // Extrae las especialidades de los doctores
    const especialidades = doctores.map(doctor => doctor.especialidad);
    // Filtra las especialidades para evitar duplicados
    const especialidadesUnicas = [...new Set(especialidades)];

    res.status(200).json(especialidadesUnicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




//--------------------------------------------------------------------------------------------------DOCTORES
// Ruta para registrar un nuevo doctor
router.post('/registro-doctores', async (req, res) => {
  try {
    const {
      fechaCreacion,
      nombres,
      apellidos,
      cedula,
      fechaNacimiento,
      telefono,
      correo,
      especialidad,
    } = req.body;

    const nuevoDoctor = new Doctor({
      fechaCreacion,
      nombres,
      apellidos,
      cedula,
      fechaNacimiento,
      telefono,
      correo,
      especialidad,
    });

    await nuevoDoctor.save();

    res.status(201).json({ message: 'Doctor registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener la lista de doctores
router.get('/lista-doctores', async (req, res) => {
  try {
    const doctores = await Doctor.find();

    res.status(200).json(doctores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Ruta para actualizar un doctor
router.put('/actualizar-doctores/:id', async (req, res) => {
  try {
    const doctorId = req.params.id;
    const updatedDoctor = req.body;

    // Realiza la actualización en la base de datos
    const result = await Doctor.findByIdAndUpdate(doctorId, updatedDoctor, { new: true });

    res.json(result);
  } catch (error) {
    console.error('Error al actualizar Doctor:', error);
    res.status(500).json({ error: 'Error al actualizar Doctor' });
  }
});

module.exports = router;