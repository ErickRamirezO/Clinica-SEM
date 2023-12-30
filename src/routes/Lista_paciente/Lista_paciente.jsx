import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faComments,
  faUserCircle,
  faSignOutAlt,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Lista_paciente.css"; // Agrega tu archivo CSS según sea necesario

export default function Lista_paciente() {
  return (
    <div className="listaP">
      {/* Barra superior */}
      <div className="TopBar">
        <div className="logo">
          <img src="/logo.png"></img>
        </div>
        <div className="SearchContainer">
          <input type="text" placeholder="Buscar paciente" />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>

      {/* Contenedor de la barra lateral y el contenido */}
      <div className="ContainerSide">
        {/* Barra lateral izquierda */}
        <div className="SideBar">
          <div className="SideBarItem" title="User">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
          <div className="SideBarItem" title="Chat">
            <FontAwesomeIcon icon={faComments} size="2x" />
          </div>
          <div className="SideBarItem" title="My Profile">
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </div>
          <div className="SideBarItem" title="Logout">
            <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
          </div>
        </div>

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
                <td>Rocky Kakaroto Estofado de Pollo</td>
                <td>01/01/2023</td>
                <td>Enfermito</td>
                <td>
                  <button id="btn1">Ver Historias Clínicas</button>
                  <button id="btn2">Crear Historia Clínica</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
