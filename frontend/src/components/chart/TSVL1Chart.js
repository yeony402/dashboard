import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useMyContext } from '../Context';
import { useCustomEffect } from '../hook/UseUpdate';

const TSVL1Chart = () => {
    const {tSVL1List} = useMyContext();
    const returnTSVL1Chart = useRef(null);

    useEffect(() => {
        returnTSVL1Chart.current = new Chart(returnTSVL1Chart.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
            datasets: [
              {
                label: '진공',
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
            if(returnTSVL1Chart.current) {
                returnTSVL1Chart.current.destroy();
            }
        };
    }, []);

  
    useCustomEffect(returnTSVL1Chart.current, tSVL1List);

  return <canvas className='weatherCanvas' ref={returnTSVL1Chart} />;

};


export default TSVL1Chart;