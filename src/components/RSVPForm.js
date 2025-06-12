import React, { useState, useEffect } from "react";
import { Modal, Select, Space, message } from "antd";
import Lottie from "react-lottie";
import Send from "../static/Send-Animated.json";

const RSVPForm = () => {
  const OkData = {
    loop: true,
    autoplay: true,
    animationData: Send,
  };

  const params = new URLSearchParams(window.location.search);
  const maxPersonas = parseInt(params.get("maxPersonas")) || 5;

  const [attending, setAttending] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const enviado = localStorage.getItem("confirmacionEnviada");
    if (enviado === "true") {
      setConfirmed(true);
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
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get("invitado") || "Invitado";

    const formData = {
      nombre: guestName,
      asistencia: attending,
      personas: numPeople,
      niños: numChildren,
    };

    await fetch("https://prod-159.westus.logic.azure.com/your-endpoint", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    localStorage.setItem("confirmacionEnviada", "true");
    message.success("✅ Confirmación enviada! 🎉");
  };

  return (
    <div className="rsvp-form asistencia">
      {!confirmed && <h2>Confirmar Asistencia</h2>}
      {confirmed ? (
        <div className="mensaje-confirmacion">
          <h3>✅ ¡Gracias por confirmar! Nos vemos en la boda 🎉</h3>
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

              <label>Cuantos son niños?</label>
              <input
                type="number"
                className="formulario"
                value={numChildren}
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

                  // Permitir que el usuario borre el campo antes de ingresar un nuevo valor
                  if (value === "") {
                    setNumChildren("");
                    return;
                  }

                  value = value.replace(/\D/, ""); // Evita caracteres no numéricos
                  value = Math.min(
                    numPeople,
                    Math.max(0, parseInt(value) || 0)
                  ); // Ajusta dentro del rango

                  setNumChildren(value);
                }}
                min={0}
                max={numPeople}
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
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>¡Gracias por confirmar! Nos vemos en la boda 🎉</p>
        <Lottie options={OkData} height={350} width={350} />
      </Modal>
    </div>
  );
};

export default RSVPForm;
