import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getTimerClass = () => {
    if (timeLeft <= 10) return 'timer danger';
    if (timeLeft <= 30) return 'timer warning';
    return 'timer';
  };

  return (
    <div className={getTimerClass()}>
      Time left: {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;