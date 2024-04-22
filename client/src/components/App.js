import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from './views/MainPage/MainPage';

function App(){
  
  return (
    <BrowserRouter>
      <div>
        {

        }
        <Routes>
          <Route exact path="/" element={<MainPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;