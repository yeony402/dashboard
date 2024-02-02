import React, { useState } from 'react';
import '../../style/index.css';
import { useMyContext } from '../MyContext';
import IT1Chart from '../chart/IT1Chart';
import IGS1Chart from '../chart/IGS1Chart';


const TankInputData = () => {
  const {currentIT1, currentIGS1} = useMyContext();
  const [chartType, setChartType] = useState('iT1');

  const handleIT1ButtonClick = () => {
    setChartType('iT1');
  };

  const handleIGS1ButtonClick = () => {
    console.log("속도 눌렸습니다.");
    setChartType('iGS1');
  };

  const renderChart = () => {
    if (chartType === 'iT1') {
      return <IT1Chart />;
    } else if (chartType === 'iGS1') {
      return <IGS1Chart />;
    }
    return null;
  };

  return (
    <div className="inoutput-content">
      <div className="inputTankButtonContainer">
          <button className="inputTankButton buttonLine" onClick={handleIT1ButtonClick}>IT1<br />{currentIT1.current}</button>
          <button className="inputTankButton buttonLine" onClick={handleIGS1ButtonClick}>IGS1<br />{currentIGS1.current}</button>
        </div>
         <section>
           <div className="inputTankChartBox">
                <div className="inputTankContainer">
                    <div className="inputTankContainerBody">
                        {renderChart()}
                    </div>
                </div>
            </div>
         </section>
       </div>
  );
};

export default TankInputData;