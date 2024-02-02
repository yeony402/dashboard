import React, { useState } from 'react';
import '../../style/index.css';
import { useMyContext } from '../MyContext';
import TSL1Chart from '../chart/TSL1Chart';
import TSL2Chart from '../chart/TSL2Chart';
import TST1Chart from '../chart/TST1Chart';
import TST2Chart from '../chart/TST2Chart';
import TST3Chart from '../chart/TST3Chart';
import TSVL1Chart from '../chart/TSVL1Chart';
import TSVL2Chart from '../chart/TSVL2Chart';
import TSP1Chart from '../chart/TSP1Chart';
import TSP2Chart from '../chart/TSP2Chart';


const TankInputData = () => {
  const {currentTSL1, currentTSL2, currentTST1, currentTST2, currentTST3, currentTSVL1, currentTSVL2, currentTSP1, currentTSP2} = useMyContext();
  const [chartType, setChartType] = useState('tSL1');

  const handleTSL1ButtonClick = () => {
    setChartType('tSL1');
  };

  const handleTSL2ButtonClick = () => {
    setChartType('tSL2');
  };

  const handleTST1ButtonClick = () => {
    setChartType('tST1');
  };

  const handleTST2ButtonClick = () => {
    setChartType('tST2');
  };

  const handleTST3ButtonClick = () => {
    setChartType('tST3');
  };

  const handleTSVL1ButtonClick = () => {
    setChartType('tSVL1');
  };

  const handleTSVL2ButtonClick = () => {
    setChartType('tSVL2');
  };

  const handleTSP1ButtonClick = () => {
    setChartType('tSP1');
  };

  const handleTSP2ButtonClick = () => {
    setChartType('tSP2');
  };

  const renderChart = () => {
    if (chartType === 'tSL1') {
      return <TSL1Chart />;
    } else if (chartType === 'tSL2') {
      return <TSL2Chart />;
    }  else if (chartType === 'tST1') {
        return <TST1Chart />;
    } else if (chartType === 'tST2') {
        return <TST2Chart />;
    } else if (chartType === 'tST3') {
        return <TST3Chart />;
    } else if (chartType === 'tSVL1') {
        return <TSVL1Chart />;
    } else if (chartType === 'tSVL2') {
        return <TSVL2Chart />;
    } else if (chartType === 'tSP1') {
        return <TSP1Chart />;
    } else if (chartType === 'tSP2') {
        return <TSP2Chart />;
    }
    return null;
  };

  return (
    <div className="tank-content">
      <div className="tankButtonContainer">
          <button className="tankButton buttonLine" onClick={handleTSL1ButtonClick}>TSL1<br />{currentTSL1.current}</button>
          <button className="tankButton buttonLine" onClick={handleTSL2ButtonClick}>TSL2<br />{currentTSL2.current}</button>
          <button className="tankButton buttonLine" onClick={handleTST1ButtonClick}>TST1<br />{currentTST1.current}</button>
        </div>
        <div className="tankButtonContainer">
          <button className="tankButton buttonLine" onClick={handleTST2ButtonClick}>TST2<br />{currentTST2.current}</button>
          <button className="tankButton buttonLine" onClick={handleTST3ButtonClick}>TST3<br />{currentTST3.current}</button>
          <button className="tankButton buttonLine" onClick={handleTSVL1ButtonClick}>TSVL1<br />{currentTSVL1.current}</button>
        </div>
        <div className="tankButtonContainer">
          <button className="tankButton buttonLine" onClick={handleTSVL2ButtonClick}>TSVL2<br />{currentTSVL2.current}</button>
          <button className="tankButton buttonLine" onClick={handleTSP1ButtonClick}>TSP1<br />{currentTSP1.current}</button>
          <button className="tankButton buttonLine" onClick={handleTSP2ButtonClick}>TSP2<br />{currentTSP2.current}</button>
        </div>
         <section>
           <div className="tankChartBox">
                <div className="tankContainer">
                    <div className="tankContainerBody">
                        {renderChart()}
                    </div>
                </div>
            </div>
         </section>
       </div>
  );
};

export default TankInputData;