import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Lista_paciente.css";
import Layout from "../../components/Navbar/Navbar";

export default function Lista_paciente() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombres: "",
    fechaCreacion: "",
    apellidos: "",
    fechaNacimiento: "",
    estatura: 0,
    cedula: 0,
    telefono: 0,
    peso: 0,
  });

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/registro-paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Paciente guardado exitosamente");
        // Puedes realizar acciones adicionales después de guardar el paciente, como recargar la lista de pacientes, etc.
      } else {
        console.error("Error al guardar el paciente");
      }
    } catch (error) {
      console.error("Error de red", error);
    }

    setShowModal(false);
  };

  return (
    <Layout>
      <div className="listaP">
        <div className="ContainerSide">
          <div className="Contenido">
            <h2 style={{ textAlign: "center" }}>Lista de pacientes</h2>
            <table className="tabla_pacientes">
              <thead>
                <tr>
                  <th>Nombres y Apellidos</th>
                  <th>Fecha y última historial clínica</th>
                  <th>Diagnóstico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Juan Jose Flores</td>
                  <td>01/01/2023</td>
                  <td>Dolor de estomago</td>
                  <td>
                    <a href="/historial-paciente">
                      <button id="btn1">Ver Historias Clínicas</button>
                    </a>
                    <button id="btn2" onClick={handleModalOpen}>
                      Crear Historia Clínica
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Modal show={showModal} onHide={handleModalClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Crear Historia Clínica</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <form>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Nombres Completos:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Apellidos Completos:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Fecha de Nacimiento:
                </label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Estatura (cm):</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    name="estatura"
                    value={formData.estatura}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Cédula:</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Número Telefónico:
                </label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Peso (kg):</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    name="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                  />
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
      </div>
    </Layout>
  );
}