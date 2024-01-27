import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Registro.css";

export default function Registro() {
  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [movil, setMovil] = useState("");
  const [cedula, setCedula] = useState("");
  const [usuario, setUsuario] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [calleP, setCalleP] = useState("");
  const [calleS, setCalleS] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("envio")
  };

  return (
    <div className="contenedorDatos">
      <div className="contenedorDatosIzq">
        <h2 className="TitulosR"> &nbsp; &nbsp;  Información General</h2>
        <form onSubmit={handleSubmit}>
          <table className="datosRegistrar">
            <tr>
              <td>
                <label htmlFor="apellido">Apellido:</label>
                <input type="text" id="apellido" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
              </td>
              <td>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="fechaNac">Fecha de Nacimiento:</label>
                <input type="text" id="fechaNac" name="fechaNac" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} />
              </td>
              <td>
                <label htmlFor="sexo">Sexo:</label>
                <input type="text" id="sexo" name="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </td>
              <td>
                <label htmlFor="movil">Teléfono móvil:</label>
                <input type="text" id="movil" name="movil" value={movil} onChange={(e) => setMovil(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="cedula">Cédula:</label>
                <input type="text" id="cedula" name="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
              </td>
              <td>
                <label htmlFor="usuario">Tipo de Usuario:</label>
                <input type="text" id="usuario" name="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="especialidad">Especialidad:</label>
                <input type="text" id="especialidad" name="especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} />
              </td>
            </tr>
          </table>
          <h2 className="TitulosR"> &nbsp; &nbsp; Información Demográfica</h2>
          <table className="datosRegistrar">
            <tr>
              <td>
                <label htmlFor="direccion">Dirección:</label>
                <input type="text" id="direccion" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="pais">País:</label>
                <input type="text" id="pais" name="pais" value={pais} onChange={(e) => setPais(e.target.value)} />
              </td>
              <td>
                <label htmlFor="ciudad">Ciudad:</label>
                <input type="text" id="ciudad" name="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="CalleP">Calle principal:</label>
                <input type="text" id="CalleP" name="CalleP" value={calleP} onChange={(e) => setCalleP(e.target.value)} />
              </td>
              <td>
                <label htmlFor="CalleS">Calle Secundaria:</label>
                <input type="text" id="CalleS" name="CalleS" value={calleS} onChange={(e) => setCalleS(e.target.value)} />
              </td>
            </tr>
          </table>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div className="contenedorDatosDer">
        <img src="/usuari.png" alt="Usuario" />
      </div>
    </div>
  );
}