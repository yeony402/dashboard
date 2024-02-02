import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const TSP2Chart = () => {
    const {timeList, tSP2List} = useMyContext();
    const returnTSP2Chart = useRef(null);

    useEffect(() => {
        returnTSP2Chart.current = new Chart(returnTSP2Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '탱크 내 압력2',
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
            if(returnTSP2Chart.current) {
                returnTSP2Chart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnTSP2Chart.current) {
      const currentIndex = returnTSP2Chart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = tSP2List[tSP2List.length-1];
  
      if (currentIndex >= 10) {
        returnTSP2Chart.current.data.labels.shift();
        returnTSP2Chart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      returnTSP2Chart.current.data.labels.push(x);
      returnTSP2Chart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      returnTSP2Chart.current.update();
  }
  
  }, [timeList, tSP2List]);

  return <canvas className='weatherCanvas' ref={returnTSP2Chart} />;

};


export default TSP2Chart;