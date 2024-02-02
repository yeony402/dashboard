
import React, { useState, useEffect } from 'react';  //version1
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {RealTimeScale, StreamingPlugin} from 'chartjs-plugin-streaming';
import { Line } from 'react-chartjs-2';

function App() {
    const [socket, setSocket] = useState(null);
    const [timeList, setTimeList] = useState(''); // 현재 시간 데이터
    const [dataList, setDataList] = useState([]); // 변화하는 값을 상태로 관리

    ChartJS.register(
      StreamingPlugin,
      RealTimeScale,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    useEffect(() => {
      const newSocket = new SockJS('http://localhost:8080/ws');
      const stompClient = Stomp.over(newSocket);

      stompClient.connect({}, () => {
        console.log('연결되었습니다.');
          setSocket(stompClient);

          stompClient.subscribe('/dashboard/data', (res) => {
            const receivedData = res.body; // 서버에서 받은 데이터
            console.log("데이터 확인: "+receivedData);

            const [time, value] = receivedData.split(','); // ','로 value와 time을 추출
            // setDataList((prevDataList) => [...prevDataList, Number(value)]); //값을 데이터리스트에 추가
            // // setTimeList((prevTimeList) => [...prevTimeList, time]);
            // setTimeList(time);
            // setDataList(value);

        });
      }, (error) => {
        console.error('Websocket Error: ', error); // 웹소켓 연결 오류 처리
      });
  }, []); // 처음 한번만 실행


  console.log("현재 시간: "+ timeList);
  console.log("현재 데이터: "+ dataList);
  
    
    const options = {
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
      maintainAspectRatio: false,
    };
    

    const data = {
        labels: [],
        datasets: [
          {
            label: '온도',
            data: [],//초기 비어있는 데이터
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
    

    useEffect(() => {
       return () => {
            if (socket) {
                socket.disconnect();
                console.log("연결이 끊겼습니다.");
            }
        };
    }, [socket])
    

    return (
      <div style={{ width: '1000px', height: '500px', margin: '100px', paddingLeft: '100px' }}> {/* 차트 컨테이너의 스타일을 조절하여 크기를 제어합니다. */}
        <Line options={options} data={data} />
      </div>
    );
}

export default App;



// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
//   maintainAspectRatio: false,
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: '온도',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     }
//   ],
// };

// export function App() {
//   return (
//     <div style={{ width: '1000px', height: '500px', margin: '100px', paddingLeft: '100px' }}> {/* 차트 컨테이너의 스타일을 조절하여 크기를 제어합니다. */}
//       <Line options={options} data={data} />
//     </div>
//   );
// }
