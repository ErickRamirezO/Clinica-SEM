import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login/Login";
import Lista_paciente from "./routes/Lista_paciente/Lista_paciente";
import ListaDoctores from "./routes/ListaDoctores/ListaDoctores";
import Chat from "./routes/Chat/Chat";
import ErrorPage from "./routes/Error/Error";
import "./index.css";
import Registro from "./routes/Registro/Registro";
import MiPerfil from "./routes/Registro/MiPerfil";
import Historial from "./routes/Historial/Historial";


//RUTAS
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/lista-de-pacientes",
    element: <Lista_paciente />,
  },
  {
    path: "/lista-de-doctores",
    element: <ListaDoctores />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/mi-perfil",
    element: <MiPerfil />,
  },
  {
    path: "/historial-paciente",
    element: <Historial />,
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
