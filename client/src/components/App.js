import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Auth from "../hoc/auth";

import MainPage from './views/MainPage/MainPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import LoginPage from './views/LoginPage/LoginPage';
import HomePage from './views/HomePage/HomePage';

function App(){
  
  return (
    <BrowserRouter>
      <div>
        {

        }
        <Routes>
          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/register" element={Auth(RegisterPage, false)} />
          <Route exact path="/login" element={Auth(LoginPage, false)} />
          <Route exact path="/home" element={Auth(HomePage, false)} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;