import React from "react";
import styles from "./Signup.module.css"

function Signup() {
  return (
  <div className={styles.SignupComponent}>
    <div  className={styles.SignupBookComponent}>
      <img src="Images/LoginBookComponent.png"></img>
      <div className={styles.SignupFormLeft}>
        <h1>회원가입</h1>
        <div className={styles.SignupFormId}>
          <h2>
            아이디
          </h2>
          <input type="text" placeholder="이메일을 입력해주세요"></input>
          <hr></hr>
          <input type="text" placeholder="인증번호를 입력해주세요"></input>
          <hr></hr>
        </div>
        <div className={styles.SignupFormPassword}>
          <h2>
            비밀번호
          </h2>
          <input type="password" placeholder="비밀번호를 입력해주세요"></input>
          <hr></hr>
        </div>
        <div className={styles.SignupFormPassword}>
          <h2>
            비밀번호 확인
          </h2>
          <input type="password" placeholder="비밀번호를 입력해주세요"></input>
          <hr></hr>
        </div>
      </div>
    </div>
    <img src="Images/LoginBackgroundImg.png" className={styles.SignupBackgroundImg}></img>
  </div>
  ) 
}
export default Signup;
