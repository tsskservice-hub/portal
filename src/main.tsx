import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import EoyOralDrill from './pages/eoy-oral-drill';
import EoyOralElaborate from './pages/eoy-oral-elaborate';
import EoyOralMock from './pages/eoy-oral-mock';
import EoyWriting from './pages/eoy-writing';
import GameIgo from './pages/game-igo';
import GenkoyoshiEditor from './pages/genkoyoshi-editor';
import OralExamQuestions from './pages/oral-exam-questions';
import Prices from './pages/prices';
import './index.css'; // ⬅️ ここでCSS（Tailwind）を読み込みます

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eoy-oral-drill" element={<EoyOralDrill />} />
        <Route path="/eoy-oral-elaborate" element={<EoyOralElaborate />} />
        <Route path="/eoy-oral-mock" element={<EoyOralMock />} />
        <Route path="/eoy-writing" element={<EoyWriting />} />
        <Route path="/game-igo" element={<GameIgo />} />
        <Route path="/genkoyoshi-editor" element={<GenkoyoshiEditor />} />
        <Route path="/oral-exam-questions" element={<OralExamQuestions />} />
        <Route path="/prices" element={<Prices />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);