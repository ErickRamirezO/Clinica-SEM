import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login/Login";
import Lista_paciente from "./routes/Lista_paciente/Lista_paciente";
import ListaDoctores from "./routes/ListaDoctores/Lista_doctores";
import Chat from "./routes/Chat/Chat";
import ErrorPage from "./routes/Error/Error";
import "./index.css";
import Registro from "./routes/Registro/Registro";
import RegistroN from "./routes/Registro/RegistroN";
import MiPerfil from "./routes/Registro/MiPerfil";
import Historial from "./routes/Historial/Historial";
import Inicio from "./routes/Inicio/Inicio";

function App() {
  const [user, setUser] = useState(null); // Inicializamos user como null

  useEffect(() => {
    // Leemos el usuario del localStorage al cargar la aplicación
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // RUTAS
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Inicio />,
      errorElement: <ErrorPage />
    },
    {
      path: "/login",
      element: <Login onAuth={(user) => handleLogin(user)} />,
      errorElement: <ErrorPage />
    },
    {
      path: "/chat/:id",
      element: <Chat user={user} />
    },
    {
      path: "/lista-de-pacientes/:id",
      element: <Lista_paciente />
    },
    {
      path: "/lista-de-doctores/:id",
      element: <ListaDoctores />
    },
    {
      path: "/registro",
      element: <Registro />
    },
    {
      path: "/registrar/:id",
      element: <RegistroN />
    },
    {
      path: "/mi-perfil/:id",
      element: <MiPerfil />
    },
    {
      path: "/historial-paciente/:userId/:pacienteId",
      element: <Historial />
    }
    
    
  ]);

  const handleLogin = (user) => {
    setUser(user);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
