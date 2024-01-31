const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Agregar un campo para el rol
  apellido: String,
  caPrincipal: String,
  caSecundaria: String,
  cedula: String,
  correo: String,
  direccion: String,
  especialidad: String,
  nacimiento: Date,
  nombre: String,
  pais: String,
  sexo: String,
  telefono: String
}, { collection: 'Personas' });

const User = mongoose.model('user', userSchema);

module.exports = User;
