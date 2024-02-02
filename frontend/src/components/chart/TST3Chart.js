import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const TST3Chart = () => {
    const {timeList, tST3List} = useMyContext();
    const returnTST3Chart = useRef(null);

    useEffect(() => {
        returnTST3Chart.current = new Chart(returnTST3Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '온도3',
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
            if(returnTST3Chart.current) {
                returnTST3Chart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnTST3Chart.current) {
      const currentIndex = returnTST3Chart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = tST3List[tST3List.length-1];
  
      if (currentIndex >= 10) {
        returnTST3Chart.current.data.labels.shift();
        returnTST3Chart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      returnTST3Chart.current.data.labels.push(x);
      returnTST3Chart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      returnTST3Chart.current.update();
  }
  
  }, [timeList, tST3List]);

  return <canvas className='weatherCanvas' ref={returnTST3Chart} />;

};


export default TST3Chart;