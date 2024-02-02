import React, { useState, useEffect, useRef } from 'react'; //version5
import Chart from 'chart.js/auto';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// import DashboardHeader from './DashboardHeader';
// import Sidebar from './Sidebar';
// import DashboardFooter from './DashboardFooter';
// import BackgroundImage from './piece/BackgroundImage';
import BackgroundImage from './piece/BackgroundImage';
import '../style/index.css';

const WebSocketExample = () => {
  const [chart, setChart] = useState(null);
  const [timeList, setTimeList] = useState([]); // 현재 시간 데이터
  const [tempList, setTempList] = useState([]); // 변화하는 값을 상태로 관리
  const chartContainer = useRef(null);
  let index = useRef(9);;


useEffect(() => {
  const newSocket = new SockJS('http://localhost:8080/ws-dash');
  const stompClient = Stomp.over(newSocket);

  stompClient.connect({}, () => {
    console.log('연결되었습니다.');


      stompClient.subscribe('/topic/num-data', (res) => {
        const dataMap = JSON.parse(res.body); // 서버에서 받은 데이터

        const singleData1 = dataMap.singleData1;
        const singleData2 = dataMap.singleData2;
        const singleData3 = dataMap.singleData3;
        const singleData4 = dataMap.singleData4;
        const singleData5 = dataMap.singleData5;
        const singleData6 = dataMap.singleData6;
        const singleData7 = dataMap.singleData7;
        const singleData8 = dataMap.singleData8;
        const singleData9 = dataMap.singleData9;

        const multiData2_1 = dataMap.multiData2_1;
        const multiData2_2 = dataMap.multiData2_2;
        const multiData2_3 = dataMap.multiData2_3;
        const multiData2_4 = dataMap.multiData2_4;

        const multiData3 = dataMap.multiData3;

        setTimeList((prevTimeList) => [...prevTimeList, singleData1.time.slice(11)]);
        setTempList((prevDataList) => [...prevDataList, Number(singleData1.field1)]); //값을 데이터리스트에 추가

        console.log(singleData1);



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
      maintainAspectRatio: false,
    plugins: {
      // legend: {
      //   position: 'top',
      // },
      title: {
        display: true,
        text: '시간에 따른 온도 변화1',
      },
    },
    },
  });

  setChart(newChart);
  

  return () => {
    if (stompClient) {
      stompClient.disconnect();
      console.log("연결이 끊겼습니다.");
    }
    if(newChart) {
      newChart.destroy(); // 컴포넌트가 언마운트되면 차트를 파괴합니다.
    }
  };
}, []);


useEffect(() => {
  // 이 부분에서 실시간 데이터 업데이트를 수신하고 차트를 업데이트합니다.
  if (chart) {
    const currentIndex = chart.data.labels.length;
    let x = timeList[currentIndex];
    let y = tempList[currentIndex];

    if (currentIndex >= 10) {
        index.current++
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();

        x = timeList[index.current];
        y = tempList[index.current];
    }
    console.log(currentIndex);
    console.log(index);


    // 새로운 데이터와 레이블을 차트에 추가합니다.
    chart.data.labels.push(x);
    chart.data.datasets[0].data.push(y);

    // 차트를 업데이트합니다.
    chart.update();
}

}, [tempList, timeList]);


  return (
    <div>
      <BackgroundImage chartContainer={chartContainer} />
    </div>
  );
};

export default WebSocketExample;
