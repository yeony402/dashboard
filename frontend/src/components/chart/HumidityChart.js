import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const HumidityChart = () => {
    const {timeList, humidityList} = useMyContext();
    const returnHumidityChart = useRef(null);

    useEffect(() => {
        returnHumidityChart.current = new Chart(returnHumidityChart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작
            datasets: [
              {
                label: '습도',
                data: [], // 실시간 데이터는 초기에 빈 배열로 시작
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
            if(returnHumidityChart.current) {
                returnHumidityChart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    // 실시간 데이터 업데이트를 수신하고 차트를 업데이트
    if (returnHumidityChart.current) {
      const currentIndex = returnHumidityChart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = humidityList[humidityList.length-1];
  
      if (currentIndex >= 10) {
        returnHumidityChart.current.data.labels.shift();
        returnHumidityChart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가
      returnHumidityChart.current.data.labels.push(x);
      returnHumidityChart.current.data.datasets[0].data.push(y);
  
      // 차트 업데이트
      returnHumidityChart.current.update();
  }
  
  }, [timeList, humidityList]);

  return <canvas className='weatherCanvas' ref={returnHumidityChart} />;

};


export default HumidityChart;