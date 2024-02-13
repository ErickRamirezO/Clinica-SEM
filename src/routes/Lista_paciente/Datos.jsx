import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Datos = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [prevId, setPrevId] = useState(null);

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await fetch(`http://localhost:3001/auth/pacientes/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        setPaciente(data[0]);
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

    return (
        <div>
            <h2>Datos del Paciente</h2>
            <p><strong>Nombres:</strong> {paciente.nombres}</p>
            <p><strong>Apellidos:</strong> {paciente.apellidos}</p>
            <p><strong>Fecha de Nacimiento:</strong> {paciente.fechaNacimiento}</p>
            <p><strong>Estatura:</strong> {paciente.estatura}</p>
            <p><strong>Cédula:</strong> {paciente.cedula}</p>
            <p><strong>Teléfono:</strong> {paciente.telefono}</p>
            <p><strong>Peso:</strong> {paciente.peso}</p>
        </div>
    );
};

export default Datos;
