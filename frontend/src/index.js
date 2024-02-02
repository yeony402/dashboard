import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/Dashboard.js'
// import App from './components/piece/BackgroundImage.js'; // 외부 컴포넌트는 import할 때 중괄호 제외 https://velog.io/@keynene/ERRORReact-export-Join-imported-as-Join-was-not-found-in-.routesJoin.js-possible-exports-default-%EC%BB%B4%ED%8C%8C%EC%9D%BC-%EC%97%90%EB%9F%AC


const rootElement = document.getElementById('root');
createRoot(rootElement).render(React.createElement(App));

