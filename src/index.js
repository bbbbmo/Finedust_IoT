import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // 메인 App 컴포넌트

// React 18 버전에서 사용하는 새로운 방식으로 DOM에 연결
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
