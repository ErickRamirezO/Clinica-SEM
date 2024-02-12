import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Lista_paciente.css";
import Layout from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import {
  validarNombresCompletos,
  validarApellidosCompletos,
  validarEstatura,
  validarCedulaEcuatoriana,
  validarNumeroTelefonico,
  validarPeso,
} from "../../validate";

export default function Lista_paciente() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    fechaCreacion: new Date().toLocaleDateString(),
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    estatura: 0,
    cedula: "",
    telefono: "",
    peso: 0,
  });

  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const [errorNombres, setErrorNombres] = useState("");
  const [errorApellidos, setErrorApellidos] = useState("");
  const [errorEstatura, setErrorEstatura] = useState("");
  const [errorCedula, setErrorCedula] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorPeso, setErrorPeso] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Manejador de evento para actualizar el término de búsqueda
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar la lista de pacientes según el término de búsqueda
  const filteredPacientes = pacientes.filter((paciente) => {
    return (
      paciente.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const resetErrors = () => {
    setErrorNombres("");
    setErrorApellidos("");
    setErrorEstatura("");
    setErrorCedula("");
    setErrorTelefono("");
    setErrorPeso("");
    setMensajeError("");
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetFormData();
    setMensajeError("");
    resetErrors();
  };

  const handleUpdateModalOpen = (paciente) => {
    setShowUpdateModal(true);
    setSelectedPaciente(paciente);
    setFormData({
      ...paciente,
      fechaNacimiento: new Date(paciente.fechaNacimiento).toISOString().split('T')[0],
    });
    setMensajeError("");
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setSelectedPaciente(null);
    resetFormData();
    setMensajeError("");
    resetErrors();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardarUpdate = async () => {
    try {
      // Validar todos los campos
      const validNombres = validarNombresCompletos(formData.nombres);
      const validApellidos = validarApellidosCompletos(formData.apellidos);
      const validEstatura = validarEstatura(formData.estatura);
      const validCedula = validarCedulaEcuatoriana(formData.cedula);
      const validTelefono = validarNumeroTelefonico(formData.telefono);
      const validPeso = validarPeso(formData.peso);

      // Verificar si hay algún error
      if (
        !validNombres ||
        !validApellidos ||
        !validEstatura ||
        !validCedula ||
        !validTelefono ||
        !validPeso
      ) {
        // Mostrar todos los mensajes de error al mismo tiempo
        setErrorNombres(validNombres ? "" : "Por favor ingresa nombres válidos.");
        setErrorApellidos(validApellidos ? "" : "Por favor ingresa apellidos válidos.");
        setErrorEstatura(validEstatura ? "" : "Por favor ingresa una estatura válida.");
        setErrorCedula(validCedula ? "" : "Por favor ingresa una cédula ecuatoriana válida.");
        setErrorTelefono(validTelefono ? "" : "Por favor ingresa un número telefónico válido.");
        setErrorPeso(validPeso ? "" : "Por favor ingresa un peso válido.");
        return;
      }

      const endpoint = selectedPaciente
        ? `http://localhost:3001/auth/actualizar-paciente/${selectedPaciente._id}`
        : "http://localhost:3001/auth/registro-paciente";

      const method = selectedPaciente ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        console.log(
          selectedPaciente
            ? "Paciente actualizado exitosamente"
            : "Paciente guardado exitosamente"
        );
        fetchPacientes();
        resetFormData();
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

  const handleGuardar = async () => {
    try {
      // Validar todos los campos
      const validNombres = validarNombresCompletos(formData.nombres);
      const validApellidos = validarApellidosCompletos(formData.apellidos);
      const validEstatura = validarEstatura(formData.estatura);
      const validCedula = validarCedulaEcuatoriana(formData.cedula);
      const validTelefono = validarNumeroTelefonico(formData.telefono);
      const validPeso = validarPeso(formData.peso);

      // Verificar si hay algún error
      if (
        !validNombres ||
        !validApellidos ||
        !validEstatura ||
        !validCedula ||
        !validTelefono ||
        !validPeso
      ) {
        // Mostrar todos los mensajes de error al mismo tiempo
        setErrorNombres(validNombres ? "" : "Por favor ingresa nombres válidos.");
        setErrorApellidos(validApellidos ? "" : "Por favor ingresa apellidos válidos.");
        setErrorEstatura(validEstatura ? "" : "Por favor ingresa una estatura válida.");
        setErrorCedula(validCedula ? "" : "Por favor ingresa una cédula ecuatoriana válida.");
        setErrorTelefono(validTelefono ? "" : "Por favor ingresa un número telefónico válido.");
        setErrorPeso(validPeso ? "" : "Por favor ingresa un peso válido.");
        return;
      }

      // Verificar si el paciente ya está registrado
      const pacienteExistente = pacientes.find(paciente => paciente.cedula === formData.cedula);
      if (pacienteExistente) {
        setMensajeError("Este paciente ya se encuentra registrado");
        return;
      }

      const endpoint = selectedPaciente
        ? `http://localhost:3001/auth/actualizar-paciente/${selectedPaciente._id}`
        : "http://localhost:3001/auth/registro-paciente";

      const method = selectedPaciente ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          fechaNacimiento: new Date(formData.fechaNacimiento).toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        console.log(
          selectedPaciente
            ? "Paciente actualizado exitosamente"
            : "Paciente guardado exitosamente"
        );
        fetchPacientes();
        resetFormData();
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

  const resetFormData = () => {
    setFormData({
      fechaCreacion: new Date().toLocaleDateString(),
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      estatura: 0,
      cedula: "",
      telefono: "",
      peso: 0,
    });
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
            <div className="buscador d-flex justify-content-between align-items-center">
              <button id="btnAddPaciente" onClick={handleModalOpen}>
                Añadir paciente
              </button>
              {/* Barra de búsqueda */}
              <input
                className="barraBusqueda"
                type="text"
                placeholder="     Buscar pacientes..."
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </div>

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
                {/* Mostrar pacientes filtrados */}
                {filteredPacientes.map((paciente) => (
                  <tr key={paciente._id}>
                    <td>{`${paciente.nombres} ${paciente.apellidos}`}</td>
                    <td>{new Date(paciente.fechaCreacion).toLocaleDateString()}</td>
                    <td><p>Paciente resgistrado</p></td>
                    <td>
                      <Link to={`/historial-paciente/${paciente._id}`}>
                        <button id="btn1">Ver Paciente</button>
                      </Link>
                      <button id="btnActualizarHistorial" onClick={() => handleUpdateModalOpen(paciente)}>
                        Actualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal registrar paciente */}
        <Modal show={showModal} onHide={handleModalClose} size="lg">
          <Modal.Header>
            <Modal.Title className="text-center mx-auto">Ingreso de datos</Modal.Title>
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
                    placeholder="nombre1 nombre2"
                  />
                  {errorNombres && !validarNombresCompletos(formData.nombres) && (
                    <p className="pError">Formato de nombres incorrecto</p>
                  )}
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
                    placeholder="apellido1 apellido2"
                  />
                  {errorApellidos && !validarApellidosCompletos(formData.apellidos) && (
                    <p className="pError">Formato de apellidos incorrecto</p>
                  )}
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
                <label className="col-sm-3 col-form-label">Estatura (m):</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    name="estatura"
                    value={formData.estatura}
                    onChange={handleInputChange}
                    placeholder="0.3 - 3.00"
                  />
                  {errorEstatura && !validarEstatura(formData.estatura) && (
                    <p className="pError">Estatura no válida</p>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Cédula:</label>
                <div className="col-sm-9">
                  <input
                    type="text" // Cambiar a tipo texto
                    className="form-control"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    placeholder="0400911899"
                  />
                  {errorCedula && !validarCedulaEcuatoriana(formData.cedula) && (
                    <p className="pError">Cédula incorrecta</p>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Número Telefónico:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="0981515127"
                  />
                  {errorTelefono && !validarNumeroTelefonico(formData.telefono) && (
                    <p className="pError">Número telefónico incorrecto</p>
                  )}
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
                    placeholder="4 - 300"
                  />
                  {errorPeso && !validarPeso(formData.peso) && (
                    <p className="pError">Ingrese un peso válido</p>
                  )}
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
          <center>
            <p className="ErrorPacienteExistente">
              {mensajeError && (
                <p style={{ color: "red", marginTop: "10px" }}>{mensajeError}</p>
              )}
            </p>
          </center>
        </Modal>

        {/* Modal actualizar paciente */}
        <Modal show={showUpdateModal} onHide={handleUpdateModalClose} size="lg">
          <Modal.Header>
            <Modal.Title className="text-center mx-auto">Actualización de datos</Modal.Title>
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                  {errorEstatura && !validarEstatura(formData.estatura) && (
                    <p className="pError">Estatura no válida</p>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Cédula:</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="cedula"
                    value={formData.cedula}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Número Telefónico:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                  {errorTelefono && !validarNumeroTelefonico(formData.telefono) && (
                    <p className="pError">Número telefónico incorrecto</p>
                  )}
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
                  {errorPeso && !validarPeso(formData.peso) && (
                    <p className="pError">Ingrese un peso válido</p>
                  )}
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUpdateModalClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleGuardarUpdate}>
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
}
