import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const OGS1Chart = () => {
    const {timeList, oGS1List} = useMyContext();
    const returnOGS1Chart = useRef(null);

    useEffect(() => {
        returnOGS1Chart.current = new Chart(returnOGS1Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작
            datasets: [
              {
                label: '가스 주입 속도',
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
              text: '저장 탱크 출력단',
              color: 'rgb(230, 230, 230)',
            },
          },
          },
        });
      
        return () => {
            if(returnOGS1Chart.current) {
                returnOGS1Chart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnOGS1Chart.current) {
      const currentIndex = returnOGS1Chart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = oGS1List[oGS1List.length-1];
  
      if (currentIndex >= 10) {
        returnOGS1Chart.current.data.labels.shift();
        returnOGS1Chart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가
      returnOGS1Chart.current.data.labels.push(x);
      returnOGS1Chart.current.data.datasets[0].data.push(y);
  
      // 차트 업데이트
      returnOGS1Chart.current.update();
  }
  
  }, [timeList, oGS1List]);

  return <canvas className='inputTankCanvas' ref={returnOGS1Chart} />;

};


export default OGS1Chart;