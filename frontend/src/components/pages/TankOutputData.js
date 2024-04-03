import React, { useState } from 'react';
import '../../style/index.css';
import { useMyContext } from '../Context';
import OT1Chart from '../chart/OT1Chart';
import OGS1Chart from '../chart/OGS1Chart';


const TankOutputData = () => {
  const {currentOT1, currentOGS1} = useMyContext();
  const [chartType, setChartType] = useState('oT1');

  const handleOT1ButtonClick = () => {
    setChartType('oT1');
  };

  const handleOGS1ButtonClick = () => {
    setChartType('oGS1');
  };

  const renderChart = () => {
    if (chartType === 'oT1') {
      return <OT1Chart />;
    } else if (chartType === 'oGS1') {
        return <OGS1Chart />;
      } 
    return null;
  };

  return (
    <main className="inoutput-content">
      <div className="inputTankButtonContainer">
          <button className="inputTankButton buttonLine" onClick={handleOT1ButtonClick}>OT1<br />{currentOT1.current}</button>
          <button className="inputTankButton buttonLine" onClick={handleOGS1ButtonClick}>OGS1<br />{currentOGS1.current}</button>
        </div>
         <section>
           <div className="outputTankChartBox">
                <div className="inputTankContainer">
                    <div className="inputTankContainerBody">
                        {renderChart()}
                    </div>
                </div>
            </div>
         </section>
       </main>
  );
};

export default TankOutputData;