import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";

function Login({ setShowHeader }) {
    useEffect(() => {
        setShowHeader(false);
    });

    return (
        <div className={styles.LoginComponent}>
            <div className={styles.LoginBookComponent}>
                <img src="imgs/LoginBookComponent.png"></img>
                <div className={styles.LoginForm}>
                    <div className={styles.BearS}>
                        <img src="imgs/bear_s.png"></img>
                    </div>
                    <div className={styles.LoginInputForm}>
                        <h1>로그인</h1>
                        <div className={styles.SocialLoginButtons}>
                            <img
                                src="imgs/kakaotalk_login_button.svg"
                                className={styles.KakaoLoginButton}
                                onClick={kakaoLogin}
                            ></img>
                            <img
                                src="imgs/google_login_button.svg"
                                className={styles.GoogleLoginButton}
                                onClick={googleLogin}
                            ></img>
                        </div>
                        <button className={styles.LoginButton}>입장하기</button>
                    </div>
                </div>
            </div>
            <img
                src="imgs/LoginBackgroundImg.png"
                className={styles.LoginBackgroundImg}
            ></img>
        </div>
    );
}

const kakaoLogin = () => {
    window.location.replace(
        "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/social-login-callback&mode=login"
    );
    // axios.get("http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000&mode=login")
    //   .then((response)=>{
    //     console.log(response)
    //   })
    //   .catch((error)=>{
    //     console.log(error)
    //   })
};

const googleLogin = () => {
    window.location.replace(
        "http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/social-login-callback&mode=login"
    );
    //   axios.get("http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000&mode=login")
    //   .then((response)=>{
    //     console.log(response)
    //   })
    //   .catch((error)=>{
    //     console.log(error)
    //   })
};

export default Login;
