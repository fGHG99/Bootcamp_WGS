import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <h2>Current Time</h2>
      <p>{time}</p>
    </div>
  );
};

