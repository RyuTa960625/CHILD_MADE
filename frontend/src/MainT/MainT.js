import axios from "axios";
import React from "react";
import Header from "../component/Header"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainT() {
    let navigate = useNavigate();

    const logoutEvent = () => {

        // console.log("123");
        // console.log({
        //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // });
        axios
            .post(`http://localhost:8080/api/auth/logout`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        localStorage.removeItem("accessToken")
        localStorage.removeItem("memberId")
        
        navigate("/intro");
    };

    return (
        <div>
            <Header />
            <div>
                <button onClick={logoutEvent} style={{margin:"200px"}}>로그아웃</button>
            </div>
        </div>
    );
}

export default MainT;
