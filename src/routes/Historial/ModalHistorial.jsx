import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalHistorial = ({
    showModal,
    handleModalClose,
    paciente,
}) => {
    const [formValues, setFormValues] = useState({
        fechaCreacion: new Date().toLocaleDateString(),
        paciente: `${paciente.nombres} ${paciente.apellidos}`,
        cedula: paciente.cedula,
        doctor: "",
        especialidad: "",
        diagnostico: "",
        receta: "",
        alergias: "",
    });

    const [doctores, setDoctores] = useState([]);

    const cargarDoctoresEspecialidad = async (especialidad) => {
        try {
            const response = await fetch(`http://localhost:3001/auth/doctores-especialidad/${especialidad}`);
            if (response.ok) {
                const data = await response.json();
                setDoctores(data);
            } else {
                console.error('Error al obtener los doctores');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const resetFormData = () => {
        setFormValues({
            fechaCreacion: new Date().toLocaleDateString(),
            paciente: `${paciente.nombres} ${paciente.apellidos}`,
            cedula: paciente.cedula,
            doctor: "",
            especialidad: "",
            diagnostico: "",
            receta: "",
            alergias: "",
        });
    };

    const handleGuardar = async () => {
        try {
            const response = await fetch('http://localhost:3001/auth/guardar-historial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            if (response.ok) {
                // Si la respuesta es exitosa, cierra el modal
                handleModalClose();
                resetFormData();
            } else {
                console.error('Error al guardar los datos');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <Modal show={showModal} onHide={handleModalClose} size="lg">
            <Modal.Title className="text-center mx-auto">Agregar nuevo Historial</Modal.Title>
            <Modal.Body>
                <div style={{ textAlign: "right", marginBottom: "20px" }}>
                    <p name="fechaCreacion">{new Date().toLocaleDateString()}</p>
                </div>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Paciente: </label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                name="paciente"
                                value={`${paciente.nombres} ${paciente.apellidos}`}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Cédula:</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                name="cedula"
                                value={paciente.cedula}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Especialidad</label>
                        <div className="col-sm-9">
                            <select
                                className="form-control"
                                name="especialidad"
                                value={formValues.especialidad}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    cargarDoctoresEspecialidad(e.target.value);
                                }}
                            >
                                <option value="">Selecciona una especialidad</option>
                                <option value="Cardiología">Cardiología</option>
                                <option value="Dermatología">Dermatología</option>
                                <option value="Gastroenterología">Gastroenterología</option>
                                <option value="Neurología">Neurología</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Doctor: </label>
                        <div className="col-sm-9">
                            <select
                                className="form-control"
                                name="doctor"
                                value={formValues.doctor}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecciona un doctor</option>
                                {doctores.map((doctor) => (
                                    <option key={doctor._id} value={doctor.nombre}>{doctor.nombres} {doctor.apellidos}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Diagnóstico: </label>
                        <div className="col-sm-9">
                            <textarea
                                className="form-control"
                                name="diagnostico"
                                rows="3"
                                value={formValues.diagnostico}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Receta: </label>
                        <div className="col-sm-9">
                            <textarea
                                className="form-control"
                                name="receta"
                                rows="3"
                                value={formValues.receta}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Alergias: </label>
                        <div className="col-sm-9">
                            <textarea
                                className="form-control"
                                name="alergias"
                                rows="3"
                                value={formValues.alergias}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleGuardar}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalHistorial;