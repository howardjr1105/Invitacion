import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import Header from "./components/Header";
import Map from "./components/Map";

function App() {
  const fechaObjetivo = "2025-09-01T15:00:00";

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <CountdownTimer targetDate={fechaObjetivo} />
      </div>
      <Map />
    </>
  );
}

export default App;
