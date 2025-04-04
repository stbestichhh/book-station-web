import { useEffect, useRef, useState } from 'react';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export const useStopwatch = () => {
  const startTimeRef = useRef(0);
  const [time, setTime] = useState(0);
  const [mark, setMark] = useState(false);

  useEffect(() => {
    let interval: number;
    if (mark) {
      interval = setInterval(
        () => setTime(Date.now() - startTimeRef.current),
        1
      );
    }

    return () => clearInterval(interval);
  }, [mark]);

  const hours = Math.floor(time / HOUR);
  const minutes = Math.floor((time / MINUTE) % 60);
  const seconds = Math.floor((time / SECOND) % 60);
  const milliseconds = time % SECOND;

  const toggleStopwatch = () => {
    if (!mark) {
      startTimeRef.current = Date.now();
    }
    setMark(!mark);
  };

  const start = () => {
    startTimeRef.current = Date.now();
    setMark(true);
  };

  const stop = () => {
    setMark(false);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return {
    time,
    hours,
    minutes,
    seconds,
    milliseconds,
    toggleStopwatch,
    reset,
    mark,
    start,
    stop,
  };
};
