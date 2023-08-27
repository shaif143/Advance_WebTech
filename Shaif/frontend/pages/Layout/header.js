// import Timer from "./timer";

// export default function Header(props){


// return(

// <>
// <head>

    
// </head>

// <div className=" justify-center items-center">
//   <h1 className="text-6xl font-bold text-center">Emergency Helpline Management System</h1>
//   <h1 className="font-bold text-center"><Timer/></h1>
// </div>





// </>

// )

// }
// Header.js
import React from 'react';
import Timer from './Timer';

export default function Header(props) {
  return (
    <>
      <div className="justify-center items-center">
        <h1 className="text-6xl font-bold text-center">Emergency Helpline Management System</h1>
        <h1 className="font-bold text-center"><Timer /></h1>
      </div>
    </>
  );
}
