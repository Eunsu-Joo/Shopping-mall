import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { RecoilRoot } from "recoil";
// vite에서 dev 모드 확인하는 환경변수
// if (JSON.parse(import.meta.env.VITE_USE_MOCK)) {
//   worker.start();
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);
