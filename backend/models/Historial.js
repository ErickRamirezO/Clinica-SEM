const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historialSchema = new Schema({
    fechaCreacion: String,
    paciente: String,
    cedula: String,
    doctor: String,
    especialidad: String,
    diagnostico: String,
    receta: String,
    alergias: String,

}, { collection: 'Historias' }); 

const Historial = mongoose.model('Historias', historialSchema);

module.exports = Historial;
