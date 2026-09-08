import { useState, useEffect } from 'react';

function LoveTimer() {
  const startDate = new Date('2026-06-23T00:00:00'); 

  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;

      if (diff < 0) return;

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(totalDays / 30); 
      const days = totalDays % 30; 
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timer-container">
      <h2>Já são...</h2>
      <div className="timer-grid">
        <div className="timer-box">
          <span>{timeLeft.months}</span>
          <small>Meses</small>
        </div>
        <div className="timer-box">
          <span>{timeLeft.days}</span>
          <small>Dias</small>
        </div>
        <div className="timer-box">
          <span>{timeLeft.hours}</span>
          <small>Horas</small>
        </div>
        <div className="timer-box">
          <span>{timeLeft.minutes}</span>
          <small>Min</small>
        </div>
        <div className="timer-box">
          <span>{timeLeft.seconds}</span>
          <small>Seg</small>
        </div>
      </div>
    </div>
  );
}

export default LoveTimer;