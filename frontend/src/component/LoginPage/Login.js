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
                    <div className={styles.back_img}>
                        <div className={styles.backgroundImage}></div>
                        <h1 className={styles.bear_text}>동화나라에 <br></br> 오신 것을 <br></br> 환영합니다</h1> 
                        <div className={styles.BearS}>
                            <img src="imgs/bear_s.png"></img>
                        </div>
                    </div>
                    <div className={styles.LoginInputForm}>
                        <h1 style={{fontSize : 48}}>로그인</h1>
                        <div className={styles.SocialLoginButtons}>
                            <img
                                src="imgs/kakaotalk_login_button.svg"
                                alt='카카오 로그인'
                                className={styles.KakaoLoginButton}
                                onClick={kakaoLogin}
                            ></img>
                            <img
                                src="imgs/google_login_button.svg"
                                alt="구글 로그인"
                                className={styles.GoogleLoginButton}
                                onClick={googleLogin}
                            ></img>
                        </div>
                    </div>
                </div>
            </div>
            <img
                src="imgs/LoginBackgroundImg.png"
                alt="로그인 뒷 배경"
                className={styles.LoginBackgroundImg}
            ></img>
        </div>
    );
}

const kakaoLogin = () => {
    window.location.replace(
        "http://localhost:8081/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/social-login-callback&mode=login"
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
        "http://localhost:8081/oauth2/authorization/google?redirect_uri=http://localhost:3000/social-login-callback&mode=login"
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
