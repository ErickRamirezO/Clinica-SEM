import React, { useState, useEffect } from "react";
import "./Lista_doctores.css";
import Layout from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import {
  validarNombresCompletos,
  validarApellidosCompletos,
  validarCedulaEcuatoriana,
  validarNumeroTelefonico,
  validarCorreo,
} from "../../validate";
import ModalRegistro from "./ModalRegistro";
import ModalUpdate from "./ModalUpdate";

export default function Lista_doctores() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    fechaCreacion: new Date().toLocaleDateString(),
    nombres: "",
    apellidos: "",
    cedula: "",
    fechaNacimiento: "",
    telefono: "",
    correo: "",
    especialidad: "",
  });


  const [doctores, setDoctores] = useState([]);
  const [selectedDoctor, setSelectedDoctores] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const [errorNombres, setErrorNombres] = useState("");
  const [errorApellidos, setErrorApellidos] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorCedula, setErrorCedula] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Manejador de evento para actualizar el término de búsqueda
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar la lista de doctores según el término de búsqueda
  const filteredDoctores = doctores.filter((doctores) => {
    return (
      doctores.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctores.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calcular índices del primer y último elemento de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctores = filteredDoctores
    .slice(indexOfFirstItem, indexOfLastItem)
    .sort((a, b) => a._id - b._id); // Ordenar por ID de manera descendente


  const resetErrors = () => {
    setErrorNombres("");
    setErrorApellidos("");
    setErrorCorreo("");
    setErrorCedula("");
    setErrorTelefono("");
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

  const handleUpdateModalOpen = (doctores) => {
    setShowUpdateModal(true);
    setSelectedDoctores(doctores);
    setFormData({
      ...doctores,
      fechaNacimiento: new Date(doctores.fechaNacimiento).toISOString().split('T')[0],
    });
    setMensajeError("");
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setSelectedDoctores(null);
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
      const validCorreo = validarCorreo(formData.correo);
      const validCedula = validarCedulaEcuatoriana(formData.cedula);
      const validTelefono = validarNumeroTelefonico(formData.telefono);

      // Verificar si hay algún error
      if (
        !validNombres ||
        !validApellidos ||
        !validCorreo ||
        !validCedula ||
        !validTelefono
      ) {
        // Mostrar todos los mensajes de error al mismo tiempo
        setErrorNombres(validNombres ? "" : "Por favor ingresa nombres válidos.");
        setErrorApellidos(validApellidos ? "" : "Por favor ingresa apellidos válidos.");
        setErrorCorreo(validCorreo ? "" : "Por favor ingresa un correo válido.");
        setErrorCedula(validCedula ? "" : "Por favor ingresa una cédula ecuatoriana válida.");
        setErrorTelefono(validTelefono ? "" : "Por favor ingresa un número telefónico válido.");
        return;
      }

      const endpoint = selectedDoctor
        ? `http://localhost:3001/auth/actualizar-doctores/${selectedDoctor._id}`
        : "http://localhost:3001/auth/registro-doctores";

      const method = selectedDoctor ? "PUT" : "POST";

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
          selectedDoctor
            ? "doctores actualizado exitosamente"
            : "doctores guardado exitosamente"
        );
        fetchDoctores();
        resetFormData();
        setMensajeError("");
        handleModalClose();
        handleUpdateModalClose();
      } else {
        console.error("Error al guardar o actualizar el doctor");
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
      const validCorreo = validarCorreo(formData.correo);
      const validCedula = validarCedulaEcuatoriana(formData.cedula);
      const validTelefono = validarNumeroTelefonico(formData.telefono);

      // Verificar si hay algún error
      if (
        !validNombres ||
        !validApellidos ||
        !validCorreo ||
        !validCedula ||
        !validTelefono

      ) {
        // Mostrar todos los mensajes de error al mismo tiempo
        setErrorNombres(validNombres ? "" : "Por favor ingresa nombres válidos.");
        setErrorApellidos(validApellidos ? "" : "Por favor ingresa apellidos válidos.");
        setErrorCorreo(validCorreo ? "" : "Por favor ingresa un correo válido.");
        setErrorCedula(validCedula ? "" : "Por favor ingresa una cédula ecuatoriana válida.");
        setErrorTelefono(validTelefono ? "" : "Por favor ingresa un número telefónico válido.");
        return;
      }

      // Verificar si el doctores ya está registrado
      const doctoresExistente = doctores.find(doctores => doctores.cedula === formData.cedula);
      if (doctoresExistente) {
        setMensajeError("Este doctores ya se encuentra registrado");
        return;
      }
      
      const endpoint = selectedDoctor
        ? `http://localhost:3001/auth/actualizar-doctores/${selectedDoctor._id}`
        : "http://localhost:3001/auth/registro-doctores";

      const method = selectedDoctor ? "PUT" : "POST";

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
          selectedDoctor
            ? "doctores actualizado exitosamente"
            : "doctores guardado exitosamente"
        );
        fetchDoctores();
        resetFormData();
        setMensajeError("");
        handleModalClose();
        handleUpdateModalClose();
      } else {
        console.error("Error al guardar o actualizar el doctor");
      }
    } catch (error) {
      console.error("Error de red", error);
    }
  };


  const fetchDoctores = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/lista-doctores");

      if (response.ok) {
        const data = await response.json();
        setDoctores(data);
      } else {
        console.error("Error al obtener la lista de doctores");
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
      cedula: "",
      fechaNacimiento: "",
      telefono: "",
      correo: "",
      especialidad: "",
    });
  };

  useEffect(() => {
    fetchDoctores();
  }, []);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <Layout>
      <div className="listaP">
        <div className="ContainerSide">
          <div className="Contenido">
            <h2 style={{ textAlign: "center" }}>Lista de doctores</h2>
            <div className="buscador d-flex justify-content-between align-items-center">
              
              {/* Barra de búsqueda */}
              <input
                className="barraBusqueda"
                type="text"
                placeholder="     Buscar doctores..."
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </div>

            <table className="tabla_doctores">
              <thead>
                <tr>
                  <th>Nombres y Apellidos</th>
                  <th>Fecha de creación</th>
                  <th>Especialidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Mostrar doctores filtrados */}
                {currentDoctores.map((doctores) => (
                  <tr key={doctores._id}>
                    <td>{`${doctores.nombres} ${doctores.apellidos}`}</td>
                    <td>{`${doctores.fechaCreacion}`}</td>
                    <td>{`${doctores.especialidad}`}</td>
                    <td>
                      <Link to={`/historial-doctores/${doctores._id}`}>
                        <button id="btn1">Ver doctores</button>
                      </Link>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Paginación */}
            {filteredDoctores.length > itemsPerPage && (
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
                    currentPage === Math.ceil(filteredDoctores.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Modal registrar doctores */}
        <ModalRegistro
          showModal={showModal}
          handleModalClose={handleModalClose}
          formData={formData}
          handleInputChange={handleInputChange}
          errorNombres={errorNombres}
          errorApellidos={errorApellidos}
          errorCedula={errorCedula}
          errorTelefono={errorTelefono}
          errorCorreo={errorCorreo}
          validarNombresCompletos={validarNombresCompletos}
          validarApellidosCompletos={validarApellidosCompletos}
          validarCorreo={validarCorreo}
          validarCedulaEcuatoriana={validarCedulaEcuatoriana}
          validarNumeroTelefonico={validarNumeroTelefonico}
          handleGuardar={handleGuardar}
          mensajeError={mensajeError}
        />

        {/* Modal actualizar doctores */}
        <ModalUpdate
          showUpdateModal={showUpdateModal}
          handleUpdateModalClose={handleUpdateModalClose}
          formData={formData}
          handleInputChange={handleInputChange}
          errorCorreo={errorCorreo}
          errorTelefono={errorTelefono}
          errorNombres={errorNombres}
          errorApellidos={errorApellidos}
          validarNumeroTelefonico={validarNumeroTelefonico}
          validarNombresCompletos={validarNombresCompletos}
          validarApellidosCompletos={validarApellidosCompletos}
          validarCorreo={validarCorreo}
          handleGuardarUpdate={handleGuardarUpdate}
        />
      </div>
    </Layout>
  );
}
