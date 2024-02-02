import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const TempChart = () => {
    const {timeList, tempList} = useMyContext();
    const tempChart = useRef(null);

    useEffect(() => {
        tempChart.current = new Chart(tempChart.current.getContext('2d'), {
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
          if(tempChart.current) {
            tempChart.current.destroy();
          }
        };
    }, []);

  
  useEffect(() => {
    // 이 부분에서 실시간 데이터 업데이트를 수신하고 차트를 업데이트합니다.
    if (tempChart.current) {
      const currentIndex = tempChart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = tempList[tempList.length-1];
  
      if (currentIndex >= 10) {
          tempChart.current.data.labels.shift();
          tempChart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      tempChart.current.data.labels.push(x);
      tempChart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      tempChart.current.update();
  }
  
  }, [timeList, tempList]);

  return <canvas className='weatherCanvas' ref={tempChart} />;

};


export default TempChart;