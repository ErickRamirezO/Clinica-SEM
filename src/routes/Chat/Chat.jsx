import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";
import Layout from "../../components/Navbar/Navbar";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const faUserPlusStyle = {
    color: "#293c5e",
    borderRadius: "10px",
    border: "2px solid #306aa2",
    padding: "8px",
  };

  const faPaperPlaneStyle = {
    color: "#293c5e",
    cursor: "pointer",
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        content: inputMessage,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    }
  };

  const renderChatHistorial = () => {
    if (searchTerm.trim() === "") {
      return null; // No renderizar historial si no hay término de búsqueda
    }

    if (messages.length === 0) {
      return <p>No hay mensajes en el historial</p>;
    }

    const lastMessage = messages[messages.length - 1];

    return (
      <div className="chatHeaderPersona">
        <div className="persona_id">{lastMessage.content.substring(0, 2)}</div>
        <p>{lastMessage.content}</p>
        <div className="hora">{lastMessage.time}</div>
      </div>
    );
  };

  return (
    <Layout>
    <div className="contenedorChat">
      <div className="chatBuscador">
        <div className="chatBuscadorHeader">
          <form>
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="faUserPlusIcon">
            <FontAwesomeIcon
              icon={faUserPlus}
              size="2xl"
              style={faUserPlusStyle}
            />
          </div>
        </div>
        <div className="chatHistorial">{renderChatHistorial()}</div>
      </div>
      <div className="chat">
        <div className="chatHeader">
          <div className="chatHeaderPersona">
            <div className="persona_id">JD</div>
            <p>John Doe</p>
          </div>
        </div>
        <div className="chatBody">
          {messages.map((message, index) => (
            <div key={index} className="chatMessage">
              <div className="message">{message.content}</div>
              <div className="hora">{message.time}</div>
            </div>
          ))}
          <div className="chatMessageForm">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <FontAwesomeIcon
              className="faPaperPlaneIcon"
              icon={faPaperPlane}
              size="lg"
              style={faPaperPlaneStyle}
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
