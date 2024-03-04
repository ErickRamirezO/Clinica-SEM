import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Lista_doctores.css";


const Modal_Doctor = ({
    showModalDoctor,
    handleModalCloseDoctor,
    doctor,
}) => {


    return (
        <Modal show={showModalDoctor} onHide={handleModalCloseDoctor} size="lg" className=" ModalDoctordoctor">
            <Modal.Body>
                <div className="ContenedorDoctor">
                    <div className="ContenedorDoctorIzq">
                        <div className="IzqInformacion">
                            <i className="fas fa-heart icono"></i>
                            <table className="maximo tablaSin">
                                <tr>
                                    <td className="autoTam">
                                        <img src={doctor.img_perfil} alt="Perfil del doctor" />
                                    </td>
                                    <td className="medio">
                                        <table className="maximo tabla1">
                                            <tr className="infoDoctor">
                                                <td className="autoTam ak">Doctor/a</td>
                                                <td className="autoTam ak2">{doctor.nombre} {doctor.apellido}</td>
                                            </tr>
                                            <tr className="infoDoctor">
                                                <td className="autoTam ak">Especialidad</td>
                                                <td className="autoTam ak2">{doctor.especialidad}</td>
                                            </tr>
                                            <tr className="infoDoctor">
                                                <td className="autoTam ak">País de recidencia</td>
                                                <td className="autoTam ak2">{doctor.pais}</td>
                                            </tr>
                                            <tr className="infoDoctor">
                                                <td className="autoTam ak">Ciudad actual</td>
                                                <td className="autoTam ak2">{doctor.Ciudad}</td>
                                            </tr>
                                            <tr className="infoDoctor">
                                                <td className="autoTam ak">Email</td>
                                                <td className="autoTam ak2">{doctor.correo}</td>
                                            </tr>
                                            <tr className="infoDoctor">
                                                <td className="autoTam ak">Contacto</td>
                                                <td className="autoTam ak2">{doctor.telefono}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalCloseDoctor}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Modal_Doctor;
