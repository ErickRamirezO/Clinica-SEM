import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Registro.css";

export default function miPerfil() {
  return (
    <div className="contenedorDatos">
      <div className="contenedorDatosIzq">
        <h2 className="TitulosR"> &nbsp; &nbsp; Iformación General</h2>
        <table className="datosRegistrar">
          <tr>
            <td classname="Nuevo">
              {" "}
              <label for="apellido">Apellido:</label>
            </td>
            <td>
              <label for="nombre">Nombre:</label>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input type="text" id="apellido" name="apellido" />
            </td>
            <td>
              <input type="text" id="nombre" name="nombre" />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label for="fechaNac">Feha de Nacimiento:</label>
            </td>
            <td>
              <label for="sexo">Sexo:</label>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input type="text" id="fechaNac" name="fechaNac" />
            </td>
            <td>
              <input type="text" id="sexo" name="sexo" />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label for="email">Email:</label>
            </td>
            <td>
              <label for="movil">Teléfono movil:</label>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input type="text" id="email" name="email" />
            </td>
            <td>
              <input type="text" id="movil" name="movil" />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label for="cedula">Cedula:</label>
            </td>
            <td>
              <label for="usuario">Tipo de Usuario:</label>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input type="text" id="cedula" name="cedula" />
            </td>
            <td>
              <input type="text" id="usuario" name="usuario" />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label for="especialidad">Especialidad:</label>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input type="text" id="especialidad" name="especialidad" />
            </td>
          </tr>
        </table>
        <h2 className="TitulosR"> &nbsp; &nbsp; Iformación Demografica</h2>
        <table className="datosRegistrar">
          <tr>
            <td classname="Nuevo">
              {" "}
              <label for="direccion">Dirección:</label>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input type="text" id="direccion" name="direccion" />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label for="pais">País:</label>
            </td>
            <td>
              <label for="ciudad">Ciudad:</label>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input type="text" id="pais" name="pais" />
            </td>
            <td>
              <input type="text" id="ciudad" name="ciudad" />
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <label for="CalleP">Calle principal:</label>
            </td>
            <td>
              <label for="CalleS">Calle Secundaria:</label>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <input type="text" id="CalleP" name="CalleP" />
            </td>
            <td>
              <input type="text" id="CalleS" name="CalleS" />
            </td>
          </tr>
        </table>
      </div>
      <div className="contenedorDatosDer">
        <img src="/usuari.png" alt="Usuario"></img>
      </div>
    </div>
  );
}
