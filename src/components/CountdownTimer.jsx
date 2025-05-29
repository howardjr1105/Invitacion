import React, { useEffect, useState, useCallback } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = useCallback(() => {
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
  }, [targetDate]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formatTime = (num) => num?.toString().padStart(2, "0");

  const units = [
    { label: "DÍAS", value: timeLeft.días },
    { label: "HORAS", value: timeLeft.horas },
    { label: "MINUTOS", value: timeLeft.minutos },
    { label: "SEGUNDOS", value: timeLeft.segundos },
  ];

  return (
    <div className="container-fluid bg-dark py-3">
      <div className="row justify-content-center g-2">
        {units.map(({ label, value }) => (
          <div key={label} className="col-3">
            <div className="bg-secondary text-white text-center rounded p-2">
              <div className="fs-5 fw-bold">{formatTime(value)}</div>
              <div className="text-uppercase small">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
