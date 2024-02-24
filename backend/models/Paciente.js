const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
    fechaCreacion: String,
    nombres: String,
    apellidos: String,
    fechaNacimiento: Date,
    estatura: Number,
    cedula: String,
    correo: String,
    telefono: String,
    peso: Number,
    temperatura: Number,
}, { collection: 'Pacientes' }); 

const Paciente = mongoose.model('Pacientes', pacienteSchema);

module.exports = Paciente;
