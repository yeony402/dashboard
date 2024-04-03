import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../Context';
import { useCustomEffect } from '../hook/UseUpdate';

const TST3Chart = () => {
    const {tST3List} = useMyContext();
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

  
    useCustomEffect(returnTST3Chart.current, tST3List);

  return <canvas className='weatherCanvas' ref={returnTST3Chart} />;

};


export default TST3Chart;