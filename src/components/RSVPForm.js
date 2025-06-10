import React, { useState, useEffect } from "react";
import { Modal, Select, Space, message } from "antd";
import { InputNumber } from "antd";

const RSVPForm = () => {
  const [attending, setAttending] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Verificar si ya se envió el formulario antes de renderizar
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

    await fetch(
      "https://prod-159.westus.logic.azure.com:443/workflows/536661fb74ca43909baacaf85076ebc5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=99P0hzPzCgSHoPa7aYRhovGuRcgQJyhBbfOA7w1qsmM",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    );

    // Guardar en localStorage que el usuario ha confirmado
    localStorage.setItem("confirmacionEnviada", "true");

    message.success("✅ Confirmación enviada! 🎉");
  };

  return (
    <div className="rsvp-form">
      {!confirmed && <h2>Confirmar Asistencia</h2>}{" "}
      {/* Ahora solo se muestra si no se envió */}
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
                { value: "yes", label: "Sí" },
                { value: "no", label: "No" },
              ]}
            />
          </Space>

          {attending === "yes" && (
            <>
              <label>Número de personas (máx. 5)</label>
              <InputNumber
                className="formulario"
                type="number"
                value={numPeople}
                style={{ width: "3rem" }}
                onChange={(value) =>
                  setNumPeople(Math.min(5, Math.max(1, value)))
                }
                min="1"
                max="5"
                required
              />

              <label>Número de niños</label>
              <InputNumber
                className="formulario"
                type="number"
                value={numChildren}
                style={{ width: "3rem" }}
                onChange={(value) =>
                  setNumChildren(Math.min(numPeople, Math.max(0, value)))
                }
                min="0"
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
        className=""
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>✅ ¡Gracias por confirmar! Nos vemos en la boda 🎉</p>
      </Modal>
    </div>
  );
};

export default RSVPForm;
