import React from "react";
import "./ListaDoctores.css";
import Layout  from "../../components/Navbar/Navbar";

export default function () {
  return (
    <Layout>
      <h1 align="center">Lista de doctores</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dr. Juan Pérez</td>
              <td>Cardiología</td>
              <td>
                <button>Más información</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
