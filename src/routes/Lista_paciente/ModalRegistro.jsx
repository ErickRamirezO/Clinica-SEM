import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalRegistro = ({
    showModal,
    handleModalClose,
    formData,
    handleInputChange,
    errorNombres,
    errorApellidos,
    errorEstatura,
    errorCedula,
    errorTelefono,
    errorPeso,
    errorTemperatura,
    validarNombresCompletos,
    validarApellidosCompletos,
    validarEstatura,
    validarCedulaEcuatoriana,
    validarNumeroTelefonico,
    validarPeso,
    validarTemperatura,
    handleGuardar,
    mensajeError,
}) => {
    return (
        <Modal show={showModal} onHide={handleModalClose} size="lg">
            <Modal.Header>
                <Modal.Title className="text-center mx-auto">Ingreso de datos</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{ textAlign: "right", marginBottom: "20px" }}>
                    <p name="fechaCreacion">{new Date().toLocaleDateString()}</p>
                </div>
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
                                placeholder="nombre1 nombre2"
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
                                placeholder="apellido1 apellido2"
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
                                onChange={handleInputChange}
                                max={new Date().toISOString().split('T')[0]} // Establecer el valor máximo como la fecha actual
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Estatura (m):</label>
                        <div className="col-sm-9">
                            <input
                                type="number"
                                className="form-control"
                                name="estatura"
                                value={formData.estatura}
                                onChange={handleInputChange}
                                placeholder="0.3 - 3.00"
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
                                onChange={handleInputChange}
                                placeholder="0400911899"
                            />
                            {errorCedula && !validarCedulaEcuatoriana(formData.cedula) && (
                                <p className="pError">Cédula incorrecta</p>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Número Telefónico:</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                placeholder="0981515127"
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
                                placeholder="4 - 300"
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
                <Button variant="secondary" onClick={handleModalClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleGuardar}>
                    Guardar
                </Button>
            </Modal.Footer>
            <center>
                <p className="ErrorPacienteExistente">
                    {mensajeError && (
                        <p style={{ color: "red", marginTop: "10px" }}>{mensajeError}</p>
                    )}
                </p>
            </center>
        </Modal>
    );
};

export default ModalRegistro;
