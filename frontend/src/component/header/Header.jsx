import { useState, useRef } from "react";
import styles from "./Hearder.module.css";
import Profile from "../profilePage/Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = function () {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setModalOpen(true);
    };

    const moveToMain = function () {
        navigate("/main");
    };

    const logoutEvent = () => {
        // console.log("123");
        // console.log({
        //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // });
        axios
            .post(`https://i10d209.p.ssafy.io/api/auth/logout`, null, {
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

        localStorage.removeItem("accessToken");
        localStorage.removeItem("memberId");

        navigate("/");
    };

    return (
        <>
            <div className={styles.nav}>
                <div>
                    <img
                        src="../imgs/homeIcon.PNG"
                        alt="홈"
                        className={styles.icon}
                        onClick={moveToMain}
                    ></img>
                    <h1 className={styles.iconText}>홈</h1>
                </div>
                <div
                    style={{
                        position: "absolute",
                        right: "40px",
                        display: "flex",
                    }}
                >
                    <div onClick={openModal}>
                        <img
                            src="../imgs/myPageIcon.PNG"
                            alt="마이페이지"
                            className={styles.icon}
                        ></img>
                        <h1 className={styles.iconText}>마이페이지</h1>
                    </div>
                    <div style={{ marginLeft: "40px" }} onClick={logoutEvent}>
                        <img
                            src="../imgs/logoutIcon.PNG"
                            alt="홈"
                            className={styles.icon2}
                        ></img>
                        <h1 className={styles.iconText}>로그아웃</h1>
                    </div>
                </div>
            </div>
            {modalOpen && <Profile setModalOpen={setModalOpen} />}
        </>
    );
};

export default Header;
