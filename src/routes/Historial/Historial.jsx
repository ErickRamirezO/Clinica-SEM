// Historial.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./historial.css";
import Layout from "../../components/Navbar/Navbar";

export default function Historial() {
    const { pacienteId } = useParams();
    const [paciente, setPaciente] = useState(null);

    useEffect(() => {
        const fetchPacienteData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/auth/pacientes/${pacienteId}`);
                if (response.ok) {
                    const data = await response.json();
                    setPaciente(data);
                } else {
                    console.error("Error al obtener los datos del paciente");
                }
            } catch (error) {
                console.error("Error de red", error);
            }
        };

        fetchPacienteData();
    }, [pacienteId]);

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
                                            <td className="autoTam">NOMBRES Y APELLIDO</td>
                                            <td className="autoTam">{`${paciente?.nombres} ${paciente?.apellidos}`}</td>
                                        </tr>
                                        <tr>
                                            <td className="autoTam">Fecha de nacimiento</td>
                                            <td className="autoTam">{paciente?.fechaNacimiento}</td>
                                        </tr>
                                        <tr>
                                            <td className="autoTam">Edad</td>
                                            <td className="autoTam">{/* Calcular la edad según la fecha de nacimiento y la fecha actual */}</td>
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
                                <td className="columnCont">1,5</td>
                            </tr>
                            <tr>
                                <td className="columnIco">
                                    <i className="fas fa-heart"></i>
                                </td>
                                <td className="columnCont">Peso</td>
                                <td className="columnCont">3</td>
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
}
