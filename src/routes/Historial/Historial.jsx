import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./historial.css";
import Layout from "../../components/Navbar/Navbar";

const Historial = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [prevId, setPrevId] = useState(null);

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


    if (!paciente) {
        return <p>Cargando...</p>;
    }

    // Formatear la fecha de nacimiento
    const fechaNacimiento = new Date(paciente.fechaNacimiento);
    const formattedFechaNacimiento = `${fechaNacimiento.getDate()}, ${fechaNacimiento.toLocaleString('default', { month: 'long' })} ${fechaNacimiento.getFullYear()}`;


    // Función para calcular la edad a partir de la fecha de nacimiento
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

    // Uso en tu componente
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
                                    <img src="" alt="" className="fotoUsuario" />
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
                                            <td className="autoTam">{edad}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <div>
                            <p className="notasP">NOTAS</p>
                        </div>
                    </div>
                    <div className="IzqSignos">
                        <p className="center">
                            <i className="fas fa-heart columnIco "></i>
                            <input type="date" className="medio" />
                        </p>
                        <table className="maximo tablaSin">
                            <tr>
                                <td className="columnIco">
                                    <i className="fas fa-heart"></i>
                                </td>
                                <td className="columnCont">Estatura</td>
                                <td className="columnCont"> {paciente.estatura}</td>
                            </tr>
                            <tr>
                                <td className="columnIco">
                                    <i className="fas fa-heart"></i>
                                </td>
                                <td className="columnCont">Peso</td>
                                <td className="columnCont">{paciente.peso}</td>
                            </tr>
                            <tr>
                                <td className="columnIco">
                                    <i className="fas fa-heart"></i>
                                </td>
                                <td className="columnCont">Temperatura</td>
                                <td className="columnCont">32</td>
                            </tr>
                            <tr>
                                <td className="columnIco">
                                    <i className="fas fa-heart"></i>
                                </td>
                                <td className="columnCont">Presion Arterial</td>
                                <td className="columnCont">3</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="ContenedorHistorialDer">
                    <div className="IzqInformacion">
                        <div>
                            <table className="maximo tablaSin">
                                <tr>
                                    <td className="iconoA">
                                        <i className="fas fa-heart"></i>
                                    </td>
                                    <td className="columnaAntecedentes">
                                        ALERGIAS:
                                        <ul>
                                            <li>UNO</li>
                                            <li>UNO</li>
                                            <li>UNO</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="iconoA">
                                        <i className="fas fa-heart"></i>
                                    </td>
                                    <td className="columnaAntecedentes">

                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

};

export default Historial;
