import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComments, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Container, InputGroup, FormControl } from 'react-bootstrap';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand className="logo-container">
          <img src="/logo2.png" className="img_nav_logo" alt="Logo de la empresa" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className="justify-content-end">
          <InputGroup className="user">
            <Link to="/mi-perfil" className="sidenav-link">
              <FontAwesomeIcon icon={faUserCircle} />
              <p>Mi perfil</p>
            </Link>
          </InputGroup>
          <SideNav />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const SideNav = () => {
  const navigate = useNavigate();
  async function handleSignOut() {
    const result = await Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión'
    });

    if (result.isConfirmed) {
      navigate('/');
    }
  }

  return (
    <div className="sidenav">
      <div className='superior'>
        <Link to="/lista-de-pacientes" className="sidenav-link ">
          <FontAwesomeIcon icon={faUser} />
          <p>Pacientes</p>
        </Link>
        <Link to="/lista-de-doctores" className="sidenav-link ">
          <FontAwesomeIcon icon={faUser} />
          <p>Doctores</p>
        </Link>
        <Link to="/chat" className="sidenav-link">
          <FontAwesomeIcon icon={faComments} />
          <p>Chat</p>
        </Link>
      </div>
      <div className='inferior'>
        <Link className="sidenav-link iconSalir" onClick={handleSignOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <p>Salir</p>
        </Link>
      </div>
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
