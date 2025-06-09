import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import Header from "./components/Header";
import Map from "./components/Map";
import RSVPForm from "./components/RSVPForm";
import Separador from "./components/Separador";
import Carino from "./components/carino";

function App() {
  const fechaObjetivo = "2025-06-28T18:00:00";

  return (
    <>
      <Header />
      <Separador />
      <Map />
      <Separador />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <CountdownTimer targetDate={fechaObjetivo} />
      </div>
      <Separador />
      <Carino />
      <Separador />

      <RSVPForm />
    </>
  );
}

export default App;
