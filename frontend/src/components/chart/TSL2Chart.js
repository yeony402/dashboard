import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../Context';
import { useCustomEffect } from '../hook/UseUpdate';

const TSL2Chart = () => {
    const {tSL2List} = useMyContext();
    const returnTSL2Chart = useRef(null);

    useEffect(() => {
        returnTSL2Chart.current = new Chart(returnTSL2Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '액면계2',
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
            if(returnTSL2Chart.current) {
                returnTSL2Chart.current.destroy();
            }
        };
    }, []);

  
    useCustomEffect(returnTSL2Chart.current, tSL2List);

  return <canvas className='weatherCanvas' ref={returnTSL2Chart} />;

};


export default TSL2Chart;