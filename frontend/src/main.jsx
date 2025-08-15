import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import LearnABC from './pages/LearnABC.jsx';
import Learn123 from './pages/Learn123.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/abc" element={<LearnABC />} />
        <Route path="/123" element={<Learn123 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
