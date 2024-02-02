import React from 'react';
import { useMyContext } from '../MyContext';
import '../../style/index.css';


const TankInputValve = () => {
  const { iV1, iM1, iSV1, iMV1, stompClientRef } = useMyContext();


  const handleButtonClick = (valveId) => {
    if (stompClientRef.current) {
      stompClientRef.current.send('/app/request-data', {}, JSON.stringify({ valveId }));
    }
  };

  return (
    <div className="tankValveInputContainer">
        <div className="tankValveIO">
      <div className="item">
        <p>밸브</p>
        <button className='valveButton' onClick={() => handleButtonClick(iV1)}>{iV1.current}</button>
      </div>
      <div className="item">
        <p>가스 이동</p>
        <button className='valveButton' onClick={() => handleButtonClick(iM1)}>{iM1.current}</button>
      </div>
    </div>
     <div className="tankValveIO">
         <div className="item">
         <p>배관 안전 밸브</p>
         <button className='valveButton' onClick={() => handleButtonClick(iSV1)}>{iSV1.current}</button>
       </div>
       <div className="item">
         <p>배관 수동 밸브</p>
         <button className='valveButton' onClick={() => handleButtonClick(iMV1)}>{iMV1.current}</button>
       </div>
     </div>
    </div>
  );
};

export default TankInputValve;
