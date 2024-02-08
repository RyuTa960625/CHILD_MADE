import { useState, useRef } from "react";
import styles from "./Hearder.module.css";
import Profile from "./Profile";

const Header = function () {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.nav}>
        <div>
          <img
            src="../imgs/homeIcon.PNG"
            alt="홈"
            className={styles.icon}
          ></img>
          <h1 className={styles.iconText}>홈</h1>
        </div>
        <div style={{ position: "absolute", right: "40px", display: "flex" }}>
          <div onClick={openModal}>
            <img
              src="../imgs/myPageIcon.PNG"
              alt="마이페이지"
              className={styles.icon}
            ></img>
            <h1 className={styles.iconText}>마이페이지</h1>
          </div>
          <div style={{ marginLeft: "40px" }}>
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
