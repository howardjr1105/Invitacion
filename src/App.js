import "./App.css";
import CountdownTimer from "./CountdownTimer";

function App() {
  const fechaObjetivo = "2025-09-01T15:00:00";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <CountdownTimer targetDate={fechaObjetivo} />
    </div>
  );
}

export default App;
