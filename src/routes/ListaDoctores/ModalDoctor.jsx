import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

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
                                        <table className="maximo">
                                            <tr>
                                                <td className="autoTam">{doctor.nombre}</td>
                                            </tr>
                                            <tr>
                                                <td className="autoTam">{doctor.apellido}</td>
                                            </tr>
                                            <tr>
                                                <td className="autoTam">{doctor.ciudad}</td>
                                            </tr>
                                            <tr>
                                                <td className="autoTam">{doctor.correo}</td>
                                            </tr>
                                            <tr>
                                                <td className="autoTam">{doctor.telefono}</td>
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
