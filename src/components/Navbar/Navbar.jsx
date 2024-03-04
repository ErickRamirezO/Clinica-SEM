import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComments, faUserCircle, faSignOutAlt, faAddressCard, faHistory } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Container, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  const { id } = useParams();
  const [img_perfil, setImg] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then(result => {
        console.log(result);
        setImg(result.data.img_perfil);
        setRole(result.data.role);
        console.log("Rol del usuario:", result.data.role);
      })
      .catch(error => {
        console.error('Error fetching user profile image:', error);
      });
  }, [id]);

  return (
    <div className='Nav-n'>
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand className="logo-container">

            <img src="/logo2.png" className="img_nav_logo" alt="Logo de la empresa" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="justify-content-end">
            <InputGroup className="user">
              <Link to={`/mi-perfil/${id}`} className="sidenav-link">
                {img_perfil && <img src={img_perfil} alt="Usuario" />}
                <p>Mi perfil</p>
              </Link>
            </InputGroup>
            <SideNav id={id} role={role} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const SideNav = ({ id, role }) => {
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
        {(role === 'Administrador' || role === 'Doctor') && (
          <Link to={`/lista-de-pacientes/${id}`} className="sidenav-link ">
            <FontAwesomeIcon icon={faUser} />
            <p>Pacientes</p>
          </Link>
        )}
        {(role === 'Administrador' || role === 'Paciente') && (
          <Link to={`/lista-de-doctores/${id}`} className="sidenav-link ">
            <FontAwesomeIcon icon={faUser} />
            <p>Doctores</p>
          </Link>
        )}
        {(role === 'Doctor' || role === 'Paciente') && (
          <Link to={`/chat/${id}`} className="sidenav-link">
            <FontAwesomeIcon icon={faComments} />
            <p>Chat</p>
          </Link>
        )}

        {(role === 'Administrador' || role === 'Doctor') && (
          <Link to={`/registrar/${id}`} className="sidenav-link">
            <FontAwesomeIcon icon={faAddressCard} />
            <p>Registrar</p>
          </Link>


        )}
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
