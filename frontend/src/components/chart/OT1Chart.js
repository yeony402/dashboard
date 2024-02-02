import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const OT1Chart = () => {
    const {timeList, oT1List} = useMyContext();
    const returnOT1Chart = useRef(null);

    useEffect(() => {
        returnOT1Chart.current = new Chart(returnOT1Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '가스 온도',
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
              text: '저장 탱크 출력단',
              color: 'rgb(230, 230, 230)',
            },
          },
          },
        });
      
        return () => {
            if(returnOT1Chart.current) {
                returnOT1Chart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnOT1Chart.current) {
      const currentIndex = returnOT1Chart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = oT1List[oT1List.length-1];
  
      if (currentIndex >= 10) {
        returnOT1Chart.current.data.labels.shift();
        returnOT1Chart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가합니다.
      returnOT1Chart.current.data.labels.push(x);
      returnOT1Chart.current.data.datasets[0].data.push(y);
  
      // 차트를 업데이트합니다.
      returnOT1Chart.current.update();
  }
  
  }, [timeList, oT1List]);

  return <canvas className='inputTankCanvas' ref={returnOT1Chart} />;

};


export default OT1Chart;