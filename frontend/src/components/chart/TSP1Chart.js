import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const TSP1Chart = () => {
    const {timeList, tSP1List} = useMyContext();
    const returnTSP1Chart = useRef(null);

    useEffect(() => {
        returnTSP1Chart.current = new Chart(returnTSP1Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '탱크 내 압력',
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
              text: '저장 탱크단',
              color: 'rgb(230, 230, 230)',
            },
          },
          },
        });
      
        return () => {
            if(returnTSP1Chart.current) {
                returnTSP1Chart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnTSP1Chart.current) {
      const currentIndex = returnTSP1Chart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = tSP1List[tSP1List.length-1];
  
      if (currentIndex >= 10) {
        returnTSP1Chart.current.data.labels.shift();
        returnTSP1Chart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      returnTSP1Chart.current.data.labels.push(x);
      returnTSP1Chart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      returnTSP1Chart.current.update();
  }
  
  }, [timeList, tSP1List]);

  return <canvas className='weatherCanvas' ref={returnTSP1Chart} />;

};


export default TSP1Chart;