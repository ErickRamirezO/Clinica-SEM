import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "./Login.css";

const MySwal = withReactContent(Swal);

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Enviar la solicitud de inicio de sesión al backend
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Si la solicitud es exitosa, redirige a la página deseada
        await MySwal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido de nuevo!',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/mi-perfil');
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo.',
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="Container_ext">
      <div className="Container">
        <div className="LoginContainer">
          <div className="UserIconLogin">
            <FontAwesomeIcon
              icon={faUser}
              size="2xl"
              style={{ color: "#ffffff" }}
            />
          </div>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="accionesLogin">
              <button type="submit">Iniciar sesión</button>
              <Link to="/registro">
                <button>Registro</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
