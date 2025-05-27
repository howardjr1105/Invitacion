import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (num) => num.toString().padStart(2, "0");

  return (
    <div className="text-center p-4 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Cuenta regresiva</h2>
      <div className="flex justify-center gap-4 text-xl font-mono">
        <div>
          <span className="block text-4xl">
            {formatTime(timeLeft.días || 0)}
          </span>
          <span>Días</span>
        </div>
        <div>
          <span className="block text-4xl">
            {formatTime(timeLeft.horas || 0)}
          </span>
          <span>Horas</span>
        </div>
        <div>
          <span className="block text-4xl">
            {formatTime(timeLeft.minutos || 0)}
          </span>
          <span>Min</span>
        </div>
        <div>
          <span className="block text-4xl">
            {formatTime(timeLeft.segundos || 0)}
          </span>
          <span>Seg</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
