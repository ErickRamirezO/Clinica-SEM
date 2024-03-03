import React, { useState, useEffect } from "react";
import "./Lista_paciente.css";
import Layout from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import {
  validarNombresCompletos,
  validarApellidosCompletos,
  validarEstatura,
  validarCedulaEcuatoriana,
  validarNumeroTelefonico,
  validarPeso,
  validarTemperatura,
  validarCorreo
} from "../../validate";
import ModalRegistro from "./ModalRegistro";
import ModalUpdate from "./ModalUpdate";
import Modal_HistorialPaciente from "../Historial/Modal_HistorialPaciente";
import Historial from "../Historial/Modal_HistorialPaciente";


export default function Lista_paciente() {
  const { id } = useParams();
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
    correo: "",
    peso: 0,
    temperatura: 0,
    img: ""
  });

  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const [errorNombres, setErrorNombres] = useState("");
  const [errorApellidos, setErrorApellidos] = useState("");
  const [errorEstatura, setErrorEstatura] = useState("");
  const [errorCedula, setErrorCedula] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorPeso, setErrorPeso] = useState("");
  const [errorTemperatura, setErrorTemperatura] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showModalHistorial, setShowModalHistorial] = useState(false);


  const handleModalOpenHistorial = (paciente) => {
    setSelectedPaciente(paciente);
    setShowModalHistorial(true);
  };


  const handleModalCloseHistorial = () => {
    setShowModalHistorial(false);
  };

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

  // Calcular índices del primer y último elemento de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPacientes = filteredPacientes
    .slice(indexOfFirstItem, indexOfLastItem)
    .sort((a, b) => a._id - b._id); // Ordenar por ID de manera descendente


  const resetErrors = () => {
    setErrorNombres("");
    setErrorApellidos("");
    setErrorEstatura("");
    setErrorCedula("");
    setErrorTelefono("");
    setErrorPeso("");
    setErrorTemperatura("");
    setErrorImg("");
    setErrorCorreo("");
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorTemperatura(!validarTemperatura(value));
  };


  const handleGuardarUpdate = async () => {
    try {
      // Validar todos los campos
      const validNombres = validarNombresCompletos(formData.nombres);
      const validApellidos = validarApellidosCompletos(formData.apellidos);
      const validEstatura = validarEstatura(formData.estatura);
      const validCedula = validarCedulaEcuatoriana(formData.cedula);
      const validTelefono = validarNumeroTelefonico(formData.telefono);
      const validCorreo = validarCorreo(formData.correo);
      const validPeso = validarPeso(formData.peso);
      const validTemperatura = validarTemperatura(formData.temperatura);

      // Verificar si hay algún error
      if (
        !validNombres ||
        !validApellidos ||
        !validEstatura ||
        !validCedula ||
        !validTelefono ||
        !validCorreo ||
        !validPeso ||
        !validTemperatura
      ) {
        // Mostrar todos los mensajes de error al mismo tiempo
        setErrorNombres(validNombres ? "" : "Por favor ingresa nombres válidos.");
        setErrorApellidos(validApellidos ? "" : "Por favor ingresa apellidos válidos.");
        setErrorEstatura(validEstatura ? "" : "Por favor ingresa una estatura válida.");
        setErrorCedula(validCedula ? "" : "Por favor ingresa una cédula ecuatoriana válida.");
        setErrorTelefono(validTelefono ? "" : "Por favor ingresa un número telefónico válido.");
        setErrorCorreo(validCorreo ? "" : "Por favor ingresa un correo válido.");
        setErrorPeso(validPeso ? "" : "Por favor ingresa un peso válido.");
        setErrorTemperatura(validTemperatura ? "" : "Por favor ingresa una temperatura válida.");
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
      const validCorreo = validarCorreo(formData.correo);
      const validPeso = validarPeso(formData.peso);
      const validTemperatura = validarTemperatura(formData.temperatura);

      // Verificar si hay algún error
      if (
        !validNombres ||
        !validApellidos ||
        !validEstatura ||
        !validCedula ||
        !validTelefono ||
        !validCorreo ||
        !validPeso ||
        !validTemperatura

      ) {
        // Mostrar todos los mensajes de error al mismo tiempo
        setErrorNombres(validNombres ? "" : "Por favor ingresa nombres válidos.");
        setErrorApellidos(validApellidos ? "" : "Por favor ingresa apellidos válidos.");
        setErrorEstatura(validEstatura ? "" : "Por favor ingresa una estatura válida.");
        setErrorCedula(validCedula ? "" : "Por favor ingresa una cédula ecuatoriana válida.");
        setErrorTelefono(validTelefono ? "" : "Por favor ingresa un número telefónico válido.");
        setErrorCorreo(validCorreo ? "" : "Por favor ingresa un correo válido.");
        setErrorPeso(validPeso ? "" : "Por favor ingresa un peso válido.");
        setErrorTemperatura(validTemperatura ? "" : "Por favor ingresa una temperatura válida.");

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
      correo: "",
      peso: 0,
      temperatura: 0,
      img: ""
    });
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
                  <th>Fecha de creación</th>
                  <th>Diagnóstico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Mostrar pacientes filtrados */}
                {currentPacientes.map((paciente) => (
                  <tr key={paciente._id}>
                    <td>{`${paciente.nombres} ${paciente.apellidos}`}</td>
                    <td>{`${paciente.fechaCreacion}`}</td>
                    <td><p>Paciente resgistrado</p></td>
                    <td>
                      <button id="btn1" onClick={() => handleModalOpenHistorial(paciente)}>Ver Historial</button>

                      <button id="btnActualizarHistorial" onClick={() => handleUpdateModalOpen(paciente)}>
                        Actualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Paginación */}
            {filteredPacientes.length > itemsPerPage && (
              <div className="pagination">
                <button
                  className="btnAtras"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className="btnSiguiente"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(filteredPacientes.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Modal registrar paciente */}
        <ModalRegistro
          showModal={showModal}
          handleModalClose={handleModalClose}
          formData={formData}
          handleInputChange={handleInputChange}
          errorNombres={errorNombres}
          errorApellidos={errorApellidos}
          errorEstatura={errorEstatura}
          errorCedula={errorCedula}
          errorTelefono={errorTelefono}
          errorCorreo={errorCorreo}
          errorPeso={errorPeso}
          errorTemperatura={errorTemperatura}
          validarNombresCompletos={validarNombresCompletos}
          validarApellidosCompletos={validarApellidosCompletos}
          validarEstatura={validarEstatura}
          validarCedulaEcuatoriana={validarCedulaEcuatoriana}
          validarNumeroTelefonico={validarNumeroTelefonico}
          validarCorreo={validarCorreo}
          validarPeso={validarPeso}
          validarTemperatura={validarTemperatura}
          handleGuardar={handleGuardar}
          mensajeError={mensajeError}
          setFormData={setFormData}
        />

        {/* Modal actualizar paciente */}
        <ModalUpdate
          showUpdateModal={showUpdateModal}
          handleUpdateModalClose={handleUpdateModalClose}
          formData={formData}
          handleInputChange={handleInputChange}
          errorEstatura={errorEstatura}
          errorTelefono={errorTelefono}
          errorCorreo={errorCorreo}
          errorPeso={errorPeso}
          errorTemperatura={errorTemperatura}
          validarEstatura={validarEstatura}
          validarNumeroTelefonico={validarNumeroTelefonico}
          validarCorreo={validarCorreo}
          validarPeso={validarPeso}
          validarTemperatura={validarTemperatura}
          handleGuardarUpdate={handleGuardarUpdate}
          setFormData={setFormData}
        />

        {/* Modal registrar paciente */}
        <Modal_HistorialPaciente
          showModalHistorial={showModalHistorial}
          handleModalCloseHistorial={handleModalCloseHistorial}
          paciente={selectedPaciente}
        />

      </div>
    </Layout>
  );
}
