import React ,{ useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Registro.css";
import Layout from "../../components/Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router";
export default function miPerfil() {
  const {id}=useParams();
  //const id='65b53260db23db49d4d60cd4';
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [role, setRole] = useState();
  const [Ciudad, setCiudad] = useState();
  const [apellido, setApellido] = useState();
  const [caPrincipal, setCalleP] = useState();
  const [caSecundaria, setCalleS] = useState();
  const [cedula, setCedula] = useState();
  const [correo, setEmail] = useState();
  const [direccion, setDireccion] = useState();
  const [especialidad, setEspecialidad] = useState();
  const [nacimiento, setFechaNac] = useState('');
  const [nombre, setNombre] = useState();
  const [pais, setPais] = useState();
  const [sexo, setSexo] = useState();
  const [telefono, setMovil] = useState();
  const [img_perfil, setImg] = useState();

  useEffect(()=>{
    axios.get(`http://localhost:3001/getUser/${id}`)
    .then(result=> {console.log(result)
    setPassword(result.data.password), 
    setUsername(result.data.username), 
    setRole(result.data.role), 
    setCiudad(result.data.Ciudad), 
    setApellido(result.data.apellido),
    setCalleP(result.data.caPrincipal),
    setCalleS(result.data.caSecundaria),
    setCedula(result.data.cedula),
    setEmail(result.data.correo),
    setDireccion(result.data.direccion), 
    setEspecialidad(result.data.especialidad), 
    setFechaNac(result.data.nacimiento),
    setNombre(result.data.nombre),
    setPais(result.data.pais),
    setSexo(result.data.sexo),
    setMovil(result.data.telefono), 
    setImg(result.data.img_perfil)
    })
  })


  /*const [userData, setUserData] = useState(
    {
      username:"1Marley",
      nombre:"2Jeimy",
      apellido:"3Morales",
      nacimiento:"4 12",
      sexo:"5Femenino",
      correo:"6jmmorales11Qespe.edu.ec",
      telefono:"70981",
      cedula:"81234567890",
      role:"9Doctor",
      especialidad:"10Nuevo",
      direccion:"11hola",
      pais:"12",
      Ciudad:"13",
      caPrincipal:"14",
      caSecundaria:"15",
      img_perfil:"16"
      
    }
  );

  */
  return (
    <Layout>
    <div className="contenedorDatos">
      <div className="contenedorDatosIzq">
        <h2 className="TitulosR"> &nbsp; &nbsp; Iformación General</h2>
        
        <table className="datosRegistrar">
          <tr>
            <td className="Nuevo">
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
              <input type="text" id="apellido" name="apellido" value={apellido}/>
            </td>
            <td>
              <input type="text" id="nombre" name="nombre" value={nombre} />
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
              <input type="text" id="fechaNac" name="fechaNac" value ={nacimiento} />
            </td>
            <td>
              <input type="text" id="sexo" name="sexo" value ={sexo} />
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
              <input type="text" id="email" name="email" value={correo} />
            </td>
            <td>
              <input type="text" id="movil" name="movil" value ={telefono} />
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
              <input type="text" id="cedula" name="cedula"  value={cedula}/>
            </td>
            <td>
              <input type="text" id="usuario" name="usuario" value ={role} />
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
              <input type="text" id="especialidad" name="especialidad"  value={especialidad}/>
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
              <input type="text" id="direccion" name="direccion" value ={direccion} />
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
              <input type="text" id="pais" name="pais"  value ={pais}/>
            </td>
            <td>
              <input type="text" id="ciudad" name="ciudad" value={Ciudad} />
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
              <input type="text" id="CalleP" name="CalleP" value ={caPrincipal} />
            </td>
            <td>
              <input type="text" id="CalleS" name="CalleS" value ={caSecundaria} />
            </td>
          </tr>
        </table>
      </div>
      <div className="contenedorDatosDer">
      <div className="img">
        {img_perfil&& <img src={img_perfil} alt="Usuario" />}
        </div>
      </div>
    </div>
    </Layout>
  );
}
