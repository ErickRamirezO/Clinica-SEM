import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";

export default function () {
  const faUserPlusStyle = {
    color: "#293c5e",
    borderRadius: "10px",
    border: "2px solid #306aa2",
    padding: "8px",
  };

  const faPaperPlaneStyle = {
    color: "#293c5e",
    cursor:"pointer",
  };

  return (
    <div className="contenedorChat">
      <div className="chatBuscador">
        <div className="chatBuscadorHeader">
          <form>
            <input type="text" placeholder="Buscar" />
          </form>
          <div className="faUserPlusIcon">
            <FontAwesomeIcon
              icon={faUserPlus}
              size="2xl"
              style={faUserPlusStyle}
            />
          </div>
        </div>
        <div className="chatHistorial">
          <div className="chatHeaderPersona">
            <div className="persona_id">JD</div>
            <p>John Doe</p>
          </div>
        </div>
      </div>
      <div className="chat">
        <div className="chatHeader">
          <div className="chatHeaderPersona">
            <div className="persona_id">JD</div>
            <p>John Doe</p>
          </div>
        </div>
        <div className="chatBody">
          <div className="chatMessage">
            <div className="message">ejemplo</div>
            <div className="hora">7:45 AM</div>
          </div>
          <div className="chatMessageForm">
            <input type="text" placeholder="Escribe un mensaje..." />
            <FontAwesomeIcon className="faPaperPlaneIcon" icon={faPaperPlane} size="lg" style={faPaperPlaneStyle}/>
          </div>
        </div>
      </div>
    </div>
  );
}
