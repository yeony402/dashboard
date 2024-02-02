import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const IT1Chart = () => {
    const {timeList, iT1List} = useMyContext();
    const returnIT1Chart = useRef(null);

    useEffect(() => {
        returnIT1Chart.current = new Chart(returnIT1Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작
            datasets: [
              {
                label: '가스 온도',
                data: [], // 실시간 데이터는 초기에 빈 배열로 시작
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
              text: '저장 탱크 입력단',
              color: 'rgb(230, 230, 230)',
            },
          },
          },
        });
      
        return () => {
            if(returnIT1Chart.current) {
                returnIT1Chart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnIT1Chart.current) {
      const currentIndex = returnIT1Chart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = iT1List[iT1List.length-1];
  
      if (currentIndex >= 10) {
        returnIT1Chart.current.data.labels.shift();
        returnIT1Chart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가
      returnIT1Chart.current.data.labels.push(x);
      returnIT1Chart.current.data.datasets[0].data.push(y);
  
      // 차트 업데이트
      returnIT1Chart.current.update();
  }
  
  }, [timeList, iT1List]);

  return <canvas className='inputTankCanvas' ref={returnIT1Chart} />;

};


export default IT1Chart;