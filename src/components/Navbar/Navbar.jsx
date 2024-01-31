import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComments, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Container, InputGroup, FormControl } from 'react-bootstrap';
import "./Navbar.css";

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand className="logo-container">
          <img src="/logo.png" className="img_nav_logo" alt="Logo de la empresa" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className="justify-content-end">
          <InputGroup className="ms-md-3 search-bar">
            <FormControl type="text" placeholder="Buscar paciente..." className="form-control-sm" />
          </InputGroup>
          <SideNav />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const SideNav = () => {
  return (
    <div className="sidenav">
      <Link to="/lista-de-pacientes" className="sidenav-link ">
        <FontAwesomeIcon icon={faUser} /> <span>Pacientes</span>
      </Link>
      <Link to="/chat" className="sidenav-link">
        <FontAwesomeIcon icon={faComments} /><span>Chat</span>
      </Link>
      <Link to="/mi-perfil" className="sidenav-link">
        <FontAwesomeIcon icon={faUserCircle} /> <span>Mi Perfil</span>
      </Link>
      <Link to="/" className="sidenav-link">
        <FontAwesomeIcon icon={faSignOutAlt} /> <span>Cerrar Sesión</span>
      </Link>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <CustomNavbar />
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
