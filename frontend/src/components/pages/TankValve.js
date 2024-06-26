import React from 'react';
import { useMyContext } from '../Context';
import '../../style/index.css';

const TankValve = () => {
  const { tSSV1, tSSV2, tSMV1, tSMV2, stompClientRef} = useMyContext();
  let refKey = {};


  const handleButtonClick = (valveId) => {
    if (stompClientRef.current) {
      if (valveId === "tSSV1") {
        refKey = { tSSV1 : tSSV1.current };
      } else if (valveId === "tSSV2") {
        refKey = { tSSV2 : tSSV2.current };
      } else if (valveId === "tSMV1") {
        refKey = { tSMV1 : tSMV1.current };
      } else if (valveId === "tSMV2") {
        refKey = { tSMV2 : tSMV2.current };
      }
      stompClientRef.current.send('/app/request-data', {}, JSON.stringify({refKey}));
    }
  };

  return (
    <div className="tankValveContainer">
      <div className="item">
        <p>탱크 안전 밸브</p>
        <button className='valveButton' onClick={() => handleButtonClick("tSSV1")}>{tSSV1.current}</button>
      </div>
      <div className="item">
        <p>탱크 안전 밸브2</p>
        <button className='valveButton' onClick={() => handleButtonClick("tSSV2")}>{tSSV2.current}</button>
      </div>
      <div className="item">
        <p>탱크 수동 밸브</p>
        <button className='valveButton' onClick={() => handleButtonClick("tSMV1")}>{tSMV1.current}</button>
      </div>
      <div className="item">
        <p>탱크 수동 밸브2</p>
        <button className='valveButton' onClick={() => handleButtonClick("tSMV2")}>{tSMV2.current}</button>
      </div>
    </div>
  );
};

export default TankValve;
