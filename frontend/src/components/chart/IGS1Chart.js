import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../MyContext';

const IGS1Chart = () => {
    const {timeList, iGS1List} = useMyContext();
    const returnIGS1Chart = useRef(null);

    useEffect(() => {
        returnIGS1Chart.current = new Chart(returnIGS1Chart.current.getContext('2d'), {
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
              text: '저장 탱크 입력단',
              color: 'rgb(230, 230, 230)',
            },
          },
          },
        });
      
        return () => {
            if(returnIGS1Chart.current) {
                returnIGS1Chart.current.destroy();
            }
        };
    }, []);

  
  useEffect(() => {
    if (returnIGS1Chart.current) {
      const currentIndex = returnIGS1Chart.current.data.labels.length;
      let x = timeList[timeList.length-1];
      let y = iGS1List[iGS1List.length-1];
  
      if (currentIndex >= 10) {
        returnIGS1Chart.current.data.labels.shift();
        returnIGS1Chart.current.data.datasets[0].data.shift();
      }
  
      // 새로운 데이터와 레이블을 차트에 추가
      returnIGS1Chart.current.data.labels.push(x);
      returnIGS1Chart.current.data.datasets[0].data.push(y);
  
      // 차트 업데이트
      returnIGS1Chart.current.update();
  }
  
  }, [timeList, iGS1List]);

  return <canvas className='inputTankCanvas' ref={returnIGS1Chart} />;

};


export default IGS1Chart;