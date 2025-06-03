import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import Header from "./components/Header";
import Map from "./components/Map";
import RSVPForm from "./components/RSVPForm";

function App() {
  const fechaObjetivo = "2025-09-01T15:00:00";

  return (
    <>
      <Header />
      <Map />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <CountdownTimer targetDate={fechaObjetivo} />
      </div>

      <RSVPForm />
    </>
  );
}

export default App;
