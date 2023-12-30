import React from "react";
import "./historial.css";

export default function Historial() {
  return (
    <div className="ContenedorHistorial">
        <div className="ContenedorHistorialIzq">
            <div className="IzqInformacion">
                <i className="fas fa-heart icono"></i>
                <table className="maximo tablaSin">
                      <tr >
                        <td className="autoTam" ><img src="" alt="" className="fotoUsuario"/></td>
                        <td className="medio"><table className="maximo">
                            <tr>
                                <td className="autoTam">NOMBRES Y APELLIDO</td>
                            </tr>
                            <tr>
                                <td className="autoTam">Fecha de nacimiento</td>
                            </tr>
                            <tr>
                                <td className="autoTam">Edad</td>
                            </tr>
                        </table></td>
                      </tr>
                  </table>
                  <div>
                    <p className="notasP">NOTAS</p>
                  </div>
            </div>
            <div className="IzqSignos">
                <p className="center"><i className="fas fa-heart columnIco "></i>
                    <input type="date" className="medio" /></p>
                <table className="maximo tablaSin">
                    <tr>
                        <td className="columnIco"><i className="fas fa-heart"></i></td>
                        <td className="columnCont">Estatura</td>
                        <td className="columnCont">1,5</td>
                    </tr>
                    <tr>
                        <td className="columnIco"><i className="fas fa-heart"></i></td>
                        <td className="columnCont">Peso</td>
                        <td className="columnCont">3</td>
                    </tr>
                    <tr>
                        <td className="columnIco"><i className="fas fa-heart"></i></td>
                        <td className="columnCont">Temperatura</td>
                        <td className="columnCont">32</td>
                    </tr>
                    <tr>
                        <td className="columnIco"><i className="fas fa-heart"></i></td>
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
                            <td className="iconoA"><i className="fas fa-heart"></i></td>
                            <td className="columnaAntecedentes">ALERGIAS:
                                <ul>
                                    <li>UNO</li>
                                    <li>UNO</li>
                                    <li>UNO</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="iconoA"><i className="fas fa-heart"></i></td>
                            <td className="columnaAntecedentes">HISTORIAL CLINICO:
                                <div>
                                    <p className="center"><i className="fas fa-heart columnIco "></i>
                                        <input type="date" className="medio"/></p>
                                        <div className="IzqInformacion historialCom">
                                            <p>Doctor  </p>
                                            <p>Diagnostico</p>
                                            <p>Receta medica:</p>
                                            <ul>
                                                <li>medicamento</li>
                                                <li>medicamento</li>
                                                <li>medicamento</li>
                                            </ul>
                                        </div>
                                </div>
                                <div>
                                    <p className="center"><i className="fas fa-heart columnIco "></i>
                                        <input type="date" className="medio"/></p>
                                        <div className="IzqInformacion historialCom">
                                            <p>Doctor  </p>
                                            <p>Diagnostico</p>
                                            <p>Receta medica:</p>
                                            <ul>
                                                <li>medicamento</li>
                                                <li>medicamento</li>
                                                <li>medicamento</li>
                                            </ul>
                                        </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>
    </div>
  );
}
