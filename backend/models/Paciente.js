const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
    nombres: String,
    apellidos: String,
    fechaNacimiento: Date,
    estatura: Number,
    cedula: Number,
    telefono: Number,
    peso: Number,
}, { collection: 'Pacientes' }); 

const Paciente = mongoose.model('Pacientes', pacienteSchema);

module.exports = Paciente;
