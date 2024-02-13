import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

const Home = function ({ setShowHeader }) {
    const navigate = useNavigate();

    const moveToBooklist = function (playMode) {
        navigate("/booklist", { state: { playMode: playMode } });
    };

    const moveToRecordlist = function () {
        navigate("/recordlist");
    };

    useEffect(() => {
        setShowHeader(true);
    });

    return (
        <>
            <div>
                <div className={styles.main_container}>
                    <img
                        src="/imgs/cloud.png"
                        alt="구름1"
                        className={styles.c1 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름2"
                        className={styles.c2 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름3"
                        className={styles.c3 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름4"
                        className={styles.c4 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름5"
                        className={styles.c5 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름6"
                        className={styles.c6 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름7"
                        className={styles.c7 + " " + styles.clouds}
                    />

                    <div
                        className={styles.btnStyle}
                        style={{ position: "absolute", marginTop: "2%" }}
                    >
                        <div style={{ display: "flex", marginBottom: 30 }}>
                            <div
                                className={styles.btnStyle2A}
                                style={{
                                    width: 400,
                                    height: 400,
                                    marginRight: 30,
                                }}
                                onClick={() => {
                                    moveToBooklist("SINGLE");
                                }}
                            >
                                <h1 className={styles.btn_text}>혼자</h1>
                                <img
                                    src="/imgs/ch1-5.png"
                                    alt="대표캐릭터1기본"
                                    className={styles.character1}
                                />
                            </div>
                            <div
                                className={styles.btnStyle2T}
                                style={{
                                    width: 400,
                                    height: 400,
                                    marginLeft: 30,
                                }}
                                onClick={() => {
                                    moveToBooklist("MULTI");
                                }}
                            >
                                <h1 className={styles.btn_text}>같이</h1>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginLeft: "2%",
                                        width: "100%",
                                    }}
                                >
                                    <div>
                                        <img
                                            src="/imgs/ch1-5.PNG"
                                            alt="대표캐릭터1기본"
                                            width={100}
                                            className={styles.character2}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src="/imgs/ch2-1.PNG"
                                            alt="대표캐릭터2기본"
                                            width={100}
                                            className={styles.character3}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={styles.btnStyle2S}
                            style={{ width: 860, height: 160, display: "flex" }}
                            onClick={moveToRecordlist}
                        >
                            <h1 className={styles.btn_text2}>
                                나만의 동화 보기
                            </h1>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginLeft: "1%",
                                }}
                            >
                                <div>
                                    <img
                                        src="/imgs/g3.PNG"
                                        alt="대표캐릭터2얼굴기본"
                                        width={100}
                                        className={styles.character4}
                                    />
                                </div>
                                <div>
                                    <img
                                        src="/imgs/b5.PNG"
                                        alt="대표캐릭터1얼굴기본"
                                        width={100}
                                        className={styles.character5}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
