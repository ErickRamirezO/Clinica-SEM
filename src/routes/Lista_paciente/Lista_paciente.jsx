import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Lista_paciente.css";
import Layout from "../../components/Navbar/Navbar";

export default function Lista_paciente() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    fechaCreacion: new Date().toLocaleDateString(),
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    estatura: 0,
    cedula: 0,
    telefono: 0,
    peso: 0,
  });

  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [mensajeError, setMensajeError] = useState("");

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      fechaCreacion: new Date().toLocaleDateString(),
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      estatura: 0,
      cedula: 0,
      telefono: 0,
      peso: 0,
    });
    setMensajeError("");
  };

  // Función para abrir el modal de actualización y llenar el formulario con los datos actuales del paciente
  const handleUpdateModalOpen = (paciente) => {
    setShowUpdateModal(true);
    setSelectedPaciente(paciente);
    setFormData({
      fechaCreacion: new Date().toLocaleDateString(),
      ...paciente, // Llena el formulario con los datos del paciente seleccionado
    });
    setMensajeError("");
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setSelectedPaciente(null);
    setFormData({
      fechaCreacion: new Date().toLocaleDateString(),
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      estatura: 0,
      cedula: 0,
      telefono: 0,
      peso: 0,
    });
    setMensajeError("");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = async () => {
    try {
      const endpoint = selectedPaciente
        ? `http://localhost:3001/auth/actualizar-paciente/${selectedPaciente._id}`
        : "http://localhost:3001/auth/registro-paciente";
  
      const method = selectedPaciente ? "PUT" : "POST";
  
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log(
          selectedPaciente
            ? "Paciente actualizado exitosamente"
            : "Paciente guardado exitosamente"
        );
        fetchPacientes();
        setMensajeError("");
        handleModalClose();
        handleUpdateModalClose();
      } else {
        console.error("Error al guardar o actualizar el paciente");
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };
  const fetchPacientes = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/lista-pacientes");

      if (response.ok) {
        const data = await response.json();
        setPacientes(data);
      } else {
        console.error("Error al obtener la lista de pacientes");
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  return (
    <Layout>
      <div className="listaP">
        <div className="ContainerSide">
          <div className="Contenido">
            <h2 style={{ textAlign: "center" }}>Lista de pacientes</h2>
            <button id="btnAddPaciente" onClick={handleModalOpen}>
              Añadir paciente
            </button>
            <table className="tabla_pacientes">
              <thead>
                <tr>
                  <th>Nombres y Apellidos</th>
                  <th>Fecha y última historial clínico</th>
                  <th>Diagnóstico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((paciente) => (
                  <tr key={paciente._id}>
                    <td>{`${paciente.nombres} ${paciente.apellidos}`}</td>
                    <td><p>{new Date().toLocaleDateString()}</p></td>
                    <td><p>Paciente resgistrado</p></td>
                    <td>
                    <a href="/historial-paciente">
                        <button id="btn1">Ver Historias Clínicas</button>
                      </a>
                      <button id="btnActualizarHistorial" onClick={() => handleUpdateModalOpen(paciente)}>
                        Actualizar Historia Clínica
                      </button>
                    </td>
                  </tr>
                ))}
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
              <p name="fechaCreacion">{new Date().toLocaleDateString()}</p>
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
          <center><p className="ErrorPacienteExistente">{mensajeError && (
            <p style={{ color: "red", marginTop: "10px" }}>{mensajeError}</p>
          )}</p></center>
        </Modal>


        <Modal show={showUpdateModal} onHide={handleUpdateModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Historia Clínica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Nombres Completos:</label>
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
              <label className="col-sm-3 col-form-label">Apellidos Completos:</label>
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
              <label className="col-sm-3 col-form-label">Fecha de Nacimiento:</label>
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
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </Layout>
  );

}
