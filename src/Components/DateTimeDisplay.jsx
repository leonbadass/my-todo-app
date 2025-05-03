import React, { useEffect, useState } from 'react';

const DateTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const options = {
    weekday:{weekday: 'long'},
    date :{ day: 'numeric' },
    year: { month: 'long', year: 'numeric' },
    time: {hour: '2-digit', minute: '2-digit',second: '2-digit', timeZoneName: 'short'}

  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="dateZone-inner">
      <p className='weekday'>{currentTime.toLocaleDateString('en-US',options.weekday)}</p>
      <p className='date'>{currentTime.toLocaleDateString('en-US',options.date)}</p>
      <p className='year'>{currentTime.toLocaleDateString('en-US',options.year)}</p>
      <div className='time'><p>{currentTime.toLocaleTimeString('en-US', options.time)}</p></div>
    </div>
  );
};

export default DateTimeDisplay;
