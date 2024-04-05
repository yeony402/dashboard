🔎프로젝트 소개 
==============
2024/01/02 ~ 2024/01/18  

스마트 수소에너지 안전 체계 구축을 위해 실시간 모니터링 시스템을 개발했습니다.  
가톨릭관동대학교에서 빅데이터 기반 스마트 수소에너지 안전 체계 구축에 대한 연구 과제를 진행하는데 안전인프라 기술 개발에 대한 연구 내용 중 '향후 발생할 수 있는 이상상태를 예방하고 진단할 수 있는 모니터링 시스템' 자료를 위한 외주를 맡게 되었습니다.  

<img width="80%" alt="포폴용 대시보드 캡처본" src="https://github.com/yeony402/dashboard/assets/44489399/54f87ba5-4c0a-497a-8c10-10126efceb9f">  

  
  
## ⚒️기술 스택  

### **backend**  

- springboot 3.2.1  
- java 17.0.10  
- websocket  
  
### **frontend**  

- react 18.2
- node 20.10.0
- javascript
- stompjs 2.3.3
- sockjs-client 1.6.1
- chart.js 3.9  


  
## 아키텍처 및 구조   
<img alt="image" src="https://github.com/yeony402/dashboard/assets/44489399/18e34296-610f-4ce0-8f79-79f96e216344" width="80%" height="">  



## 프로젝트 구조  
### SpringBoot

<img width="238" alt="스크린샷 2024-02-26 14 17 20" src="https://github.com/yeony402/dashboard/assets/44489399/491954a9-593e-4b11-83f9-5b736572e5a9">  

- config : WebSocket configuration 관리
- web
    - controller : 클라이언트와 서버 간의 양방향 통신을 관리 및 처리
    - dto : payload로 요청한 json 데이터를 문자열로 변환

  
### React
<img width="238" alt="image" src="https://github.com/yeony402/dashboard/assets/44489399/02c8ace7-27e5-45ff-93f2-66c3a0162bbf">  

- assets : 이미지와 같은 정적 자원 관리
- components
    - chart : 수신된 차트 데이터를 처리하고 UI를 렌더링하는데 필요한 차트 데이터 업데이트
    - hook : 여러 컴포넌트에서 재사용되는 커스텀 훅 관리
    - pages : 데이터를 시각적으로 표시하고, 사용자의 입력을 처리하는 UI 컴포넌트 관리
- style : css 파일 관리



## 프로젝트 진행하면서 학습한 내용 
[리액트 Hooks](https://velog.io/@yeony402/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9B%85)  

[Docker](https://velog.io/@yeony402/%EB%8F%84%EC%BB%A4-%EC%A0%95%EB%A6%AC)  

[websocket]()   

  
## 향후 계획  
현재 프로젝트의 대시보드는 데이터베이스 없이 임의 데이터로 구성된 차트로 나타내고 있습니다.  
연구 과제를 계속 진행하게 되면 실제와 유사한 데이터를 가진 데이터베이스를 연동해서 이상 수치에 대한 경고 및 그래프 변화, 일부 수소에너지 공정 제어 기능을 구체화 할 계획입니다.
