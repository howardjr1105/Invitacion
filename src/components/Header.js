import React from "react";

const Header = () => {
  // Obtener el nombre del invitado desde la URL
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("invitado") || "Estimado Invitado";

  return (
    <header className="header">
      <h2>Para, {guestName}!</h2>
      <h1>¡Te invitamos a celebrar este día tan especial! 💍</h1>
      <p>Alex & Doriam - 01 de septiembre de 2025</p>
    </header>
  );
};

export default Header;
