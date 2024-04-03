import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../Context';
import { useCustomEffect } from '../hook/UseUpdate';

const HumidityChart = () => {
    const {humidityList} = useMyContext();
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

  
    useCustomEffect(returnHumidityChart.current, humidityList);
  
  return <canvas className='weatherCanvas' ref={returnHumidityChart} />;

};


export default HumidityChart;