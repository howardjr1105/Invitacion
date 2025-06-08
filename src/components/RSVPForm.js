import React, { useState } from "react";
import { Select, Space } from "antd";
import { InputNumber } from "antd";

const RSVPForm = () => {
  const [attending, setAttending] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();
    setConfirmed(true);
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

    alert("Confirmación enviada!");
  };

  return (
    <div className="rsvp-form">
      <h2>Confirmar Asistencia</h2>

      {!confirmed ? (
        <form onSubmit={handleConfirm}>
          <label>¿Asistirás?</label>
          <Space wrap>
            <Select
              value={attending}
              onChange={handleChange}
              style={{ width: "4rem" }}
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
                type="number"
                value={numPeople}
                onChange={(e) =>
                  setNumPeople(
                    Math.min(5, Math.max(1, parseInt(e.target.value)))
                  )
                }
                min="1"
                max="5"
                required
              />

              <label>Número de niños</label>
              <InputNumber
                type="number"
                value={numChildren}
                onChange={(e) =>
                  setNumChildren(
                    Math.min(numPeople, Math.max(0, parseInt(e.target.value)))
                  )
                }
                min="0"
                max={numPeople}
                required
              />
            </>
          )}

          <button type="submit" onClick={handleSubmit}>
            Confirmar
          </button>
        </form>
      ) : (
        <p>✅ ¡Gracias por confirmar! Nos vemos en la boda 🎉</p>
      )}
    </div>
  );
};

export default RSVPForm;
