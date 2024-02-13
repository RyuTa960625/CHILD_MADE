import "./App.css";
import Header from "./component/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./component/booklistPage/BookList";
import RecordList from "./component/recordlistPage/RecordList";
import Single from "./component/Single";
import React, { useState } from "react";

import Intro from "./component/IntroPage/Intro";
import Signup from "./SignupPage/Signup";
import Login from "./component/LoginPage/Login";
// import Vidu from "./ViduTestT/ViduTest";
import LoginCallback from "./component/LoginPage/LoginCallback";
import GetUserNickname from "./component/LoginPage/GetUserNickname";
import Main from "./MainT/MainT";
import "./App.css";
import ViewPage from "./component/viewPage/ViewPage";
import Home from "./component/mainPage/Home";
import ErrorPage from "./component/errorPage/ErrorPage";

import LoginErrorPage from "./component/loginerrorPage/LoginErrorPage";
import PrivateRoute from "./component/PrivateRoute";

function App() {
    const [showHeader, setShowHeader] = useState(true);

    return (
        <div className="App custom-cursor">
            <BrowserRouter>
                {showHeader && <Header />}
                <Routes>
                    <Route
                        path="/loginerrorpage"
                        element={<LoginErrorPage />}
                    ></Route>
                    <Route
                        path="/"
                        element={<Intro setShowHeader={setShowHeader} />}
                    ></Route>
                    <Route
                        path="/login"
                        element={<Login setShowHeader={setShowHeader} />}
                    ></Route>
                    <Route
                        path="/social-login-callback"
                        element={<LoginCallback />}
                    ></Route>
                    <Route
                        path="/get-user-nickname"
                        element={<GetUserNickname />}
                    ></Route>
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/main"
                            element={<Home setShowHeader={setShowHeader} />}
                        ></Route>
                        <Route path="/booklist" element={<BookList />}></Route>
                        <Route
                            path="/recordlist"
                            element={<RecordList />}
                        ></Route>
                        <Route path="/viewpage" element={<ViewPage />}></Route>
                        <Route path="/single" element={<Single />}></Route>
                        <Route
                            path="/errorpage"
                            element={<ErrorPage />}
                        ></Route>
                        {/* <Route path="*" element={<Error />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
