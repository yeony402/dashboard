import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../Context';
import { useCustomEffect } from '../hook/UseUpdate';

const TSP2Chart = () => {
    const {tSP2List} = useMyContext();
    const returnTSP2Chart = useRef(null);

    useEffect(() => {
        returnTSP2Chart.current = new Chart(returnTSP2Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '탱크 내 압력2',
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
            if(returnTSP2Chart.current) {
                returnTSP2Chart.current.destroy();
            }
        };
    }, []);

  
    useCustomEffect(returnTSP2Chart.current, tSP2List);

  return <canvas className='weatherCanvas' ref={returnTSP2Chart} />;

};


export default TSP2Chart;