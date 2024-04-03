import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../Context';
import { useCustomEffect } from '../hook/UseUpdate';

const TST2Chart = () => {
    const {tST2List} = useMyContext();
    const returnTST2Chart = useRef(null);

    useEffect(() => {
        returnTST2Chart.current = new Chart(returnTST2Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '온도2',
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
            if(returnTST2Chart.current) {
                returnTST2Chart.current.destroy();
            }
        };
    }, []);

  
    useCustomEffect(returnTST2Chart.current, tST2List);

  return <canvas className='weatherCanvas' ref={returnTST2Chart} />;

};


export default TST2Chart;