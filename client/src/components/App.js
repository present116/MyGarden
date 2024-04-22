import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from './views/MainPage/MainPage';
import RegisterPage from './views/RegisterPage/RegisterPage';

function App(){
  
  return (
    <BrowserRouter>
      <div>
        {

        }
        <Routes>
          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/register" element={RegisterPage} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;