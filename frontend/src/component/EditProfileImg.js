import React, { useRef, useState } from "react";
import styles from "./EditProfileImg.module.css";
import axios from "axios";


function EditProfileImg({ setEditProfileModalOpen, profile }) {
  const memberId = localStorage.getItem("memberId");
  const modalBackground = useRef();
  const fileInputRef = useRef();
  const [newProfile, setNewProfile] = useState(profile);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfile(file);

    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
    }
  };

  const handleEditProfile = () => {
    console.log(localStorage.getItem("accessToken"))
    const formData = new FormData();
    formData.append("file", newProfile);  
    axios
      .put(
        `http://localhost:8080/api/members/${memberId}/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.msg, response.data.statusCode);
      })
      .catch((error) => {
        console.log(error);
      });
  
    setEditProfileModalOpen(false);
  };
  

  

  return (
    <div
      className={styles.modalContainer}
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          setEditProfileModalOpen(false);
        }
      }}
    >
      <img
        src="Images/ModalPaper.svg"
        className={styles.modalBgImg}
        alt="Modal Background"
      ></img>
      <div className={styles.editImgForm}>
        <div className={styles.editUserImg}>
          <div className={styles.editDeco} onClick={() => fileInputRef.current.click()}>
          </div>
          <img src="Images/edit_pen.svg" className={styles.editIcon} onClick={() => fileInputRef.current.click()}/>
          <img
            src={newProfile}
            className={styles.userImg}
            alt="User Profile"
          ></img>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        ></input>
        <button onClick={() => fileInputRef.current.click()} className={styles.submitButton}>수정하기</button>
        <button onClick={handleEditProfile} className={styles.submitButton}>확인</button>
      </div>
    </div>
  );
}

export default EditProfileImg;
