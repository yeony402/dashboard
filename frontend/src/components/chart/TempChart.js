import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../Context';
import { useCustomEffect } from '../hook/UseUpdate';

const TempChart = () => {
    const {tempList} = useMyContext();
    const returntempChart = useRef(null);

    useEffect(() => {
        returntempChart.current = new Chart(returntempChart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '대기 온도',
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
          if(returntempChart.current) {
            returntempChart.current.destroy();
          }
        };
    }, []);


    useCustomEffect(returntempChart.current, tempList);

  return <canvas className='weatherCanvas' ref={returntempChart} />;

};


export default TempChart;