import React, { useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WebSocketExample = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws-dash');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      console.log('WebSocket 연결 성공', frame);

      stompClient.subscribe('/topic/numbers', (message) => {
        console.log(message.body.content);
        // Update the state with received data
        setData(message.body);
      });


    }, (error) => {
      console.error('WebSocket 연결 에러', error);
    });

    // 언마운트 될때 연결 끊기
    return () => {
      if (stompClient) {
        stompClient.disconnect();
        console.log('WebSocket 연결이 해제되었습니다.');
      }
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Example</h1>
      <li>{data}</li>
    </div>
  );
};

export default WebSocketExample;
