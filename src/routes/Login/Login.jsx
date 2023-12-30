import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

export default function Login() {
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
          <form>
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" />
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
