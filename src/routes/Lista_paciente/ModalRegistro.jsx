import React , { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

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
    errorCorreo,
    errorPeso,
    errorTemperatura,
    validarNombresCompletos,
    validarApellidosCompletos,
    validarEstatura,
    validarCedulaEcuatoriana,
    validarNumeroTelefonico,
    validarCorreo,
    validarPeso,
    validarTemperatura,
    handleGuardar,
    mensajeError,
    setFormData
  }) => {
    

  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getUser/`)
      .then((result) => {
        console.log("Datos obtenidos:", result.data);
        setUsuarios(result.data); // Almacenar los usuarios en el estado
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    // Verificar si la lista de usuarios se ha cargado correctamente
    if (usuarios.length > 0) {
      // Obtener los detalles del usuario seleccionado y establecerlos en los campos de entrada
      const selectedUser = usuarios.find((user) => user._id === userId);
      console.log("selectedUser:", selectedUser);
      if (selectedUser) {
        setFormData({
          ...formData,
          nombres: selectedUser.nombre,
          apellidos: selectedUser.apellido,
          fechaNacimiento: selectedUser.nacimiento,
          cedula: selectedUser.cedula,
          telefono: selectedUser.telefono,
          correo: selectedUser.correo,
          img:selectedUser.img_perfil
        });
        console.log("formData after update:", formData);
      }
    }
  };
    
      
      
      



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
                        
                    <label className="col-sm-3 col-form-label">
                    Seleccionar Paciente:
                    </label>
                    <div className="col-sm-9">
                    <select
                        name="TodosPacientes"
                        id="topacientes"
                        onChange={(e) => handleUserSelect(e.target.value)}
                    >
                        <option value="">Seleccionar usuario...</option>
                        {usuarios.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.nombre} {user.apellido}
                        </option>
                        ))}
                    </select>

                    </div>
                    </div>
                    <div className="form-group row">
                        
                        <label className="col-sm-3 col-form-label">Nombres Completos:</label>
                        <div className="col-sm-9">
                        
                        <input
                            type="text"
                            className="form-control"
                            name="nombres"
                            value={formData.nombres} // Usar el estado del nombre aquí
                            onChange={handleInputChange}
                            placeholder="nombre1 nombre2"
                        />

                        <input
                            type="text"
                            className=" none"
                            name="nombres"
                            value={formData.img} // Usar el estado del nombre aquí
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
                                type="text"
                                className="form-control"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={handleInputChange}
                                placeholder="apellido1 apellido2"
                            />
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
