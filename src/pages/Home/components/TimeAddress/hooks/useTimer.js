import { useState, useEffect } from 'react';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function useTimer(deadline, interval = SECOND) {
  const [timespan, setTimespan] = useState(new Date(deadline) - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimespan(_timespan => _timespan - interval);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  /* If the initial deadline value changes */
  useEffect(() => {
    setTimespan(new Date(deadline) - Date.now());
  }, [deadline]);

  return [
    { title: 'Day', time: Math.floor(timespan / DAY) },
    { title: 'Hour', time: Math.floor((timespan / HOUR) % 24) },
    { title: 'Minute', time: Math.floor((timespan / MINUTE) % 60) },
    { title: 'second', time: Math.floor((timespan / SECOND) % 60) },
  ];
}
