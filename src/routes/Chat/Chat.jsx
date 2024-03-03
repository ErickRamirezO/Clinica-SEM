import { PrettyChatWindow } from "react-chat-engine-pretty";
import Layout from "../../components/Navbar/Navbar";
import "./Chat.css";
import { useEffect } from 'react';

const Chat = (props) => {
  // Verifica si props.user está definido antes de intentar acceder a sus propiedades
  if (!props.user) {
    return (
      <Layout>
        <div>Cargando...</div> {/* O cualquier otro indicador de carga */}
      </Layout>
    );
  }
  
  useEffect(() => {
    // Obtener todos los elementos con la clase ce-custom-header-subtitle
    const statusElements = document.querySelectorAll(".ce-custom-header-subtitle");

    // Iterar sobre los elementos y cambiar el color del texto según el contenido
    statusElements.forEach(element => {
      const status = element.textContent.trim();

      if (status === "Online") {
        element.style.setProperty('color', '#0ffc03', 'important');
      } else if (status === "Offline") {
        element.style.setProperty('color', 'red', 'important');
      }
    });
  }, []); // Ejecutar solo una vez al montar el componente





  return (
    <Layout>
      <div style={{ height: "75vh" }}>
        <PrettyChatWindow
          projectId="d003e5d0-9566-45cd-97a2-2e23bab076bd"
          username={props.user.username}
          secret={props.user.password}
          style={{ height: "100%" }}
        />
      </div>
    </Layout>
  );
};

export default Chat;
