import React, { useState, useRef, useEffect } from "react";
import styles from "./Profile.module.css";
import EditProfile from "./EditProfile";
import EditProfileImg from "./EditProfileImg";
import axios from "axios";

function Profile({ setModalOpen }) {
    const memberId = localStorage.getItem("memberId");

    const modalBackground = useRef();
    const [editField, setEditField] = useState(null);
    const [name, setName] = useState("undefined");
    const [nickname, setNickname] = useState("undefined");
    const [email, setEmail] = useState("undefined");
    const [profile, setProfile] = useState(null);
    const [providerType, setProviderType] = useState("undifined");
    const [editUserModalOpen, setEditUserModalOpen] = useState(false);
    const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

    const openEditUserModal = (field) => {
        setEditField(field);
        setEditUserModalOpen(true);
    };

    const openEditProfileModal = () => {
        setEditProfileModalOpen(true);
    };

    const clearCacheAndReload = () => {
        if ("caches" in window) {
            caches
                .keys()
                .then(function (keyList) {
                    return Promise.all(
                        keyList.map(function (key) {
                            return caches.delete(key);
                        })
                    );
                })
                .then(function () {
                    window.location.reload(true);
                });
        }
    };

    const unregister = () => {
        // axios
        //     .delete(`https://i10d209.p.ssafy.io/api/members`, {
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem(
        //                 "accessToken"
        //             )}`,
        //         },
        //     })
        //     .then((response) => {
        //         // console.log(response.data.msg, response.data.statusCode);
        //         console.log(
        //             response.data.data.name,
        //             response.data.data.nickname,
        //             response.data.data.email,
        //             response.data.data.profile
        //         );
        //         setName(response.data.data.name);
        //         setNickname(response.data.data.nickname);
        //         setEmail(response.data.data.email);
        //         setProfile(response.data.data.profile);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        localStorage.removeItem("accessToken");
        localStorage.removeItem("memberId");
        if (providerType === "GOOGLE") {
            window.location.replace(
                // "https://i10d209.p.ssafy.io/oauth2/authorization/google?redirect_uri=http://localhost:3000&mode=unlink" // 로컬
                "https://i10d209.p.ssafy.io/oauth2/authorization/google?redirect_uri=https://i10d209.p.ssafy.io&mode=unlink" // 서버
            );
        } else if (providerType === "KAKAO") {
            window.location.replace(
                // "https://i10d209.p.ssafy.io/oauth2/authorization/kakao?redirect_uri=http://localhost:3000&mode=unlink" // 로컬
                "https://i10d209.p.ssafy.io/oauth2/authorization/kakao?redirect_uri=https://i10d209.p.ssafy.io&mode=unlink" // 서버
            );
        }
    };

    useEffect(() => {
        axios
            .get(`https://i10d209.p.ssafy.io/api/members/${memberId}`, {
                headers: {
                    "Cache-Control": "no-cache",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                console.log(response.data.msg, response.data.statusCode);
                console.log(response.data.data.name);
                console.log(response.data.data.nickname);
                console.log(response.data.data.email);
                // console.log(response.data.data.provideType)
                console.log(response.data.data.profile);

                // console.log(response.data.data)
                setName(response.data.data.name);
                setNickname(response.data.data.nickname);
                setEmail(response.data.data.email);
                setProfile(response.data.data.profile);
                setProviderType(response.data.data.providerType);
            })
            .catch((error) => {
                console.log(error);
            });
        return () => {
            clearCacheAndReload();

            console.log(1);
        };
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
                    src="imgs/LoginBookComponent.png"
                    className={styles.modalBook}
                ></img>
                <div className={styles.modalForm}>
                    <div className={styles.userProfileImgArea}>
                        <img
                            src={profile}
                            className={styles.userProfileImg}
                        ></img>
                        <button
                            onClick={openEditProfileModal}
                            className={styles.progileEditOpenButton}
                        >
                            프로필 사진 수정하기
                        </button>
                    </div>
                    <table className={styles.userProgileForm}>
                        <tbody>
                            <tr>
                                <div className={styles.tableInfo}>
                                    <td className={styles.tableTitle}>이름</td>
                                    <td className={styles.tableValue}>
                                        {name}
                                    </td>
                                    <hr className={styles.hrTagName}></hr>
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
                                    <td className={styles.tableTitle}>
                                        닉네임
                                    </td>
                                    <td className={styles.tableValue}>
                                        {nickname}
                                    </td>
                                    <hr className={styles.hrTagNickname}></hr>
                                </div>
                                <button
                                    className={styles.tableButton}
                                    onClick={() =>
                                        openEditUserModal("nickname")
                                    }
                                >
                                    수정하기
                                </button>
                            </tr>
                            <tr className={styles.tableEmail}>
                                <div className={styles.tableInfo}>
                                    <td className={styles.tableTitle}>
                                        이메일
                                    </td>
                                    <td className={styles.tableValue}>
                                        {email}
                                    </td>
                                    <hr className={styles.hrTag}></hr>
                                </div>
                            </tr>
                            <div className={styles.bottonButton}>
                                <button
                                    onClick={unregister}
                                    className={styles.unregisterButton}
                                >
                                    회원 탈퇴
                                </button>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className={styles.confirmProfile}
                                >
                                    확인
                                </button>
                            </div>
                        </tbody>
                    </table>
                    <button
                        className={styles.modalCloseBtn}
                        onClick={() => setModalOpen(false)}
                    >
                        <img
                            src="/imgs/cancelButton.svg"
                            className={styles.cancelButton}
                        ></img>
                    </button>
                </div>
            </div>
            {editUserModalOpen && (
                <EditProfile
                    setEditUserModalOpen={setEditUserModalOpen}
                    editField={editField}
                    setName={setName}
                    setNickname={setNickname}
                />
            )}
            {editProfileModalOpen && (
                <EditProfileImg
                    setEditProfileModalOpen={setEditProfileModalOpen}
                    setProfile={setProfile}
                    profile={profile}
                />
            )}
        </div>
    );
}

export default Profile;
