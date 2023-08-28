// // import React, { useState, useEffect } from 'react';

// // const Timer = () => {
// //   const [timeElapsed, setTimeElapsed] = useState(0);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setTimeElapsed(prevTimeElapsed => prevTimeElapsed + 1);
// //     }, 1000); // Update the time every second

// //     return () => {
// //       clearInterval(interval); // Cleanup: Clear the interval when the component unmounts
// //     };
// //   }, []);

// //   const formatTime = (seconds) => {
// //     const hours = Math.floor(seconds / 3600);
// //     const remainingSeconds = seconds % 3600;
// //     const minutes = Math.floor(remainingSeconds / 60);
// //     const remainingMinutes = remainingSeconds % 60;
// //     const formattedHours = hours < 10 ? `0${hours}` : hours; // Add leading zero for single-digit hours
// //     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero for single-digit minutes
// //     const formattedRemainingMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes; // Add leading zero for single-digit remaining minutes
// //     return `${formattedHours}:${formattedMinutes}:${formattedRemainingMinutes}`;
// //   };

// //   return (
// //     <div>
// //       <p>Time Elapsed: {formatTime(timeElapsed)}</p>
// //     </div>
// //   );
// // };

// // export default Timer;

// // Timer.js
// import React, { useState, useEffect } from 'react';

// const Timer = () => {
//   const [timeElapsed, setTimeElapsed] = useState(0);

//   useEffect(() => {
//     const storedTimeElapsed = parseInt(localStorage.getItem('timeElapsed')) || 0;

//     setTimeElapsed(storedTimeElapsed);

//     const interval = setInterval(() => {
//       setTimeElapsed(prevTimeElapsed => {
//         const newTimeElapsed = prevTimeElapsed + 1;
//         localStorage.setItem('timeElapsed', newTimeElapsed.toString());
//         return newTimeElapsed;
//       });
//     }, 1000); // Update the time every second

//     return () => {
//       clearInterval(interval); // Cleanup: Clear the interval when the component unmounts
//     };
//   }, []);

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const remainingSeconds = seconds % 3600;
//     const minutes = Math.floor(remainingSeconds / 60);
//     const remainingMinutes = remainingSeconds % 60;
//     const formattedHours = hours < 10 ? `0${hours}` : hours; // Add leading zero for single-digit hours
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero for single-digit minutes
//     const formattedRemainingMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes; // Add leading zero for single-digit remaining minutes
//     return `${formattedHours}:${formattedMinutes}:${formattedRemainingMinutes}`;
//   };

//   return (
//     <div>
//       <p>Time Elapsed: {formatTime(timeElapsed)}</p>
//     </div>
//   );
// };

// export default Timer;

import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const shouldResume = localStorage.getItem('shouldResumeTimer') === 'true';
    const storedTimeElapsed = parseInt(localStorage.getItem('timeElapsed')) || 0;

    setTimeElapsed(storedTimeElapsed);

    if (shouldResume) {
      const interval = setInterval(() => {
        setTimeElapsed(prevTimeElapsed => {
          const newTimeElapsed = prevTimeElapsed + 1;
          localStorage.setItem('timeElapsed', newTimeElapsed.toString());
          return newTimeElapsed;
        });
      }, 1000); // Update the time every second

      return () => {
        clearInterval(interval); // Cleanup: Clear the interval when the component unmounts
      };
    }
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingMinutes = remainingSeconds % 60;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedRemainingMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    return `${formattedHours}:${formattedMinutes}:${formattedRemainingMinutes}`;
  };

  return (
    <div>
      <p>Time Elapsed: {formatTime(timeElapsed)}</p>
    </div>
  );
};

export default Timer;



    
