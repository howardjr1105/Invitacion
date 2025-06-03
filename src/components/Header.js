import React from "react";

const Header = () => {
  // Obtener el nombre del invitado desde la URL
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("invitado") || "Estimado Invitado";

  return (
    <header className="header">
      <h1>Nuestra</h1>
      <h1>Boda</h1>
      <h3>
        Más vale dos que uno, porque obtienen más fruto de su esfuerzo, si caen,
        el uno, levanta al otro
      </h3>
      <h5>Eclesiastés 4:9-12</h5>
      <h1>Alex Obando</h1>
      <h1>&</h1>
      <h1>Doriam Ortega</h1>
      <h3>
        Todos los dias son maravillosos, y nos gustaria que nos acompañen en el
        mas especial para nosotros
      </h3>
      <h2>{guestName}</h2>
      <h5>¡Te invitamos a celebrar este día tan especial! 💍</h5>
    </header>
  );
};

export default Header;
