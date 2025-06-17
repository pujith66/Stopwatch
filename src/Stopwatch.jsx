import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEggTimer, setIsEggTimer] = useState(false);
  const timerRef = useRef(null);

  const formatTime = (ms) => {
    const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsEggTimer(false);
      const start = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - start);
      }, 10);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsEggTimer(false);
    clearInterval(timerRef.current);
    setTime(0);
  };

  const startEggTimer = () => {
    resetTimer();
    const countdownFrom = 10 * 60 * 1000; // 10 minutes
    setTime(countdownFrom);
    setIsEggTimer(true);
    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 10) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setTime(0);
          return 0;
        }
        return prev - 10;
      });
    }, 10);
  };

  useEffect(() => {
    if (!isRunning && isEggTimer && time === 0) {
      const audio = new Audio('/memphis-155671.mp3');
      audio.play();
    }
  }, [time, isRunning, isEggTimer]);

  return (
    <div id="total">
      <div className="container">
        <div className="timer-box">
          <h1>{formatTime(time)}</h1>
          <div className="buttons">
            <button onClick={startTimer}>START</button>
            <button onClick={resetTimer}>RESET</button>
            <button onClick={stopTimer}>STOP</button>
          </div>
        </div>

        <button className="egg-timer" onClick={startEggTimer}>Egg-Timer</button>
      </div>
    </div>
  );
}
