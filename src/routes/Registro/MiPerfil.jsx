import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa 'useParams' desde 'react-router-dom'
import axios from "axios";
import Layout from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./Registro.css";

export default function miPerfil() {
  const { id } = useParams();
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then(result => {
        const userData = result.data;
        setPassword(userData.password);
        setUsername(userData.username);
        setRole(userData.role);
        setCiudad(userData.Ciudad);
        setApellido(userData.apellido);
        setCalleP(userData.caPrincipal);
        setCalleS(userData.caSecundaria);
        setCedula(userData.cedula);
        setEmail(userData.correo);
        setDireccion(userData.direccion);
        setEspecialidad(userData.especialidad);
        setFechaNac(userData.nacimiento);
        setNombre(userData.nombre);
        setPais(userData.pais);
        setSexo(userData.sexo);
        setMovil(userData.telefono);
        setImg(userData.img_perfil);
      })
      .catch(error => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditImage = () => {
    setIsEditingImage(true);
  };
  

  const handleSave = () => {
    const updatedUserData = {
      password: password,
      username: username,
      role: role,
      Ciudad: Ciudad,
      apellido: apellido,
      caPrincipal: caPrincipal,
      caSecundaria: caSecundaria,
      cedula: cedula,
      correo: correo,
      direccion: direccion,
      especialidad: especialidad,
      nacimiento: nacimiento,
      nombre: nombre,
      pais: pais,
      sexo: sexo,
      telefono: telefono,
      img_perfil: img_perfil
    };

    axios.put(`http://localhost:3001/updateUser/${id}`, updatedUserData)
      .then(response => {
        console.log("Usuario actualizado:", response.data);
        setIsEditing(false); // Cambiar al modo de visualización después de guardar los cambios
        setIsEditingImage(false);
      })
      .catch(error => {
        console.error("Error al actualizar el usuario:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "apellido":
        setApellido(value);
        break;
      case "nombre":
        setNombre(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "username":
        setUsername(value);
        break;
        break;
      case "Ciudad":
        setCiudad(value);
        break;
      case "caPrincipal":
        setCalleP(value);
        break;
      case "caSecundaria":
        setCalleS(value);
        break;
      case "cedula":
        setCedula(value);
        break;
      case "correo":
        setEmail(value);
        break;
      case "direccion":
        setDireccion(value);
        break;
      case "especialidad":
        setEspecialidad(value);
        break;
      case "nacimiento":
        setFechaNac(value);
        break;
      case "pais":
        setPais(value);
        break;
      case "sexo":
        setSexo(value);
        break;
      case "telefono":
        setMovil(value);
        break;
      case "img_perfil":
        setImg(value);
        break;
      default:
        break;
    }
  };

  const imagenConv = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImg(reader.result);
    };
    reader.onerror = error => {
      console.log(" Error", error);
    }
  };

  return (
    <Layout>
      <div className="contenedorDatos">
        <div className="contenedorDatosIzq">
          <h2 className="TitulosR"> &nbsp; &nbsp; Información General</h2>
          <table className="datosRegistrar">
            <tbody>
              <tr>
                <td className="Nuevo">
                  <label htmlFor="apellido">Apellido:</label>
                </td>
                <td>
                  <label htmlFor="nombre">Nombre:</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" id="apellido" name="apellido" value={apellido} onChange={handleChange} readOnly={!isEditing} />
                </td>
                <td>
                  <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleChange} readOnly={!isEditing} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="fechaNac">Fecha de Nacimiento:</label>
                </td>
                <td>
                  <label htmlFor="sexo">Sexo:</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" id="fechaNac" name="fechaNac" value={nacimiento} onChange={handleChange} readOnly={!isEditing} />
                </td>
                <td>
                  <input type="text" id="sexo" name="sexo" value={sexo} onChange={handleChange} readOnly={!isEditing} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email">Email:</label>
                </td>
                <td>
                  <label htmlFor="movil">Teléfono Móvil:</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" id="email" name="correo" value={correo} onChange={handleChange} readOnly={!isEditing} />
                </td>
                <td>
                  <input type="text" id="movil" name="telefono" value={telefono} onChange={handleChange} readOnly={!isEditing} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cedula">Cédula:</label>
                </td>
                <td>
                  <label htmlFor="usuario">Tipo de Usuario:</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" id="cedula" name="cedula" value={cedula} onChange={handleChange} readOnly={!isEditing} />
                </td>
                <td>
                  <input type="text" id="usuario" name="role" value={role} onChange={handleChange} readOnly={!isEditing} />
                </td>
              </tr>
              {role === 'Doctor' && (
                <>
                  <tr>
                    <td>
                      <label htmlFor="especialidad">Especialidad:</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" id="especialidad" name="especialidad" value={especialidad} onChange={handleChange} readOnly={!isEditing} />
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <h2 className="TitulosR"> &nbsp; &nbsp; Información Demográfica</h2>
          <table className="datosRegistrar">
            <tbody>
              <tr>
                <td className="Nuevo">
                  <label htmlFor="direccion">Dirección:</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" id="direccion" name="direccion" value={direccion} onChange={handleChange} readOnly={!isEditing} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="pais">País:</label>
                </td>
                <td>
                  <label htmlFor="ciudad">Ciudad:</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" id="pais" name="pais" value={pais} onChange={handleChange} readOnly={!isEditing} />
                </td>
                <td>
                  <input type="text" id="ciudad" name="Ciudad" value={Ciudad} onChange={handleChange} readOnly={!isEditing} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="CalleP">Calle Principal:</label>
                </td>
                <td>
                  <label htmlFor="CalleS">Calle Secundaria:</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" id="CalleP" name="caPrincipal" value={caPrincipal} onChange={handleChange} readOnly={!isEditing} />
                </td>
                <td>
                  <input type="text" id="CalleS" name="caSecundaria" value={caSecundaria} onChange={handleChange} readOnly={!isEditing} />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary btnLogin1" onClick={isEditing ? handleSave : handleEdit}>{isEditing ? "Guardar" : "Editar"}</button>
        </div>
        <div className="contenedorDatosDer">
          <div className="img">
            {img_perfil && <img src={img_perfil} alt="Usuario" />}
            {isEditing && (
              <div className="carga">
                {/* Input para seleccionar la imagen */}
                <label htmlFor="fileUpload" className="icono-camara">
                  <FontAwesomeIcon icon={faCamera} />
                </label>
                <input id="fileUpload" accept="image/*" type="file" style={{ display: 'none' }} onChange={imagenConv} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
