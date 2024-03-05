# 🔎프로젝트 소개 및 목적  
2024/01/02 ~ 2024/01/18  
스마트 수소에너지 안전 체계 구축을 위해 모니터링 시스템을 개발했습니다.  
가톨릭관동대학교에서 빅데이터 기반 스마트 수소에너지 안전 체계 구축에 대한 연구 과제를 진행하는데 안전인프라 기술 개발에 대한 연구 내용 중  
'향후 발생할 수 있는 이상상태를 예방하고 진단할 수 있는 모니터링 시스템' 자료를 위한 외주를 맡게 되었습니다.  



      
  
# ⚒️기술 스택  
backend  
springboot 3.2.1  
java 17.0.10  
websocket  
  
frontend  
react 18.2  
node 20.10.0  
javascript  
stompjs 2.3.3  
sockjs-client 1.6.1  
chart.js 3.9  
  
# 아키텍처 및 구조  
프로젝트의 전반적인 아키텍처와 구조를 그림이나 다이어그램과 함께 설명합니다.  
<img width="863" alt="image" src="https://github.com/yeony402/dashboard/assets/44489399/18e34296-610f-4ce0-8f79-79f96e216344">


# 프로젝트 구조  
springboot  | react  

<img width="299" alt="스크린샷 2024-02-26 14 17 20" src="https://github.com/yeony402/dashboard/assets/44489399/491954a9-593e-4b11-83f9-5b736572e5a9"> | <img width="285" height="399" alt="image" src="https://github.com/yeony402/dashboard/assets/44489399/d9bb04f9-adb7-468b-9298-d673532a0b32">



# 기능 설명  
서버에서 랜덤 값으로 생성되는 실시간 데이터를 클라이언트에서 선 그래프로 나타내며 제어가 필요한 동작은 현재 데이터와 함께 서버에 요청하는 실시간 대시보드 입니다.

기술적 도전  
javascript, websocket, docker  

문제 해결 과정  


프로젝트 진행하면서 학습한 내용 
useeffect, usestate, useref
websocket
docker


마주친 에러와 조치 내용  
  
# 향후 계획  
현재 프로젝트의 대시보드는 데이터베이스 없이 임의 데이터로 구성된 차트로 나타내고 있습니다.  
연구 과제를 계속 진행하게 되면 실제와 유사한 데이터를 가진 데이터베이스를 연동해서 이상 수치에 대한 경고 및 그래프 변화, 일부 수소에너지 공정 제어 기능을 구체화 할 계획입니다.
