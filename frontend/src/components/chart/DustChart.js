import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const DustChart = () => {
    const {timeList, dustList} = useMyContext();
    const returnDustChart = useRef(null);

    useEffect(() => {
        returnDustChart.current = new Chart(returnDustChart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '미세먼지',
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
            if(returnDustChart.current) {
                returnDustChart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnDustChart.current) {
      const currentIndex = returnDustChart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = dustList[dustList.length-1];
  
      if (currentIndex >= 10) {
        returnDustChart.current.data.labels.shift();
        returnDustChart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      returnDustChart.current.data.labels.push(x);
      returnDustChart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      returnDustChart.current.update();
  }
  
  }, [timeList, dustList]);

  return <canvas className='weatherCanvas' ref={returnDustChart} />;

};


export default DustChart;