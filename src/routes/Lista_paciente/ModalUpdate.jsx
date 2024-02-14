import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalRegistro = ({
    showUpdateModal,
    handleUpdateModalClose,
    formData,
    handleInputChange,
    errorEstatura,
    errorTelefono,
    errorPeso,
    errorTemperatura,
    validarEstatura,
    validarNumeroTelefonico,
    validarPeso,
    validarTemperatura,
    handleGuardarUpdate,
}) => {
    return (
        <Modal show={showUpdateModal} onHide={handleUpdateModalClose} size="lg">
            <Modal.Header>
                <Modal.Title className="text-center mx-auto">Actualización de datos</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Nombres Completos:</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                name="nombres"
                                value={formData.nombres}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Apellidos Completos:</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                name="apellidos"
                                value={formData.apellidos}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Fecha de Nacimiento:</label>
                        <div className="col-sm-9">
                            <input
                                type="date"
                                className="form-control"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Estatura (cm):</label>
                        <div className="col-sm-9">
                            <input
                                type="number"
                                className="form-control"
                                name="estatura"
                                value={formData.estatura}
                                onChange={handleInputChange}
                            />
                            {errorEstatura && !validarEstatura(formData.estatura) && (
                                <p className="pError">Estatura no válida</p>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Cédula:</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                name="cedula"
                                value={formData.cedula}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                            Número Telefónico:
                        </label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                            />
                            {errorTelefono && !validarNumeroTelefonico(formData.telefono) && (
                                <p className="pError">Número telefónico incorrecto</p>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Peso (kg):</label>
                        <div className="col-sm-9">
                            <input
                                type="number"
                                className="form-control"
                                name="peso"
                                value={formData.peso}
                                onChange={handleInputChange}
                            />
                            {errorPeso && !validarPeso(formData.peso) && (
                                <p className="pError">Ingrese un peso válido</p>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Temperatura (°):</label>
                        <div className="col-sm-9">
                            <input
                                type="number"
                                className="form-control"
                                name="temperatura"
                                value={formData.temperatura}
                                onChange={handleInputChange}
                                placeholder="34 - 39"
                            />
                            {errorTemperatura && !validarTemperatura(formData.temperatura) && (
                                <p className="pError">Ingreso inválido</p>
                            )}
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleUpdateModalClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleGuardarUpdate}>
                    Actualizar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistro;
