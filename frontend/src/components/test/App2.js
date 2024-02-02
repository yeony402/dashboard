
import React, { useState, useEffect } from 'react';  //version2
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
            console.log("value 값: "+ value);
            console.log("time 값: "+ time);
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
      scales: {
        x: {
          type: 'realtime',
          // time: {
          //   unit: 'second', // 눈금 간격을 하루 단위로 설정
          //   stepSize: 1,
          // },
          realtime: {
            onRefresh: chart => {
              chart.data.datasets.forEach(dataset => {
                dataset.data.push({
                  // x: timeList,
                  // y: dataList[dataList.length-1],
                  x: Date.now(),
                  y: 50,
                });
              });
            },
            delay: 2000, // 2초마다 차트 갱신
          },
          // ticks: {
          //   callback: function(value, index, values) {
          //     // x 축 표시 형식을 변경하는 콜백 함수
          //     // value는 x 축에 표시될 값, index는 해당 값의 인덱스, values는 전체 값 배열
          //     // x 축의 표시 형식을 원하는 방식으로 수정하여 반환
          //     // const currentIndex = index + 1;
          //     return timeList; // 예시로 인덱스를 라벨로 표시
          //   }
          // }
        },
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
      maintainAspectRatio: false,
    };
    

    const data = {
        datasets: [
          {
            label: '온도',
            data: [],//초기 비어있는 데이터
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
    



    //소켓이 변경되거나 페이지가 언마운트되면 연결을 끊어 소켓 이벤트 리스너의 중복 등록이나 페이지 이동시 불필요한 소켓 이벤트 감지를 막
    // 출처: https://obstinate-developer.tistory.com/entry/React-socket-io-client-적용-방법 [집요한 개발자:티스토리]
    useEffect(() => {
       return () => {
            if (socket) {
                socket.disconnect();
                console.log("연결이 끊겼습니다.");
            }
        };
    }, [socket, setSocket])
    

    return (
      <div style={{ width: '1000px', height: '500px', margin: '100px', paddingLeft: '100px' }}> {/* 차트 컨테이너의 스타일을 조절하여 크기를 제어합니다. */}

      {/* <p>데이터: {timeList}</p> */}
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
