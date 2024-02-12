import React, { useState, useRef, useEffect } from "react";
import styles from "./EditProfile.module.css";
import axios from "axios";

function EditProfile({ setEditUserModalOpen, editField, name, nickname }) {
    const memberId = localStorage.getItem("memberId");

    const modalBackground = useRef();
    const inputRef = useRef();
    const [editName, setEditName] = useState("");
    const [editNickname, setEditNickname] = useState("");

    const closeModal = () => {
        setEditUserModalOpen(false);
    };

    const handleChangeName = (e) => {
        setEditName(e.target.value);
    };

    const handleChangeNickname = (e) => {
        setEditNickname(e.target.value);
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const editUserName = () => {
        axios
            .put(
                `http://localhost:8080/api/members/${memberId}/name`,
                {
                    name: editName, // 데이터에 닉네임 추가
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

        closeModal();
    };

    const editUserNickname = () => {
        axios
            .put(
                `http://localhost:8080/api/members/${memberId}/nickname`,
                {
                    nickname: editNickname,
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

        closeModal();
    };

    return (
        <div
            className={styles.modalContainer}
            ref={modalBackground}
            onClick={(e) => {
                if (e.target === modalBackground.current) {
                    closeModal();
                }
            }}
        >
            <div className={styles.modalContent}>
                <img src="imgs/ModalPaper.svg"></img>
                <div className={styles.modalForm}>
                    {editField === "name" ? (
                        <div>
                            <h2>이름</h2>
                            <input
                                type="text"
                                value={editName}
                                ref={inputRef}
                                onChange={handleChangeName}
                                placeholder="변경할 이름을 작성해주세요"
                            ></input>
                            <hr className={styles.hrTag}></hr>
                            <button
                                className={styles.submitButton}
                                onClick={editUserName}
                            >
                                확인
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2>닉네임</h2>
                            <input
                                type="text"
                                value={editNickname}
                                ref={inputRef}
                                onChange={handleChangeNickname}
                                placeholder="변경할 닉네임을 작성해주세요"
                            ></input>
                            <hr className={styles.hrTag}></hr>
                            <button
                                className={styles.submitButton}
                                onClick={editUserNickname}
                            >
                                확인
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
