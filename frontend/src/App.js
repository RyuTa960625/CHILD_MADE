import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "./IntroPage/Intro";
import Signup from "./SignupPage/Signup";
import Login from "./LoginPage/Login";
import Vidu from "./ViduTestT/ViduTest";
import LoginCallback from "./LoginPage/LoginCallback";
import GetUserNickname from "./LoginPage/GetUserNickname";
import Main from "./MainT/MainT";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/intro" element={<Intro />}></Route>
          {/* <Route path="/signup" element={<Signup />}></Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/social-login-callback"
            element={<LoginCallback />}
          ></Route>
          <Route
            path="/get-user-nickname"
            element={<GetUserNickname />}
          ></Route>
          <Route path="/vidu" element={<Vidu />}></Route>
          <Route path="/main" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
