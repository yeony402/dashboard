import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../Context';
import { useCustomEffect } from '../hook/UseUpdate';

const IGS1Chart = () => {
    const {iGS1List} = useMyContext();
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

  
    useCustomEffect(returnIGS1Chart.current, iGS1List);

  return <canvas className='inputTankCanvas' ref={returnIGS1Chart} />;

};


export default IGS1Chart;