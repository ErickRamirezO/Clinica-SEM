import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faComments,
  faUserCircle,
  faSignOutAlt,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import "./Lista_paciente.css";
import Layout from "../../components/Navbar/Navbar";
export default function Lista_paciente() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Layout>
    <div className="listaP">
      

      {/* Contenedor de la barra lateral y el contenido */}
      <div className="ContainerSide">

        {/* Contenido */}
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
                <a href="/historial-paciente"><button id="btn1" >Ver Historias Clínicas</button></a>
                  <button id="btn2" onClick={handleModalOpen}>
                    Crear Historia Clínica
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Crear Historia Clínica */}
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
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Apellidos Completos:
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Fecha de Nacimiento:
              </label>
              <div className="col-sm-9">
                <input type="date" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Estatura (cm):</label>
              <div className="col-sm-9">
                <input type="number" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Cédula:</label>
              <div className="col-sm-9">
                <input type="number" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Número Telefónico:
              </label>
              <div className="col-sm-9">
                <input type="number" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Peso (kg):</label>
              <div className="col-sm-9">
                <input type="number" className="form-control" />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </Layout>
  );
}
