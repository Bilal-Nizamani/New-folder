"use client";
import React, { useEffect, useState } from "react";

const Counter = ({ gameEnd, arrayOfWrittenWords, newMatchStarting }) => {
  const [speedTestTimer, setSpeedTestTimer] = useState(0);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    if (!gameEnd) {
      setTimeout(() => {
        setSpeedTestTimer((count) => count + 1);
      }, 1000);
    } else {
    }
  }, [gameEnd, speedTestTimer]);

  useEffect(() => {
    if (arrayOfWrittenWords.length > 1)
      setWpm(
        parseInt(
          ((arrayOfWrittenWords.length - 1) / parseInt(speedTestTimer)) * 60
        )
      );
    if (newMatchStarting) {
      setSpeedTestTimer(0);
      setWpm(0);
    }
  }, [newMatchStarting, speedTestTimer, arrayOfWrittenWords]);

  return (
    <div>
      <span>WPM: {wpm}</span>
      <div> Timer: {speedTestTimer}s </div>
    </div>
  );
};

export default Counter;
