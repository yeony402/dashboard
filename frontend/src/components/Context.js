import React, { createContext, useContext, useState, useRef } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  // const [client, setClient] = useState(null);
  // 기상 데이터
    const [timeList, setTimeList] = useState([]); // 시간 차트
    const [tempList, setTempList] = useState([]); // 대기 온도 차트
    const [humidityList, setHumidityList] = useState([]); // 습도 차트
    const [weatherList, setWeatherList] = useState([]); // 날씨 상태 차트
    const [windList, setWindList] = useState([]); // 바람 차트
    const [rainfallList, setRainfallList] = useState([]); // 강수량 차트   tSVL1, tSVL2, tSP1, tSP2, oT1, oGS1
    const [ultraDustList, setUltraDustList] = useState([]); // 초미세먼지 차트
    const [dustList, setDustList] = useState([]); // 미세먼지 차트
  // 탱크 입력 데이터
    const [iT1List, setIT1List] = useState([]); // 가스 온도 차트
    const [iGS1List, setIGS1List] = useState([]); // 가스 주입 속도 차트
  // 탱크 데이터
    const [tSL1List, setTSL1List] = useState([]); // 액면계 차트
    const [tSL2List, setTSL2List] = useState([]); // 액면계2 차트
    const [tST1List, setTST1List] = useState([]); // 온도 차트
    const [tST2List, setTST2List] = useState([]); // 온도2 차트
    const [tST3List, setTST3List] = useState([]); // 온도3 차트
    const [tSVL1List, setTSVL1List] = useState([]); // 진공 차트
    const [tSVL2List, setTSVL2List] = useState([]); // 진공2 차트
    const [tSP1List, setTSP1List] = useState([]); // 압력 차트
    const [tSP2List, setTSP2List] = useState([]); // 압력2 차트
  // 탱크 출력 데이터
    const [oT1List, setOT1List] = useState([]); // 가스 온도 차트
    const [oGS1List, setOGS1List] = useState([]); // 가스 배출 속도 차트

    const currentTemp = useRef(0); // 현재 대기 온도
    const currentHumidity  = useRef(0); // 현재 습도
    const currentWeather = useRef(0); // 현재 날씨 상태
    const currentWind  = useRef(0); // 현재 바람
    const currentRainfall  = useRef(0); // 현재 강수량
    const currentUltraDust  = useRef(0); // 현재 초미세먼지
    const currentDust = useRef(0); // 현재 미세먼지
    const currentIT1 = useRef(0); // 현재 가스 온도
    const currentIGS1 = useRef(0); // 현재 가스 주입 속도
    const currentTSL1 = useRef(0); // 현재 액면계
    const currentTSL2 = useRef(0); // 현재 액면계2
    const currentTST1 = useRef(0); // 현재 온도
    const currentTST2 = useRef(0); // 현재 온도2
    const currentTST3 = useRef(0); // 현재 온도3
    const currentTSVL1 = useRef(0); // 현재 진공
    const currentTSVL2 = useRef(0); // 현재 진공2
    const currentTSP1 = useRef(0); // 현재 압력
    const currentTSP2  = useRef(0); // 현재 압력2
    const currentOT1  = useRef(0); // 현재 가스 온도
    const currentOGS1  = useRef(0); // 현재 가스 배출 속도

    const iV1 = useRef(null);
    const iM1 = useRef(null);
    const iSV1 = useRef(null);
    const iMV1 = useRef(null);
    const tSSV1 = useRef(null);
    const tSSV2 = useRef(null);
    const tSMV1 = useRef(null);
    const tSMV2 = useRef(null);
    const oV1 = useRef(null);
    const oM1 = useRef(null);
    const oSV1 = useRef(null);
    const oMV1 = useRef(null);
    // iV1 iM1 iSV1 iMV1 tSSV1 tSSV2 tSMV1 tSMV2 oV1 oM1 oSV1 oMV1
    const stompClientRef = useRef(null);

  const contextValue = {
    stompClientRef,
    timeList, setTimeList, tempList, setTempList, humidityList, setHumidityList, weatherList, setWeatherList, windList, 
    setWindList, rainfallList, setRainfallList, ultraDustList, setUltraDustList, dustList, setDustList, iT1List, setIT1List,
    iGS1List, setIGS1List, tSL1List, setTSL1List, tSL2List, setTSL2List, tST1List, setTST1List, tST2List, setTST2List,
    tST3List, setTST3List, tSVL1List, setTSVL1List, tSVL2List, setTSVL2List, tSP1List, setTSP1List, tSP2List, setTSP2List,
    oT1List, setOT1List, oGS1List, setOGS1List,

    currentTemp, currentHumidity, currentWeather, currentWind, currentRainfall, currentUltraDust, currentDust, currentIT1, 
    currentIGS1, currentTSL1, currentTSL2, currentTST1, currentTST2, currentTST3, currentTSVL1, currentTSVL2, currentTSP1,
    currentTSP2, currentOT1, currentOGS1,
    iV1, iM1, iSV1, iMV1, tSSV1, tSSV2, tSMV1, tSMV2, oV1, oM1, oSV1, oMV1
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
