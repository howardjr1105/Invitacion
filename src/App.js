import "./App.css";
import React, { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import Header from "./components/Header";
import Map from "./components/Map";
import RSVPForm from "./components/RSVPForm";
import Separador from "./components/Separador";
import Carino from "./components/carino";
import BackgroundMusic from "./components/BackgroundMusic";
import WelcomeScreen from "./components/WelcomeScreen.js";

function App() {
  const [entered, setEntered] = useState(false);
  const fechaObjetivo = "2025-06-28T18:00:00";

  const handleEnter = () => {
    setEntered(true);
  };
  return (
    <div>
      <BackgroundMusic />
      {!entered ? (
        <WelcomeScreen onEnter={handleEnter} />
      ) : (
        <div>
          <Header />
          <Separador />
          <Map />
          <Separador />
          <h1 className="cont">Faltan</h1>
          <div className="min-h-screen flex items-center justify-center bg-white">
            <CountdownTimer targetDate={fechaObjetivo} />
          </div>
          <Separador />
          <Carino />
          <Separador />
          <RSVPForm />
        </div>
      )}
    </div>
  );
}

export default App;
