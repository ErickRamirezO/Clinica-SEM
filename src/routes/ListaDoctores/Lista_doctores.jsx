import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lista_doctores.css";
import Layout from "../../components/Navbar/Navbar";
import ModalDoctor from "./ModalDoctor";

export default function Lista_doctores() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModalDoctor, setShowModalDoctor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const handleModalOpenDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModalDoctor(true);
  };

  const handleModalCloseDoctor = () => {
    setSelectedDoctor(null);
    setShowModalDoctor(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUser/")
      .then((result) => {
        console.log("Datos obtenidos:", result.data);
        setUsuarios(result.data); // Almacenar los usuarios en el estado
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Filtrar la lista de doctores según el término de búsqueda
  const filteredDoctores = usuarios.filter((user) =>
    user.role === "Doctor" &&
    (user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.pais.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.especialidad.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calcular índices del primer y último elemento de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctores = filteredDoctores
    .slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="listaP">
        <div className="ContainerSide">
          <div className="Contenido">
            <h2 style={{ textAlign: "center" }}>Lista de doctores</h2>
            <div className="buscador d-flex justify-content-between align-items-center">
              <input
                className="barraBusqueda"
                type="text"
                placeholder="      Buscar doctores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table className="tabla_doctores">
              <thead>
                <tr>
                  <th>Nombres y Apellidos</th>
                  <th>Pais</th>
                  <th>Especialidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentDoctores.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{`${doctor.nombre} ${doctor.apellido}`}</td>
                    <td>{doctor.pais}</td>
                    <td>{doctor.especialidad}</td>
                    <td>
                      <button id="btn1" onClick={() => handleModalOpenDoctor(doctor)}>Ver Doctor</button>
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

        {/* Modal doctores */}
        {selectedDoctor && (
          <ModalDoctor
            showModalDoctor={showModalDoctor}
            handleModalCloseDoctor={handleModalCloseDoctor}
            doctor={selectedDoctor}
          />
        )}
      </div>
    </Layout>
  );
}
