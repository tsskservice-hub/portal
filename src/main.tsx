import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home';
import './index.css'; // ⬅️ ここでCSS（Tailwind）を読み込みます

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);