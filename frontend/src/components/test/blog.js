useEffect(() => {
    const newSocket = new SockJS('http://localhost:8080/ws-dash');
    const stompClient = Stomp.over(newSocket);
    stompClientRef.current = stompClient;  // useRef를 사용하여 참조 설정
  
    stompClient.connect({}, () => {
      console.log('연결되었습니다.');
  
      stompClient.subscribe('/topic/current-data', (res) => {
          const initData = JSON.parse(res.body); // 서버에서 받은 데이터
  
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
// ---------------------------

function Example() {
    const [timeList, setTimeList] = useState([]); // timeList 라는 상태변수 선언
    setTimeList((prevTimeList) => [...prevTimeList, initData.time]); // 
    return (
        <div>
          <WebSocketExample />
        </div>
      );
}