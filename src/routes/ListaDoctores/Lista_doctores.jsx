import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lista_doctores.css";
import Layout from "../../components/Navbar/Navbar";
import ModalDoctor from "./ModalDoctor";

export default function Lista_doctores() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModalDoctor, setShowModalDoctor] = useState(false);

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

  return (
    <Layout>
      <div className="listaP">
        <div className="ContainerSide">
          <div className="Contenido">
            <h2 style={{ textAlign: "center" }}>Lista de doctores</h2>
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
                {usuarios
                  .filter((user) => user.role === "Doctor")
                  .map((doctor) => (
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
