import React, { useState, useEffect, useRef } from 'react'; //version4
import Chart from 'chart.js/auto';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import DashboardFooter from './DashboardFooter';
import '../style/index.css';

const RealtimeCanvasChart = () => {
    const [socket, setSocket] = useState(null);
    const [chart, setChart] = useState(null);
    const [timeList, setTimeList] = useState(''); // 현재 시간 데이터
    const [dataList, setDataList] = useState([]); // 변화하는 값을 상태로 관리
    const chartContainer = useRef(null);
    let index = 9;


  useEffect(() => {
    const newSocket = new SockJS('http://localhost:8080/ws-dash');
    const stompClient = Stomp.over(newSocket);

    stompClient.connect({}, () => {
      console.log('연결되었습니다.');
        setSocket(stompClient);

        stompClient.subscribe('/topic/temp', (res) => {
          const receivedData = res.body; // 서버에서 받은 데이터
          console.log(receivedData);

          const [time, value] = receivedData.split(','); // ','로 value와 time을 추출
          setDataList((prevDataList) => [...prevDataList, Number(value)]); //값을 데이터리스트에 추가
          setTimeList((prevTimeList) => [...prevTimeList, time]);

      });
    }, (error) => {
      console.error('Websocket Error: ', error); // 웹소켓 연결 오류 처리
    });

    const ctx = chartContainer.current.getContext('2d');

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [], // X 축의 레이블은 초기에 빈 배열로 시작합니다.
        datasets: [
          {
            label: 'Real-time Data',
            data: [], // 실시간 데이터는 초기에 빈 배열로 시작합니다.
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '시간에 따른 온도 변화1',
        },
      },
      },
    });

    setChart(newChart);

    return () => {
      newChart.destroy(); // 컴포넌트가 언마운트되면 차트를 파괴합니다.
    };
  }, []);

  useEffect(() => {
    // 이 부분에서 실시간 데이터 업데이트를 수신하고 차트를 업데이트합니다.
    // 예를 들어, WebSocket을 통해 데이터를 수신하여 실시간으로 차트를 업데이트하는 로직을 추가하세요.

    // 아래는 예시 코드입니다. 이 코드는 주기적으로 랜덤한 값을 생성하여 데이터를 업데이트합니다.
    const updateChartData = () => {
        if (chart) {
            const currentIndex = chart.data.labels.length;
            let x = timeList[currentIndex];
            let y = dataList[currentIndex];
    
            if (currentIndex >= 10) {
                index++
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
                console.log(index);

                x = timeList[index];
                y = dataList[index];
            }
    
            // 새로운 데이터와 레이블을 차트에 추가합니다.
            chart.data.labels.push(x);
            chart.data.datasets[0].data.push(y);
    
            // 차트를 업데이트합니다.
            chart.update();
        }

    };

    const interval = setInterval(updateChartData, 2000); // 2초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트가 언마운트되면 인터벌을 정리합니다.
  }, [chart]);


  useEffect(() => {
    return () => {
         if (socket) {
             socket.disconnect();
             console.log("연결이 끊겼습니다.");
         }
     };
 }, [socket]);





  return (
    <div class="dashboard">
    <DashboardHeader />
    <div class="content">
      <Sidebar />
      <MainContent chartContainer={chartContainer} />
    </div>
    <DashboardFooter />
  </div>
  );
};

export default RealtimeCanvasChart;
