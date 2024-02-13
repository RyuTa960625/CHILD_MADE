import React, { useEffect, useState } from "react";
import styles from "./GetUserNickname.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetUserNickname() {
    const memberId = localStorage.getItem("memberId");

    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setNickname(e.target.value);
    };

    const handleSubmit = () => {
        axios
            .put(
                `http://localhost:8081/api/members/${memberId}/nickname`,
                {
                    nickname: nickname,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data.msg, response.data.statusCode);
            })
            .catch((error) => {
                console.log(error);
            });

        navigate("/main");
    };

    return (
        <div className={styles.PageAlign}>
            <img
                src="imgs/LoginBackgroundImg.png"
                className={styles.LoginBackgroundImg}
                alt="Login Background"
            />
            <div className={styles.ModalComponent}>
                <div className={styles.NicknameForm}>
                    <h2>닉네임</h2>
                    <p>저희 서비스에서 이용하실 닉네임을 입력해주세요</p>
                    <input
                        type="text"
                        value={nickname}
                        onChange={handleChange}
                        placeholder="닉네임을 입력해주세요"
                    />
                    <hr />
                    <button onClick={handleSubmit}>확인</button>
                </div>
                <img
                    src="imgs/ModalPaper.svg"
                    className={styles.ModalPaper}
                    alt="Modal Paper"
                />
            </div>
        </div>
    );
}

export default GetUserNickname;
