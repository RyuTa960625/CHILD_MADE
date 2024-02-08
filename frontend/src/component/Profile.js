import React, { useState, useRef, useEffect } from "react";
import styles from "./Profile.module.css";
import EditProfile from "./EditProfile";
import EditProfileImg from "./EditProfileImg";
import axios from "axios";

function Profile({ setModalOpen }) {
  const memberId = localStorage.getItem("memberId");

  const modalBackground = useRef();
  const [editField, setEditField] = useState(null);
  const [name, setName] = useState("ffffff");
  const [nickname, setNickname] = useState("wwwwwwwwww");
  const [email, setEmail] = useState("taesu000000@naver.com");
  const [profile, setProfile] = useState("");
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const openEditUserModal = (field) => {
    setEditField(field);
    setEditUserModalOpen(true);
  };

  const openEditProfileModal = () => {
    setEditProfileModalOpen(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/members/${memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        // console.log(response.data.msg, response.data.statusCode);
        console.log(
          response.data.data.name,
          response.data.data.nickname,
          response.data.data.email,
          response.data.data.profile
        );
        setName(response.data.data.name);
        setNickname(response.data.data.nickname);
        setEmail(response.data.data.email);
        setProfile(response.data.data.profile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      className={styles.modalContainer}
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          setModalOpen(false);
        }
      }}
    >
      <div className={styles.modalContent}>
        <img
          src="../images/LoginBookComponent.png"
          className={styles.modalBook}
        ></img>
        <div className={styles.modalForm}>
          <div className={styles.userProfileImgArea}>
            <img src={profile} className={styles.userProfileImg}></img>
            <button onClick={openEditProfileModal}>프로필 사진 수정하기</button>
          </div>
          <table className={styles.userProgileForm}>
            <tbody>
              <tr>
                <div className={styles.tableInfo}>
                  <td className={styles.tableTitle}>이름</td>
                  <td className={styles.tableValue}>{name}</td>
                  <hr></hr>
                </div>
                <button
                  className={styles.tableButton}
                  onClick={() => openEditUserModal("name")}
                >
                  수정하기
                </button>
              </tr>
              <tr>
                <div className={styles.tableInfo}>
                  <td className={styles.tableTitle}>닉네임</td>
                  <td className={styles.tableValue}>{nickname}</td>
                  <hr></hr>
                </div>
                <button
                  className={styles.tableButton}
                  onClick={() => openEditUserModal("nickname")}
                >
                  수정하기
                </button>
              </tr>
              <tr className={styles.tableEmail}>
                <div className={styles.tableInfo}>
                  <td className={styles.tableTitle}>이메일</td>
                  <td className={styles.tableValue}>{email}</td>
                  <hr></hr>
                </div>
              </tr>
              <button onClick={() => setModalOpen(false)} className={styles.confirmProfile}>확인</button>
            </tbody>
          </table>
          <button
            className={styles.modalCloseBtn}
            onClick={() => setModalOpen(false)}
          >
            x
          </button>
        </div>
      </div>
      {editUserModalOpen && (
        <EditProfile
          setEditUserModalOpen={setEditUserModalOpen}
          editField={editField}
          name={name}
          nickname={nickname}
        />
      )}
      {editProfileModalOpen && (
        <EditProfileImg
          setEditProfileModalOpen={setEditProfileModalOpen}
          profile={profile}
        />
      )}
    </div>
  );
}

export default Profile;
