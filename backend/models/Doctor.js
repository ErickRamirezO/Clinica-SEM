const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    fechaCreacion: String,
    nombres: String,
    apellidos: String,
    cedula: String,
    fechaNacimiento: Date,
    telefono: String,
    correo: String,
    especialidad: String,

}, { collection: 'Doctores' }); 

const Doctor = mongoose.model('Doctores', doctorSchema);

module.exports = Doctor;
