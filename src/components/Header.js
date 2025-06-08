import React from "react";

const Header = () => {
  // Obtener el nombre del invitado desde la URL
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("invitado") || "Estimado Invitado";

  return (
    <header className="header">
      <h1>Nos casamos</h1>
      <h3>
        Más vale dos que uno, porque obtienen más fruto de su esfuerzo, si caen,
        el uno, levanta al otro
      </h3>
      <h5>Eclesiastés 4:9-12</h5>
      <h2>Alex Obando</h2>
      <h2>&</h2>
      <h2>Doriam Ortega</h2>
      <h3>
        Cada día es un regalo, pero este sera el más especial de todos. Nos
        encantaria que nos acompañes a celebrar la continuación de nuestra
        historia juntos.
      </h3>
      <h2>{guestName}</h2>
      <h3>
        Tu presencia hará a un más especial este capitulo de nuestras vidas
      </h3>
    </header>
  );
};

export default Header;
