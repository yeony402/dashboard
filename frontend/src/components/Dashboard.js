import React, { useEffect } from 'react'; //version5
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import BackgroundImage from './pages/BackgroundImage';
import { MyProvider, useMyContext } from './Context';
import '../style/index.css';

const WebSocketExample = () => {
  const { stompClientRef, setTimeList, setTempList, setHumidityList, setWeatherList, setWindList, setRainfallList, setUltraDustList, setDustList,
    setIT1List, setIGS1List, setTSL1List, setTSL2List, setTST1List, setTST2List, setTST3List, setTSVL1List, setTSVL2List, setTSP1List, 
    setTSP2List, setOT1List, setOGS1List,
    currentTemp, currentHumidity, currentWeather, currentWind, currentRainfall, currentUltraDust, currentDust, currentIT1, currentIGS1,
    currentTSL1, currentTSL2, currentTST1, currentTST2, currentTST3, currentTSVL1, currentTSVL2, currentTSP1, currentTSP2, currentOT1, currentOGS1,
    iV1, iM1, iSV1, iMV1, tSSV1, tSSV2, tSMV1, tSMV2, oV1, oM1, oSV1, oMV1
    } = useMyContext();

useEffect(() => {
  const newSocket = new SockJS('http://localhost:8080/ws-dash');
  const stompClient = Stomp.over(newSocket);
  stompClientRef.current = stompClient;  // useRef를 사용하여 참조 설정

  stompClient.connect({}, () => {
    console.log('연결되었습니다.');

    stompClient.subscribe('/topic/current-data', (res) => {
        const initData = JSON.parse(res.body); // 서버에서 받은 데이터

        setTimeList((prevTimeList) => [...prevTimeList, initData.time]);
        setTempList((prevDataList) => [...prevDataList, initData.temp]);
        setHumidityList((prevDataList) => [...prevDataList, initData.humidity]);
        setWeatherList((prevDataList) => [...prevDataList, initData.weather]);
        setWindList((prevDataList) => [...prevDataList, initData.wind]);
        setRainfallList((prevDataList) => [...prevDataList, initData.rainfall]);
        setUltraDustList((prevDataList) => [...prevDataList, initData.ultraDust]);
        setDustList((prevDataList) => [...prevDataList, initData.dust]);
        setIT1List((prevDataList) => [...prevDataList, initData.iT1]);
        setIGS1List((prevDataList) => [...prevDataList, initData.iGS1]);

        setTSL1List((prevDataList) => [...prevDataList, initData.tSL1]);
        setTSL2List((prevDataList) => [...prevDataList, initData.tSL2]);
        setTST1List((prevDataList) => [...prevDataList, initData.tST1]);
        setTST2List((prevDataList) => [...prevDataList, initData.tST2]);
        setTST3List((prevDataList) => [...prevDataList, initData.tST3]);
        setTSVL1List((prevDataList) => [...prevDataList, initData.tSVL1]);
        setTSVL2List((prevDataList) => [...prevDataList, initData.tSVL2]);
        setTSP1List((prevDataList) => [...prevDataList, initData.tSP1]); 
        setTSP2List((prevDataList) => [...prevDataList, initData.tSP2]);

        setOT1List((prevDataList) => [...prevDataList, initData.oT1]);
        setOGS1List((prevDataList) => [...prevDataList, initData.oGS1]);
        currentTemp.current = initData.temp;
        currentHumidity.current = initData.humidity;
        currentWeather.current = initData.weather;
        currentWind.current = initData.wind;
        currentRainfall.current = initData.rainfall;
        currentUltraDust.current = initData.ultraDust;
        currentDust.current = initData.dust;

        currentIT1.current = initData.iT1;
        currentIGS1.current = initData.iGS1;

        currentTSL1.current = initData.tSL1;
        currentTSL2.current = initData.tSL2;
        currentTST1.current = initData.tST1;
        currentTST2.current = initData.tST2;
        currentTST3.current = initData.tST3;
        currentTSVL1.current = initData.tSVL1;
        currentTSVL2.current = initData.tSVL2;
        currentTSP1.current = initData.tSP1;
        currentTSP2.current = initData.tSP2;

        currentOT1.current = initData.oT1;
        currentOGS1.current = initData.oGS1;

        iV1.current = initData.iV1;
        iM1.current = initData.iM1;
        iSV1.current = initData.iSV1;
        iMV1.current = initData.iMV1;
        tSSV1.current = initData.tSSV1;
        tSSV2.current = initData.tSSV2;
        tSMV1.current = initData.tSMV1;
        tSMV2.current = initData.tSMV2;
        oV1.current = initData.oV1;
        oM1.current = initData.oM1;
        oSV1.current = initData.oSV1;
        oMV1.current = initData.oMV1;

    });
  }, (error) => {
    console.error('Websocket Error: ', error); // 웹소켓 연결 오류 처리
  });

  return () => {
    if (stompClientRef.current) {
      stompClientRef.current.disconnect();
      console.log("연결이 끊겼습니다.");
    }
  };
}, []);


  return (
      <div>
      <BackgroundImage />
    </div>
  );
};


const App = () => {
  return (
    <MyProvider>
      <WebSocketExample />
    </MyProvider>
  );
};

export default App;
