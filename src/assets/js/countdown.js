import React, { useState, useEffect } from 'react';

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days,
    hours,
    minutes,
    seconds
  };
}

function CountdownClock({ endtime }) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endtime));

  useEffect(() => {
    function updateClock() {
      setTimeRemaining(getTimeRemaining(endtime));
    }

    const timeinterval = setInterval(updateClock, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timeinterval);
  }, [endtime]);

  return (
    <div id="clockdiv">
      <div>
        <span className="days">{timeRemaining.days}</span> days
      </div>
      <div>
        <span className="hours">{('0' + timeRemaining.hours).slice(-2)}</span> hours
      </div>
      <div>
        <span className="minutes">{('0' + timeRemaining.minutes).slice(-2)}</span> minutes
      </div>
      <div>
        <span className="seconds">{('0' + timeRemaining.seconds).slice(-2)}</span> seconds
      </div>
    </div>
  );
}

function App() {
  const deadline = new Date(Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <CountdownClock endtime={deadline} />
    </div>
  );
}

export default App;
