import React, { useState } from "react";

const WelcomeScreen = ({ onEnter }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    setFadeOut(true); // Activa la animación de salida
    setTimeout(() => {
      onEnter(); // Cambia a la siguiente pantalla después de la animación
    }, 1500); // Ajusta el tiempo según la duración de la animación
  };

  return (
    <div className={`welcome-container ${fadeOut ? "fade-out" : ""}`}>
      <h1>Bienvenido</h1>
      <p>Haz clic en el botón para entrar al evento y activar el sonido 🎶</p>
      <button className="enter-button" onClick={handleClick}>
        Entrar
      </button>
    </div>
  );
};

export default WelcomeScreen;
