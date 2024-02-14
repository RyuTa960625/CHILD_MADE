import { useEffect, useState } from "react";
import styles from "./ErrorPage.module.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = function () {
    let seconds = 5;

    useEffect(() => {
        const countdown = setInterval(() => {
            seconds--;
            console.log(seconds);

            const h2 = `<h2>${seconds + 1} </h2>`;

            document.querySelector("#dummy").innerHTML = h2;
            if (seconds < 0) {
                clearInterval(countdown);
                navigate("/main");
            }
        }, 1000);
    }, []);

    const navigate = useNavigate();
    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.text_container}>
                    <h1 id="test" className={styles.text}>
                        잘못된 경로입니다
                    </h1>
                    <div
                        style={{ display: "flex" }}
                        className={styles.change_text_container}
                    >
                        <div id="dummy" className={styles.text2}>
                            {/* <h2 style={{color: 'white'}}>{seconds}초 후 이동</h2> */}
                        </div>
                        <h1 className={styles.text3}>
                            {" "}
                            초 후 메인페이지로 이동합니다
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
