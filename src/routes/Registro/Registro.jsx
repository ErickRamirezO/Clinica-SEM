import React , { useState, useEffect }from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Registro.css";

export default function Registro() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role:"",
    Ciudad:"",
    apellido:"",
    caPrincipal:"",
    caSecundaria:"",
    cedula:"",
    correo:"",
    direccion:"",
    especialidad:"",
    nacimiento:"",
    nombre:"",
    pais:"",
    sexo:"",
    telefono:"",


    
    // Otros campos de datos
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        console.log("Usuario registrado exitosamente");
        // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
      } else {
        console.error("Error al registrar usuario");
        // Aquí podrías manejar errores de registro, como mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    
    <div className="contenedorDatos">
      <div className="">

      </div>
      <div className="contenedorDatosIzq">
        <h2 className="TitulosR"> &nbsp; &nbsp;  Información General</h2>
        <form onSubmit={handleSubmit}>
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
              <input type="text" id="apellido" name="apellido" value={userData.apellido}  onChange={handleChange} />
            </td>
            <td>
              {/* Aquí van tus inputs para los datos del usuario */}
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nombre de usuario"
            value={userData.nombre}
            onChange={handleChange}
          />
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
              <input type="text" id="fechaNac" name="fechaNac"  value={userData.nacimiento}   onChange={handleChange}/>
            </td>
            <td>
              <input type="text" id="sexo" name="sexo" value={userData.sexo}  onChange={handleChange} />
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
              <input type="text" id="email" name="email" value={userData.correo}     onChange={handleChange} />
            </td>
            <td>
              <input type="text" id="movil" name="movil" value={userData.telefono}   onChange={handleChange} />
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
              <input type="text" id="cedula" name="cedula" value={userData.cedula}   onChange={handleChange} />
            </td>
            <td>
              <input type="text" id="usuario" name="usuario" value={userData.username}   onChange={handleChange} />
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
        <h2 className="TitulosR"> &nbsp; &nbsp; Información Demografica</h2>
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
        <button type="submit">Registrar</button>
        </form>
      </div>
      <div className="contenedorDatosDer">
        <img src="/usuari.png" alt="Usuario"></img>
      </div>
      
    </div>

  );
}
