import React, { useState } from "react";

const RSVPForm = () => {
  const [nombre, setNombre] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const handleConfirm = () => {
    setConfirmado(true);
  };

  return (
    <div>
      <h2>Confirmar Asistencia</h2>
      {!confirmado ? (
        <>
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button onClick={handleConfirm}>Confirmar</button>
        </>
      ) : (
        <p>✅ ¡Gracias por confirmar, {nombre}! Nos vemos en la boda 🎉</p>
      )}
    </div>
  );
};

export default RSVPForm;
