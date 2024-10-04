export const getTimeRemaining = (endtime) => {
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
      seconds,
    };
  };
  
  export const initializeClock = (deadline, setTimeRemaining) => {
    const updateClock = () => {
      const t = getTimeRemaining(deadline);
      setTimeRemaining({
        days: t.days,
        hours: ('0' + t.hours).slice(-2),
        minutes: ('0' + t.minutes).slice(-2),
        seconds: ('0' + t.seconds).slice(-2),
      });
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    };
  
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  
    return () => clearInterval(timeinterval); // Hàm cleanup
  };
  