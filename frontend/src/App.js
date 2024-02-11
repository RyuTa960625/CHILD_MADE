import './App.css';
import Header from './component/header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookList from './component/boolistPage/BookList';
import RecordList from './component/recordlistPage/RecordList';
import Single from './component/Single'
import React, { Component } from "react";

import Intro from "./IntroPage/Intro";
import Signup from "./SignupPage/Signup";
import Login from "./LoginPage/Login";
// import Vidu from "./ViduTestT/ViduTest";
import LoginCallback from "./LoginPage/LoginCallback";
import GetUserNickname from "./LoginPage/GetUserNickname";
import Main from "./MainT/MainT";
import "./App.css";
import ViewPage from './component/viewPage/ViewPage';
import Home from './component/mainPage/Home';

function App() {
  return (
    <div className="App custom-cursor" >
      <BrowserRouter>      
        <Header/>
        <Routes>
        <Route path="/intro" element={<Intro />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/social-login-callback"
            element={<LoginCallback />}
          ></Route>
          <Route
            path="/get-user-nickname"
            element={<GetUserNickname />}
          ></Route>
          <Route path='/main' element={<Home/>}>
            </Route>
          <Route path='/booklist' element={<BookList/>}>
          </Route>
          <Route path='/recordlist' element={<RecordList/>}>
          </Route>
          <Route path='/viewpage' element={<ViewPage/>}>
          </Route>
          <Route path='/single' element={<Single />}></Route>
          <Route path='/error' element={<h1 style={{color: 'white', marginTop: '300px'}}>에러임ㅋㅋ</h1>}/>
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;
