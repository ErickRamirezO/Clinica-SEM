import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

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
        navigate('/lista-de-pacientes');
      } else {
        // Manejar errores, por ejemplo, mostrar un mensaje de error
        console.error("Error al iniciar sesión");
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
