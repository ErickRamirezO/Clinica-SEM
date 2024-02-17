import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./historial.css";
import Layout from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRuler, faWeight, faThermometer, faPlus, faCamera } from "@fortawesome/free-solid-svg-icons";
import ModalHistorial from "./ModalHistorial";

const Historial = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [historiales, setHistoriales] = useState([]);
    const [prevId, setPrevId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [foto, setFoto] = useState(null);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await fetch(`http://localhost:3001/auth/paciente-historial/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data !== null) {
                        setPaciente(data);
                    } else {
                        console.error('Paciente no encontrado');
                    }
                } else {
                    console.error('Error al obtener el paciente');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        // Verificar si el ID ha cambiado antes de hacer la solicitud
        if (id !== prevId) {
            setPrevId(id);
            fetchPaciente();
        }

        // Limpiar el estado del paciente cuando el ID cambie
        return () => {
            setPaciente(null);
        };
    }, [id, prevId]);

    //obtenemos los historiales en base a la comparación de sus cédulas
    useEffect(() => {
        const fetchHistoriales = async () => {
            try {
                const response = await fetch(`http://localhost:3001/auth/obtener-historiales/${paciente.cedula}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data !== null) {
                        const historialesPaciente = data.filter(historial => historial.cedula === paciente.cedula);
                        setHistoriales(historialesPaciente);
                    } else {
                        console.error('No se encontraron historiales para el paciente');
                    }
                } else {
                    console.error('Error al obtener los historiales');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        if (paciente) {
            fetchHistoriales();
        }
    }, [paciente]);



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
        <Layout>
            <div className="ContenedorHistorial">
                <div className="ContenedorHistorialIzq">
                    <div className="IzqInformacion">
                        <i className="fas fa-heart icono"></i>
                        <table className="maximo tablaSin">
                            <tr>
                                <td className="autoTam">
                                    <label htmlFor="fotoInput">
                                        <FontAwesomeIcon icon={faCamera} />
                                        <input id="fotoInput" type="file" accept="image/*" onChange={handleFotoChange} style={{ display: 'none' }} />
                                    </label>
                                    {foto && <img src={foto} alt="Foto de usuario" className="fotoUsuario" />}
                                </td>
                                <td className="medio">
                                    <table className="maximo">
                                        <tr>
                                            <td className="autoTam">{`${paciente.nombres} ${paciente.apellidos}`}</td>
                                        </tr>
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
                        <div className="searchFecha">
                            <input type="date" />
                        </div>
                        <div className="searchBarra">
                            <input type="text" placeholder="Buscar..." />
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
        </Layout>
    );

};

export default Historial;
