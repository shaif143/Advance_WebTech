import React from 'react';
import Timer from './Timer';


export default function Header(props) {
  return (
    <>
    
      <div className="justify-center items-center">
      <h3 className="text-5xl font-bold text-center" href="../provider/home">Emergency Helpline Management System</h3>
        <h1 className="font-bold text-center"><Timer /></h1>
      </div>
      
    </>
  );
}
