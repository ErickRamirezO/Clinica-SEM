import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import "./Login.css";

const MySwal = withReactContent(Swal);

const supabaseUrl = 'https://emhxsaqqpdeexvmipyzm.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaHhzYXFxcGRlZXh2bWlweXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MzI3NTYsImV4cCI6MjAyMjEwODc1Nn0.H8-mEKh1DI4-jeLhpXr-mIb-Kzl6L7d36vecyvJllqY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Login(props) {
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
        const userData = await response.json();
        const userId = userData.userId; // Obtener el ID del usuario desde la respuesta JSON

        // Si la solicitud es exitosa, redirige a la página deseada
        await MySwal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido de nuevo!',
          timer: 2000,
          showConfirmButton: false,
        });
        axios
        .post("http://localhost:3001/auth/login/chat-engine", { username, password })
        .then((r) => props.onAuth({ ...r.data, password })) // NOTE: over-ride secret
        .catch((e) => console.log(JSON.stringify(e.response.data)));
        navigate(`/mi-perfil/${userId}`);
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


  useEffect(() => {
    checkUser();
    const hashchangeListener = () => checkUser();
    window.addEventListener('hashchange', hashchangeListener);

    return () => {
      window.removeEventListener('hashchange', hashchangeListener);
    };
  }, []);
  
  async function checkUser() {
    const user = supabase.auth.user;
    setUsername(user);
  }
  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
    // Handle the result as needed
    if (error) {
      console.error("Error al iniciar sesión con GitHub:", error);
    } else {
      // Success
      navigate(`/mi-perfil/${userId}`);
      return;
    }
  }
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
                <Link to={`/registro`} >
                  <button>Registro</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

}
