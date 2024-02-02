import React from 'react';
import { useMyContext } from '../MyContext';
import '../../style/index.css';

const TankOutputValve = () => {
  const { oV1, oM1, oSV1, oMV1, stompClientRef } = useMyContext();

  const handleButtonClick = (valveId) => {
    if (stompClientRef.current) {
      stompClientRef.current.send('/app/request-data', {}, JSON.stringify({ valveId }));
    }
  };

  return (
    <div className="tankValveOutputContainer">
        <div className="tankValveIO">
      <div className="item">
        <p>밸브</p>
        <button className='valveButton' onClick={() => handleButtonClick(oV1)}>{oV1.current}</button>
      </div>
      <div className="item">
        <p>가스 이동</p>
        <button className='valveButton' onClick={() => handleButtonClick(oM1)}>{oM1.current}</button>
      </div>
    </div>
     <div className="tankValveIO">
         <div className="item">
         <p>배관 안전 밸브</p>
         <button className='valveButton' onClick={() => handleButtonClick(oSV1)}>{oSV1.current}</button>
       </div>
       <div className="item">
         <p>배관 수동 밸브</p>
         <button className='valveButton' onClick={() => handleButtonClick(oMV1)}>{oMV1.current}</button>
       </div>
     </div>
    </div>
  );
};

export default TankOutputValve;
