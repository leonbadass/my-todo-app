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
    <div className="flex flex-col items-center justify-center gap-4 px-4 bg-purple-500 rounded-bl-lg ">
      <p className='text-2xl text-purple-900 font-bold'>{currentTime.toLocaleDateString('en-US',options.weekday)}</p>
      <p className='text-4xl text-purple-900 font-bold'>{currentTime.toLocaleDateString('en-US',options.date)}</p>
      <p className='text-2xl text-purple-900 font-bold'>{currentTime.toLocaleDateString('en-US',options.year)}</p>
      <div className='bg-black text-purple-400 text-lg font-bold py-2 px-1 rounded-lg text-opacity-50 bg-opacity-70'><p>{currentTime.toLocaleTimeString('en-US', options.time)}</p></div>
    </div>
  );
};

export default DateTimeDisplay;
