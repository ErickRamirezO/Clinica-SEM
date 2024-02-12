import React, { useState } from "react";
import { Navbar, Nav, Button, Carousel, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faUser, faPhone, faEnvelope, faCity } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import "./Inicio.css";

export default function HomePage() {
    const [modalShow, setModalShow] = useState(false);

    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);
    return (
        <div>
            {/* Navigation */}
            <Navbar className="colorNavar container" expand="lg">
                <Navbar.Brand as={Link} to="/">
                    <img src="/logo2.png" className="img_nav_logo" alt="Logo de la empresa" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/" className="nav-link-custom">Inicio</Nav.Link>
                        <Nav.Link className="nav-link-custom" href="#seccionEspe">Especialidades</Nav.Link>
                        <Nav.Link className="nav-link-custom" href="#sepCont">Contactos</Nav.Link>
                    </Nav>
                    <div className="seccionLogin">
                        <Link to="/login">
                            <Button className="btn btn-primary btnLogin">Iniciar sesión</Button>
                        </Link>
                    </div>
                </Navbar.Collapse>
            </Navbar>

            {/* Aqui implementa lo que te pedi */}
            
            {/* ----------------------------------- */}

            {/* Sección de información y slider */}
            <div className="info container mt-4">
                <div className="row">
                    {/* Columna para la información */}
                    <div className="infoText col-md-6">
                        <h2>Porque cada vida merece una atención excepcional.</h2>
                        <p>En nuestra clínica, nos enorgullece ofrecer una gama completa de servicios médicos a través de más de 20 especialidades, cubriendo todas las dimensiones de la atención médica. Nuestro equipo está conformado por los mejores especialistas en cada campo, profesionales comprometidos que no solo poseen una vasta experiencia, sino que también están dedicados a proporcionar cuidados personalizados y compasivos.</p>
                        <center><Button className="btn btn-primary" onClick={handleModalShow}>Especialidades por ubicación</Button></center>
                    </div>

                    {/* Columna para el slider */}
                    <div className="col-md-6">
                        <Carousel indicators={false} controls={false}>
                            <Carousel.Item>
                                <img className="d-block w-100" src="/sem1.jpg" alt="First slide" />
                                <Carousel.Caption className="infoImage">
                                    <p>La experiencia médica se fusiona con el cuidado personalizado, creando un ambiente de bienestar integral.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src="/sem2.jpg" alt="Second slide" />
                                <Carousel.Caption className="infoImage">
                                    <p>En nuestra clínica, cada tratamiento se diseña para mejorar tu salud y elevar tu calidad de vida.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src="/sem3.png" alt="Third slide" />
                                <Carousel.Caption className="infoImage">
                                    <p>Comprometidos con la excelencia médica, ofrecemos soluciones innovadoras para el bienestar de nuestros pacientes.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src="/sem4.jpg" alt="Fourth slide" />
                                <Carousel.Caption className="infoImage">
                                    <p>En nuestra clínica, nos esforzamos por construir relaciones de confianza, porque tu salud es nuestra prioridad.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src="/sem5.jpg" alt="Fifth slide" />
                                <Carousel.Caption className="infoImage">
                                    <p>Descubre un espacio donde la atención médica va más allá, cuidando no solo tu cuerpo, sino también tu paz mental y emocional.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
            <div id="seccionEspe" className="separator"></div>

            {/* Informacion de especialidades */}
            <div className="especialidades container mt-4">
                <Row>
                    <Col>
                        <div className="especialidad">
                            <img src="/cardiologia.jpg" alt="Especialidad 1" />
                            <div className="overlay">
                                <h3>CARDIOLOGÍA</h3>
                                <p>Cuidamos de tu corazón con compromiso y experiencia.</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="especialidad">
                            <img src="/fisioterapia.jpg" alt="Especialidad 2" />
                            <div className="overlay">
                                <h3>FISIOTERAPIA</h3>
                                <p>En nuestro servicio de Fisioterapia, trabajamos mano a mano contigo para restaurar y mejorar tu movilidad. </p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="especialidad">
                            <img src="/mediGeneral.png" alt="Especialidad 3" />
                            <div className="overlay">
                                <h3>MEDICINA GENERAL</h3>
                                <p>Desde chequeos preventivos hasta el manejo de condiciones médicas comunes</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="especialidad">
                            <img src="/neurologia.jpg" alt="Especialidad 4" />
                            <div className="overlay">
                                <h3>NEUROLOGÍA</h3>
                                <p>Descubre nuestro servicio de Neurología, donde la excelencia se encuentra con la atención neurológica avanzada.</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="especialidad">
                            <img src="/pediatria.jpg" alt="Especialidad 5" />
                            <div className="overlay">
                                <h3>PEDIATRÍA</h3>
                                <p> En un entorno cálido y amigable, estamos comprometidos a velar por el bienestar de tus hijos, asegurándonos de que cada etapa de su desarrollo esté respaldada por una atención médica excepcional.</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="especialidad">
                            <img src="/dermatologia.jpg" alt="Especialidad 6" />
                            <div className="overlay">
                                <h3>DERMATOLOGÍA</h3>
                                <p>Bienvenido a nuestro servicio de Dermatología, donde cuidamos de la salud de tu piel con experiencia y dedicación.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <div id="sepCont" className="separator"></div>

            {/* Footer */}
            <div className="footer mt-4">
                <Navbar expand="lg" className="w-1000 colorFooter">
                    <Navbar.Brand className="logoFooter">
                        <img src="/logo2.png" alt="Logo del footer" />
                    </Navbar.Brand>

                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Row>
                                <Col className="infoFooter">
                                    <h4>Servicios</h4>
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {" Especialidades por ubicación"}
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faUser} />
                                        {" Portal pacientes"}
                                    </p>
                                </Col>
                                <Col className="infoFooter">
                                    <h4>Contactos</h4>
                                    <p>
                                        <FontAwesomeIcon icon={faPhone} />
                                        {" 0963901669"}
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        {" clinicasem9@gmail.com"}
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faCity} />
                                        {" Quito, Cuenca"}
                                    </p>
                                </Col>
                            </Row>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            {/* Modal para Especialidades por ubicación */}
            <Modal show={modalShow} onHide={handleModalClose} size="lg" centered className="colorNodal">
                <Modal.Header closeButton>
                    <Modal.Title>Especialidades por ubicación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <div className="modalRow">
                                <div className="modalImage">
                                    <img src="/quito.jpg" alt="Imagen 1" />
                                </div>
                                <div className="modalInfo">
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {" "}
                                        <Link to="https://maps.app.goo.gl/7hmbraDeGzkM2ucx6" target="_blank" rel="noopener noreferrer" className="ubi">
                                            Ver ubicación
                                        </Link>
                                    </p>
                                </div>
                                <div className="modalDescription">
                                    <h3>Quito</h3>
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {" Cumbaya - Paseo San Francisco"}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="modalRow">
                                <div className="modalImage">
                                    <img src="/guayaqul.jpeg" alt="Imagen 2" />
                                </div>
                                <div className="modalInfo">
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {" "}
                                        <Link to="https://maps.app.goo.gl/tQt5Ks7qmodor6Dh9" target="_blank" rel="noopener noreferrer" className="ubi">
                                            Ver ubicación
                                        </Link>
                                    </p>
                                </div>
                                <div className="modalDescription">
                                    <h3>Guayaquil</h3>
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {"San Borondon"}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="modalRow">
                                <div className="modalImage">
                                    <img src="/cuenca.jpg" alt="Imagen 3" />
                                </div>
                                <div className="modalInfo">
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {" "}
                                        <Link to="https://maps.app.goo.gl/ye45ijnh8vy22AGX7" target="_blank" rel="noopener noreferrer" className="ubi">
                                            Ver ubicación
                                        </Link>
                                    </p>
                                </div>
                                <div className="modalDescription">
                                    <h3>Cuenca</h3>
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {"Santa Ana de los Ríos de Cuenca"}
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}
