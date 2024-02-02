import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const TSVL2Chart = () => {
    const {timeList, tSVL2List} = useMyContext();
    const returnTSVL2Chart = useRef(null);

    useEffect(() => {
        returnTSVL2Chart.current = new Chart(returnTSVL2Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '진공2',
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
            if(returnTSVL2Chart.current) {
                returnTSVL2Chart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnTSVL2Chart.current) {
      const currentIndex = returnTSVL2Chart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = tSVL2List[tSVL2List.length-1];
  
      if (currentIndex >= 10) {
        returnTSVL2Chart.current.data.labels.shift();
        returnTSVL2Chart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      returnTSVL2Chart.current.data.labels.push(x);
      returnTSVL2Chart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      returnTSVL2Chart.current.update();
  }
  
  }, [timeList, tSVL2List]);

  return <canvas className='weatherCanvas' ref={returnTSVL2Chart} />;

};


export default TSVL2Chart;