import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const UltraDustChart = () => {
    const {timeList, ultraDustList} = useMyContext();
    const returnUltraDustChart = useRef(null);

    useEffect(() => {
        returnUltraDustChart.current = new Chart(returnUltraDustChart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '초미세먼지',
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
            if(returnUltraDustChart.current) {
                returnUltraDustChart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnUltraDustChart.current) {
      const currentIndex = returnUltraDustChart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = ultraDustList[ultraDustList.length-1];
  
      if (currentIndex >= 10) {
        returnUltraDustChart.current.data.labels.shift();
        returnUltraDustChart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      returnUltraDustChart.current.data.labels.push(x);
      returnUltraDustChart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      returnUltraDustChart.current.update();
  }
  
  }, [timeList, ultraDustList]);

  return <canvas className='weatherCanvas' ref={returnUltraDustChart} />;

};


export default UltraDustChart;