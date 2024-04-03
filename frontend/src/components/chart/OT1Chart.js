import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../Context';
import { useCustomEffect } from '../hook/UseUpdate';

const OT1Chart = () => {
    const {oT1List} = useMyContext();
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

  
    useCustomEffect(returnOT1Chart.current, oT1List);

  return <canvas className='inputTankCanvas' ref={returnOT1Chart} />;

};


export default OT1Chart;