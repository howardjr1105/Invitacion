import React, { useState, useEffect } from "react";
import { Modal, Select, Space, message } from "antd";
import Lottie from "react-lottie";
import Send from "../static/Send-Animated.json";
import { decryptData } from "./utils";

const RSVPForm = () => {
  const OkData = {
    loop: true,
    autoplay: true,
    animationData: Send,
  };

  const params = new URLSearchParams(window.location.search);
  const encryptedData = params.get("data");
  let guestName = "Estimado Invitado";
  let maxPersonas = 1;
  let numeroMesa = 0;

  if (encryptedData) {
    const userData = decryptData(decodeURIComponent(encryptedData)); // Desencriptamos los datos

    if (userData) {
      guestName = userData.invitado || "Estimado Invitado";
      maxPersonas = userData.maxPersonas || 1;
      numeroMesa = userData.mesa || 0;
    }
  }

  const [attending, setAttending] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  //const [numChildren, setNumChildren] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const enviado = localStorage.getItem("confirmacionEnviada");
    const savedAttending = localStorage.getItem("attending");
    if (enviado === "true") {
      setConfirmed(true);
      if (savedAttending) setAttending(savedAttending);
    }
  }, []);

  const handleConfirm = (e) => {
    e.preventDefault();
    setConfirmed(true);
    setIsModalOpen(true);
  };

  const handleChange = (value) => {
    setAttending(value);
  };

  const handleSubmit = async () => {
    const formData = {
      nombre: guestName,
      asistencia: attending,
      personas: attending === "si" ? numPeople : 0,
      //niños: numChildren,
    };

    await fetch(
      "https://prod-159.westus.logic.azure.com:443/workflows/536661fb74ca43909baacaf85076ebc5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=99P0hzPzCgSHoPa7aYRhovGuRcgQJyhBbfOA7w1qsmM",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    );

    localStorage.setItem("confirmacionEnviada", "true");
    localStorage.setItem("attending", attending);
    message.success("✅ Confirmación enviada! 🎉");
  };

  return (
    <div className="rsvp-form asistencia">
      {!confirmed && <h2>Confirmar Asistencia</h2>}
      {confirmed ? (
        <div className="mensaje-confirmacion">
          {confirmed && attending === "no" && (
            <div>
              <h3>✅ ¡Gracias por confirmar!</h3>
            </div>
          )}
          {confirmed && attending === "si" && (
            <div>
              <h3>✅ ¡Gracias por confirmar! Nos vemos en la boda 🎉</h3>
              <h3>Su numero de mesa es:</h3>
              <label style={{ fontSize: "5rem", color: "rgb(217, 179, 82)" }}>
                #{numeroMesa}
              </label>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleConfirm}>
          <label className="formulario">¿Asistirás?</label>
          <Space wrap>
            <Select
              className="formulario"
              showSearch
              value={attending}
              onChange={handleChange}
              style={{ width: "6rem" }}
              placeholder="Selecciona una opción"
              options={[
                { value: "si", label: "Sí" },
                { value: "no", label: "No" },
              ]}
            />
          </Space>

          {attending === "si" && (
            <>
              <label>Personas a asistir (máx. {maxPersonas})</label>
              <input
                type="number"
                className="formulario"
                value={numPeople}
                style={{
                  width: "3rem",
                  height: "3rem",
                  border: "transparent",
                  borderRadius: "0.5rem",
                  background: "white",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
                onChange={(e) => {
                  let value = e.target.value;

                  // Permitir que el input se quede vacío
                  if (value === "") {
                    setNumPeople("");
                    return;
                  }

                  value = value.replace(/\D/, ""); // Evita caracteres no numéricos
                  value = Math.min(maxPersonas, Math.max(1, parseInt(value)));

                  setNumPeople(value);
                }}
                min={1}
                max={maxPersonas}
                required
              />
            </>
          )}

          <button
            type="submit"
            id="confirmar"
            onClick={handleSubmit}
            disabled={!attending}
          >
            Confirmar
          </button>
        </form>
      )}
      <Modal
        className="modalStyle"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        {confirmed && attending === "si" && (
          <div>
            <h2>¡Gracias por confirmar! Nos vemos en la boda 🎉</h2>
            <Lottie options={OkData} height={350} width={350} />
            <h2>Su numero de mesa es:</h2>
            <label style={{ fontSize: "7rem" }}>#{numeroMesa}</label>
          </div>
        )}
        {confirmed && attending === "no" && (
          <div>
            <h2>¡Gracias por confirmar!</h2>
            <Lottie options={OkData} height={350} width={350} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RSVPForm;
