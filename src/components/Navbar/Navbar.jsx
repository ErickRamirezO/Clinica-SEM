import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComments, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo de la empresa" />
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Buscar paciente..." />
      </div>
    </nav>
  );
};

const SideNav = () => {
  return (
    <div className="sidenav">
      <Link to="/listado-de-pacientes" className="sidenav-link">
        <FontAwesomeIcon icon={faUser} /> <span>Pacientes</span>
      </Link>
      <Link to="/chat" className="sidenav-link">
        <FontAwesomeIcon icon={faComments}/><span>Chat</span> 
      </Link>
      <Link to="/mi-perfil" className="sidenav-link">
        <FontAwesomeIcon icon={faUserCircle} /> <span>Mi Perfil</span>
      </Link>
      <Link to="/cerrar-sesion" className="sidenav-link">
        <FontAwesomeIcon icon={faSignOutAlt} /> <span>Cerrar Sesión</span>
      </Link>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <SideNav />
        <div className="main">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
