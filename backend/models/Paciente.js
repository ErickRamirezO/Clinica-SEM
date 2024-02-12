const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
    fechaCreacion: String,
    nombres: String,
    apellidos: String,
    fechaNacimiento: Date,
    estatura: Number,
    cedula: String,
    telefono: Number,
    peso: Number,
}, { collection: 'Pacientes' }); 

const Paciente = mongoose.model('Pacientes', pacienteSchema);

module.exports = Paciente;
