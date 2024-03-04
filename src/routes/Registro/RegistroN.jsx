
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Registro.css";
import axios from 'axios';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Navbar/Navbar";
import { useParams } from "react-router";
import {
  validarNombresCompletos,
  validarApellidosCompletos,
  validarEstatura,
  validarTemperatura,
  validarCedulaEcuatoriana,
  validarNumeroTelefonico,
  validarPeso,
  validarCorreo
} from '../../validate';

export default function RegistroN() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [Ciudad, setCiudad] = useState("");
  const [apellido, setApellido] = useState("");
  const [caPrincipal, setCalleP] = useState("");
  const [caSecundaria, setCalleS] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [nacimiento, setFechaNac] = useState("");
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefono, setMovil] = useState("");
  const [img_perfil, setImg] = useState("");

  /*manejo de erores*/
  const [mensajeError, setMensajeError] = useState("");
  const [errorNombres, setErrorNombres] = useState("");
  const [errorApellidos, setErrorApellidos] = useState("");
  const [errorCedula, setErrorCedula] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");

  const resetErrors = () => {
    setErrorNombres("");
    setErrorApellidos("");
    setErrorCedula("");
    setErrorTelefono("");
    setErrorCorreo("");
    setMensajeError("");
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    switch (field) {
      case 'apellido':
        setApellido(value);
        setErrorApellidos(!validarApellidosCompletos(value));
        break;
      case 'nombre':
        setNombre(value);
        setErrorNombres(!validarNombresCompletos(value));
        break;
      case 'cedula':
        setCedula(value);
        setErrorCedula(!validarCedulaEcuatoriana(value));
        break;
      case 'email':
        setEmail(value);
        setErrorCorreo(!validarCorreo(value));
        break;
      case 'movil':
        setMovil(value);
        setErrorTelefono(!validarNumeroTelefonico(value));
        break;
      // Agrega casos para los demás campos que necesitas validar
      default:
        break;
    }
  };

  /*-----------------------------------------------------------*/


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos antes de enviar el formulario
    if (errorApellidos || errorNombres || errorCedula || errorCorreo || errorTelefono) {
      setMensajeError("Por favor corrija los errores antes de enviar el formulario.");
      return;
    }

    axios.post("http://localhost:3001/crearP", {
      password,
      username,
      role,
      Ciudad,
      apellido,
      caPrincipal,
      caSecundaria,
      cedula,
      correo,
      direccion,
      especialidad,
      nacimiento,
      nombre,
      pais,
      sexo,
      telefono,
      img_perfil
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };


  function imagenConv(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImg(reader.result);
    };
    reader.onerror = error => {
      conole.log(" Erro", error);
    }
  }



  return (
    <Layout>
      <div className="contenedorDatos">
        <div className="">

        </div>
        <div className="contenedorDatosIzq">
          <h2 className="TitulosR"> &nbsp; &nbsp;  Información General</h2>
          <form onSubmit={handleSubmit}>
            <table className="datosRegistrar">
              <tr>
                <td>
                  <label htmlFor="apellido">Apellido:</label>
                  <input type="text" id="apellido" name="apellido" value={apellido} onChange={(e) => handleChange(e, 'apellido')} />
                  {errorApellidos && !validarApellidosCompletos(apellido) && (
                    <p className="pError">Formato de apellido incorrecto</p>
                  )}
                </td>
                <td>
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => handleChange(e, 'nombre')} />
                  {errorNombres && !validarNombresCompletos(nombre) && (
                    <p className="pError">Formato de nombre incorrecto</p>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="fechaNac">Fecha de Nacimiento:</label>
                  <input type="date" id="fechaNac" name="fechaNac" value={nacimiento} onChange={(e) => setFechaNac(e.target.value)} />
                </td>
                <td>
                  <label htmlFor="sexo">Sexo:</label>
                  <input type="text" id="sexo" name="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email">Email:</label>
                  <input type="text" id="email" name="email" value={correo} onChange={(e) => handleChange(e, 'email')} />
                  {errorCorreo && !validarCorreo(correo) && (
                    <p className="pError">Formato de email incorrecto</p>
                  )}
                </td>
                <td>
                  <label htmlFor="movil">Teléfono móvil:</label>
                  <input type="text" id="movil" name="movil" value={telefono} onChange={(e) => handleChange(e, 'movil')} />
                  {errorTelefono && !validarNumeroTelefonico(telefono) && (
                    <p className="pError">Formato de teléfono móvil incorrecto</p>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cedula">Cédula:</label>
                  <input type="text" id="cedula" name="cedula" value={cedula} onChange={(e) => handleChange(e, 'cedula')} />
                  {errorCedula && !validarCedulaEcuatoriana(cedula) && (
                    <p className="pError">Formato de cédula incorrecto</p>
                  )}
                </td>
                <td>
                  <label htmlFor="role">Tipo de Usuario:</label>
                  <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Administrador">Administrador</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Paciente">Paciente</option>
                  </select>
                </td>

              </tr>
              <tr>
                <td>
                  <label htmlFor="especialidad">Especialidad:</label>
                  <input type="text" id="especialidad" name="especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} />
                </td>
                <td>
                  <label htmlFor="username">Usuario:</label>
                  <input type="text" id="usuario" name="usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="password">Contraseña:</label>
                  <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                  <input type="text" id="ciudad" name="ciudad" value={Ciudad} onChange={(e) => setCiudad(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="CalleP">Calle principal:</label>
                  <input type="text" id="CalleP" name="CalleP" value={caPrincipal} onChange={(e) => setCalleP(e.target.value)} />
                </td>
                <td>
                  <label htmlFor="CalleS">Calle Secundaria:</label>
                  <input type="text" id="CalleS" name="CalleS" value={caSecundaria} onChange={(e) => setCalleS(e.target.value)} />
                </td>
              </tr>
            </table>
            <button type="submit" className="btn btn-primary btnLogin">Registrar</button>


          </form>
        </div>
        <div className="contenedorDatosDer">
          <div className="img">
            {img_perfil && <img src={img_perfil} alt="Usuario" />}
          </div>
          <div className="carga">
            {/* Input para seleccionar la imagen */}
            <label htmlFor="fileUpload" className="icono-camara">
              <FontAwesomeIcon icon={faCamera} />
            </label>
            <input id="fileUpload" accept="image/*" type="file" style={{ display: 'none' }} onChange={imagenConv} />
          </div>
        </div>

      </div>
    </Layout>
  );
}