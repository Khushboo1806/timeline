import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Timeline } from './context/Timeline';
const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Timeline>
    <Routes>
      <Route path='/' element={<Home />}/>
    </Routes>
    </Timeline>
    </BrowserRouter>
  );
}

export default App;
