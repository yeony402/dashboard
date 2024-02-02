import React, { useState } from 'react';
import '../../style/index.css';
import { useMyContext } from '../MyContext';
import TempChart from '../chart/TempChart';
import HumidityChart from '../chart/HumidityChart';
import WeatherChart from '../chart/WeatherChart';
import WindChart from '../chart/WindChart';
import RainfallChart from '../chart/RainfallChart';
import UltraDustChart from '../chart/UltraDustChart';
import DustChart from '../chart/DustChart';


const MainContent = () => {
  const {currentTemp, currentHumidity, currentWeather, currentWind, currentRainfall, currentUltraDust, currentDust} = useMyContext();
  const [chartType, setChartType] = useState('temp');

  const handleTemperatureButtonClick = () => {
    setChartType('temp');
  };

  const handleHumidityButtonClick = () => {
    setChartType('humidity');
  };

  const handleWeatherButtonClick = () => {
    setChartType('weather');
  };

  const handleWindButtonClick = () => {
    setChartType('wind');
  };

  const handleRainfallButtonClick = () => {
    setChartType('rainfall');
  };

  const handleUltraDustButtonClick = () => {
    setChartType('ultraDust');
  };

  const handleDustButtonClick = () => {
    setChartType('dust');
  };

  const renderChart = () => {
    if (chartType === 'temp') {
      return <TempChart />;
    } else if (chartType === 'humidity') {
      return <HumidityChart />;
    } else if (chartType === 'weather') {
      return <WeatherChart />;
    } else if (chartType === 'wind') {
      return <WindChart />;
    } else if (chartType === 'rainfall') {
      return <RainfallChart />;
    } else if (chartType === 'ultraDust') {
      return <UltraDustChart />;
    } else if (chartType === 'dust') {
      return <DustChart />;
    } 
    return null;
  };

  return (
    <main className="main-content">
      <div className="weatherButtonContainer">
          <button className="weatherButton buttonLine" onClick={handleTemperatureButtonClick}>대기온도<br />{currentTemp.current}</button>
          <button className="weatherButton buttonLine" onClick={handleHumidityButtonClick}>습도<br />{currentHumidity.current}</button>
          <button className="weatherButton buttonLine" onClick={handleWeatherButtonClick}>날씨상태<br />{currentWeather.current}</button>
          <button className="weatherButton buttonLine" onClick={handleWindButtonClick}>바람<br />{currentWind.current}</button>
        </div>
        <div className="weatherButtonContainer">
          <button className="weatherButton buttonLine" onClick={handleRainfallButtonClick}>강수량<br />{currentRainfall.current}</button>
          <button className="weatherButton buttonLine" onClick={handleUltraDustButtonClick}>초미세먼지<br />{currentUltraDust.current}</button>
          <button className="weatherButton buttonLine" onClick={handleDustButtonClick}>미세먼지<br />{currentDust.current}</button>
        </div>
         <section>
           <div className="chartBox">
                <div className="container">
                    <div className="containerBody">
                        {renderChart()}
                    </div>
                </div>
            </div>
         </section>
       </main>
  );
};

export default MainContent;