import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalRegistro = ({
    showUpdateModal,
    handleUpdateModalClose,
    formData,
    handleInputChange,
    errorCorreo,
    errorTelefono,
    errorNombres,
    errorApellidos,
    validarNumeroTelefonico,
    validarNombresCompletos,
    validarApellidosCompletos,
    validarCorreo,
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
                                onChange={handleInputChange}

                            />
                            {errorNombres && !validarNombresCompletos(formData.nombres) && (
                                <p className="pError">Formato de nombres incorrecto</p>
                            )}
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
                                onChange={handleInputChange}
 
                            />
                            {errorApellidos && !validarApellidosCompletos(formData.apellidos) && (
                                <p className="pError">Formato de apellidos incorrecto</p>
                            )}
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
                        <label className="col-sm-3 col-form-label">Correo electrónico:</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                placeholder="example@gmail.com"
                            />
                            {errorCorreo && !validarCorreo(formData.correo) && (
                                <p className="pError">Correo inválido</p>
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
                        <label className="col-sm-3 col-form-label">Especialidad</label>
                        <div className="col-sm-9">
                            <select
                                className="form-control"
                                name="especialidad"
                                value={formData.especialidad}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecciona una especialidad</option>
                                <option value="Cardiología">Cardiología</option>
                                <option value="Dermatología">Dermatología</option>
                                <option value="Gastroenterología">Gastroenterología</option>
                                <option value="Neurología">Neurología</option>
                            </select>
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
