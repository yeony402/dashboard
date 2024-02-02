import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const WeatherChart = () => {
    const {timeList, weatherList} = useMyContext();
    const returnWeatherChart = useRef(null);

    useEffect(() => {
        returnWeatherChart.current = new Chart(returnWeatherChart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '날씨 상태',
                data: [], // 실시간 데이터는 초기에 빈 배열로 시작합니다.
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: '기상 관측',
              color: 'rgb(230, 230, 230)',
            },
          },
          },
        });
      
        return () => {
            if(returnWeatherChart.current) {
                returnWeatherChart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnWeatherChart.current) {
      const currentIndex = returnWeatherChart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = weatherList[weatherList.length-1];
  
      if (currentIndex >= 10) {
        returnWeatherChart.current.data.labels.shift();
        returnWeatherChart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      returnWeatherChart.current.data.labels.push(x);
      returnWeatherChart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      returnWeatherChart.current.update();
  }
  
  }, [timeList, weatherList]);

  return <canvas className='weatherCanvas' ref={returnWeatherChart} />;

};


export default WeatherChart;