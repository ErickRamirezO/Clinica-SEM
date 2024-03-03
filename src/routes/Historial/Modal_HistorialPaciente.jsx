import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./historial.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRuler, faWeight, faThermometer, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalHistorial from "./ModalHistorial";

const Modal_HistorialPaciente = ({
    showModalHistorial,
    handleModalCloseHistorial,
    paciente,
}) => {

    const [historiales, setHistoriales] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchHistoriales = async () => {
            // Asegúrate de que esta lógica sea correcta para tu aplicación
            // Es posible que necesites ajustar la URL de tu API o la lógica de filtrado
            if (paciente && paciente.cedula) {
                try {
                    const response = await fetch(`http://localhost:3001/auth/obtener-historiales/${paciente.cedula}`);
                    if (response.ok) {
                        const data = await response.json();
                        setHistoriales(data);
                    } else {
                        console.error('Error al obtener los historiales');
                    }
                } catch (error) {
                    console.error('Error de red:', error);
                }
            }
        };

        if (paciente) {
            fetchHistoriales();
        }
    }, [paciente]); // Dependiendo del estado paciente

    if (!paciente) {
        return <p>Cargando...</p>;
    }

    const fechaNacimiento = new Date(paciente.fechaNacimiento);
    const formattedFechaNacimiento = `${fechaNacimiento.getDate()}, ${fechaNacimiento.toLocaleString('default', { month: 'long' })} ${fechaNacimiento.getFullYear()}`;

    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const cumpleanos = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        const mes = hoy.getMonth() - cumpleanos.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    };

    const edad = calcularEdad(paciente.fechaNacimiento);

    return (
        <Modal show={showModalHistorial} onHide={handleModalCloseHistorial} size="lg" className="ModalHistorialPaciente">
            <Modal.Body>
                <div className="ContenedorHistorial">
                    <div className="ContenedorHistorialIzq">
                        <div className="IzqInformacion">
                            <i className="fas fa-heart icono"></i>
                            <table className="maximo tablaSin">
                                <tr>
                                    <td className="autoTam">

                                        {paciente.img && <img src={paciente.img} alt="Foto de usuario" className="fotoUsuario" />}
                                    </td>
                                    <td className="medio">
                                        <table className="maximo">
                                            <tr>
                                                <td className="autoTam">{`${paciente.nombres} ${paciente.apellidos}`}</td>
                                            </tr>
                                            <tr>
                                                <td className="autoTam">{paciente.correo}</td>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <td className="autoTam">{formattedFechaNacimiento}</td>
                                            </tr>
                                            <tr>
                                                <td className="autoTam">{edad} años</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="IzqSignos">
                            <table className="maximo tablaSin tablaSignosVitales">
                                <tr>
                                    <td className="columnIco">
                                        <FontAwesomeIcon icon={faRuler} onClick={() => handleModalOpen()} />
                                    </td>
                                    <td className="columnCont"> Estatura</td>
                                    <td className="columnCont">{paciente.estatura} metros</td>
                                </tr>
                                <tr>
                                    <td className="columnIco">
                                        <FontAwesomeIcon icon={faWeight} />
                                    </td>
                                    <td className="columnCont">Peso</td>
                                    <td className="columnCont">{paciente.peso} kg</td>
                                </tr>
                                <tr>
                                    <td className="columnIco">
                                        <FontAwesomeIcon icon={faThermometer} />
                                    </td>
                                    <td className="columnCont">Temperatura</td>
                                    <td className="columnCont">{paciente.temperatura} °</td>
                                </tr>

                            </table>
                        </div>
                        <div className="IzqInformacion">
                            <h6>ALERGIAS</h6>
                            <div className="info1">
                                {historiales.map((historial, index) => (
                                    <div key={index} className="historialItem">
                                        <div className="alergiasHistorial">
                                            <p>Alergias: {historial.alergias}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="ContenedorHistorialDer">
                        <h6>HISTORIAL</h6>
                        <div className="buscadores">
                            <div className="iconoMas" >
                                <FontAwesomeIcon icon={faPlus} onClick={() => handleModalOpen()} />
                            </div>
                        </div>
                        <div className="info2">
                            {historiales.map((historial, index) => (
                                <div key={index} className="historialItem">
                                    <div className="fechaHistorial">
                                        <p>Fecha de atención: {historial.fechaCreacion}</p>
                                    </div>
                                    <div className="doctorHistorial">
                                        <p>Doctor encargado: {historial.doctor}</p>
                                    </div>
                                    <div className="especialidadHistorial">
                                        <p>Especialidad: {historial.especialidad}</p>
                                    </div>
                                    <div className="diagnosticoHistorial">
                                        <p>Diagnóstico: {historial.diagnostico}</p>
                                    </div>
                                    <div className="recetaMedica">
                                        <p>Receta médica: {historial.receta}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modal registrar paciente */}
                <ModalHistorial
                    showModal={showModal}
                    handleModalClose={handleModalClose}
                    paciente={paciente}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalCloseHistorial}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>

    );

};

export default Modal_HistorialPaciente;
