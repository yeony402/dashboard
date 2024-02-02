import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const WindChart = () => {
    const {timeList, windList} = useMyContext();
    const returnWindChart = useRef(null);

    useEffect(() => {
        returnWindChart.current = new Chart(returnWindChart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '바람',
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
            if(returnWindChart.current) {
                returnWindChart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnWindChart.current) {
      const currentIndex = returnWindChart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = windList[windList.length-1];
  
      if (currentIndex >= 10) {
        returnWindChart.current.data.labels.shift();
        returnWindChart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      returnWindChart.current.data.labels.push(x);
      returnWindChart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      returnWindChart.current.update();
  }
  
  }, [timeList, windList]);

  return <canvas className='weatherCanvas' ref={returnWindChart} />;

};


export default WindChart;