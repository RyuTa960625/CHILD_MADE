import { useEffect, useState } from "react";
import styles from "./BookList.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BGM from "../../assets/backMusic03.mp3";

const BookList = function () {
    const location = useLocation();
    const navigate = useNavigate();
    const playMode = location.state ? location.state.playMode : null;
    const [bookId, setBookId] = useState(1);
    const [roleId, setRoleId] = useState(1);

    const [bookList, setBookList] = useState([]);
    const [selectedRole, setSelectedRole] = useState();
    const [pageNum, setPageNum] = useState(0);
    const [roleName, setRoleName] = useState("");

    const roleStyles = [
        styles.character_btn1,
        styles.character_btn2,
        styles.character_btn3,
        styles.character_btn4,
    ];

    const selectedRoleStyles = [
        styles.selected_character_btn1,
        styles.selected_character_btn2,
        styles.selected_character_btn3,
        styles.selected_character_btn4,
    ];

    const [searchValue, setSearchValue] = useState("");

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    // useEffect(() => {
    //     try {
    //         const audio = new Audio(BGM); 
    //         audio.loop = true;
    //         audio.volume = 0.3; 
    //         audio.play(); 
    //         return () => {
    //             audio.pause(); 
    //         };
    //     } catch (error) {
    //         console.log('Auto-play failed:', error.message);
    //     }
    // }, []);

    useEffect(() => {
        loadBookList();
        loadBookInfo();
        apiTest();
        apiTest2();
        console.log(playMode);
        console.log(roleId);
        if (!playMode) {
            navigate("/errorpage");
        }
    }, [bookId, roleId, selectedRole, roleName]);

    const moveToSinglePage = function () {
        navigate("/makevideopage", {
            state: {
                playMode: playMode,
                bookId: bookId,
                roleId: roleId,
                roleName: roleName,
            },
        });
    };
    // step1. "npm install axios" 를 터미널에 입력한다. v
    // step2. import axios from 'axios' 를 통해 임포트한다. v
    // step3. 요청하고자 하는 api 메서드에 따라 get, post, put, delete
    // ex) axios.get('접속하고자 하는 url').then(response=>{성공했을 떄 로직}).catch(error=>{실패했을 떄 로직})

    //http://localhost:8080/api/books/?page=1&size=6
    const [isOpen, setIsOpen] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [bookInfo, setBookInfo] = useState([]);

    const openModal = function () {
        setIsOpen(!isOpen);
    };

    const handleSearch = () => {
        setPageNum(0);
        axios
            .get(
                `https://i10d209.p.ssafy.io/api/books/${searchValue}?page=${pageNum}&size=6&sort=id`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            )
            .then((response) => {
                // 검색 결과 처리
                console.log(response.data);
                console.log(searchValue);
                setBookList(response.data.data.content);
                console.log(bookList);
                setTotalPage(response.data.data.totalPages);
            })
            .catch((error) => {
                // 오류 처리
                console.error("Error fetching search results:", error);
            });
    };

    const apiTest = function () {
        axios
            .get(
                `https://i10d209.p.ssafy.io/api/books/?page=${pageNum}&size=6&sort=id`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
            });
    };

    const apiTest2 = function () {
        axios
            .get(`https://i10d209.p.ssafy.io/api/books/${bookId}/roles`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                console.log(response.data);
            });
    };

    const loadBookList = function () {
        axios
            .get(
                `https://i10d209.p.ssafy.io/api/books/?page=${pageNum}&size=6&sort=id`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            )
            .then((response) => {
                setBookList(response.data.data.content);
                setTotalPage(response.data.data.totalPages);
                setPageNum(0);
            });
    };

    const loadBookInfo = function () {
        axios
            .get(`https://i10d209.p.ssafy.io/api/books/${bookId}/roles`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((response) => {
                setBookInfo(response.data.data);
            });
    };

    const moveNextPage = function () {
        // totalPage - 1을 한 이유: 페이지가 0부터 시작함(db의 인덱스 값을 그대로 넘기기 때문)
        if (pageNum < totalPage - 1) {
            console.log(pageNum);
            // 원하는 페이지 번호로 변경하고
            setPageNum(pageNum + 1);
            axios
                .get(
                    `https://i10d209.p.ssafy.io/api/books/${searchValue}?page=${
                        pageNum + 1
                    }&size=6&sort=id`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((res) => setBookList(res.data.data.content));
        }
    };

    const movePrevPage = function () {
        if (pageNum > 0) {
            console.log(pageNum);
            setPageNum(pageNum - 1);
            axios
                .get(
                    `https://i10d209.p.ssafy.io/api/books/${searchValue}?page=${
                        pageNum - 1
                    }&size=6&sort=id`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                )
                .then((res) => setBookList(res.data.data.content));
        }
    };

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
                    <img
                        src="/imgs/cloud.png"
                        alt="구름8"
                        className={styles.c8 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름9"
                        className={styles.c9 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름10"
                        className={styles.c10 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름11"
                        className={styles.c11 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름12"
                        className={styles.c12 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름13"
                        className={styles.c13 + " " + styles.clouds}
                    />
                    <img
                        src="/imgs/cloud.png"
                        alt="구름14"
                        className={styles.c14 + " " + styles.clouds}
                    />

                    {isOpen && (
                        <>
                            {" "}
                            <div className={styles.modal_background}></div>
                            <div className={styles.book_info_container}>
                                <div>
                                    <img
                                        src="/imgs/exitIcon.png"
                                        alt="탈출"
                                        className={styles.close_icon}
                                        onClick={() => {
                                            openModal();
                                            setSelectedRole("");
                                        }}
                                    ></img>
                                </div>
                                <div className={styles.book_info_img_container}>
                                    <img
                                        className={styles.book_info_bigimg}
                                        src={bookInfo.bookImageUrl}
                                        alt="책 표지"
                                    ></img>
                                    <img
                                        className={styles.book_info_img}
                                        src={bookInfo.bookImageUrl}
                                        alt="책 표지"
                                    ></img>
                                    <h1 className={styles.book_info_title}>
                                        {bookInfo.title}
                                    </h1>
                                </div>
                                <hr style={{ marginTop: 130 }}></hr>
                                <div className={styles.choose_container}>
                                    <div className={styles.story_container}>
                                        <h1
                                            className={styles.info_title}
                                            style={{ marginLeft: "-82%" }}
                                        >
                                            줄거리
                                        </h1>
                                        <p className={styles.story_info}>
                                            {bookInfo.summary}
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            styles.character_choose_container
                                        }
                                    >
                                        <h1
                                            className={styles.info_title}
                                            style={{
                                                marginTop: "1.5%",
                                                marginLeft: "-78%",
                                            }}
                                        >
                                            역할선택
                                        </h1>
                                        <div
                                            className={
                                                styles.character_container
                                            }
                                        >
                                            {bookInfo.roleListDtoList.map(
                                                (data, index) => {
                                                    return (
                                                        <>
                                                            <div
                                                                className={
                                                                    styles.role_container
                                                                }
                                                            >
                                                                <div
                                                                    key={index}
                                                                    className={`${
                                                                        roleStyles[
                                                                            index
                                                                        ]
                                                                    } ${
                                                                        index ===
                                                                        selectedRole
                                                                            ? selectedRoleStyles[
                                                                                  index
                                                                              ]
                                                                            : ""
                                                                    } `}
                                                                    onClick={() => {
                                                                        setRoleId(
                                                                            data.roleId
                                                                        );
                                                                        setRoleName(
                                                                            data.roleName
                                                                        );

                                                                        setSelectedRole(
                                                                            index
                                                                        );
                                                                    }}
                                                                >
                                                                    <img
                                                                        className={
                                                                            styles.character_btn_img
                                                                        }
                                                                        src={
                                                                            data.imageUrl
                                                                        }
                                                                        alt="역할1"
                                                                    ></img>
                                                                </div>
                                                                <h2
                                                                    className={
                                                                        styles.role
                                                                    }
                                                                    style={{
                                                                        marginTop: 15,
                                                                    }}
                                                                >
                                                                    {
                                                                        data.roleName
                                                                    }
                                                                </h2>
                                                            </div>
                                                        </>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={styles.start_btn}
                                        onClick={moveToSinglePage}
                                    >
                                        <h1 className={styles.start_text}>
                                            시작하기
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div
                        className={styles.books_container}
                        style={{ marginTop: "4%" }}
                    >
                        <div
                            className={styles.search_container}
                            style={{ display: "flex" }}
                        >
                            <input
                                className={styles.search}
                                value={searchValue}
                                onChange={handleChange}
                                placeholder="도서명을 입력하세요"
                            ></input>
                            <div
                                key={pageNum}
                                className={styles.find_container}
                                onClick={() => {
                                    handleSearch();
                                }}
                            >
                                <img
                                    src="/imgs/findM.png"
                                    alt="돋보기"
                                    className={styles.find}
                                ></img>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/imgs/bookShelfM.png"
                                alt="책장"
                                className={styles.bookShelf}
                            ></img>
                            <div className={styles.bookShelf_container}>
                                <div className={styles.btn_container}>
                                    <img
                                        src="/imgs/pmbtnM.png"
                                        alt="왼쪽 페이지 이동"
                                        className={styles.left_btn}
                                        onClick={movePrevPage}
                                    ></img>
                                    <img
                                        src="/imgs/pmbtn2M.png"
                                        alt="오른쪽 페이지 이동"
                                        className={styles.right_btn}
                                        onClick={moveNextPage}
                                    ></img>
                                </div>
                                {bookList.map((data, index) => {
                                    return (
                                        <>
                                            <div
                                                key={index}
                                                className={
                                                    styles.book_container
                                                }
                                                onClick={() => {
                                                    openModal();
                                                    apiTest();
                                                    apiTest2();
                                                    setBookId(data.id);
                                                }}
                                            >
                                                <img
                                                    className={styles.book_img}
                                                    src={
                                                        bookList[index].imageUrl
                                                    }
                                                    alt="책 표지"
                                                />
                                                <div
                                                    className={
                                                        styles.book_text_box
                                                    }
                                                >
                                                    <h1
                                                        className={
                                                            styles.book_text
                                                        }
                                                    >
                                                        {data.title.length > 8
                                                            ? `${data.title.slice(
                                                                  0,
                                                                  7
                                                              )}...`
                                                            : data.title}
                                                    </h1>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                                <div className={styles.character1}>
                                    <img
                                        src="/imgs/ch1ff.gif"
                                        alt="대표캐릭터1기본"
                                        width={340}
                                    />
                                </div>
                                <div className={styles.character2}>
                                    <img
                                        src="/imgs/ch2ff.gif"
                                        alt="대표캐릭터2기본"
                                        width={500}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.wing_container}>
                            <div
                                className={styles.wm}
                                style={{
                                    width: 330,
                                    height: 150,
                                    marginLeft: -133,
                                    position: "absolute",
                                }}
                            >
                                <img
                                    src="/imgs/wLM.png"
                                    alt="왼쪽 날개"
                                    className={styles.wing1}
                                ></img>
                            </div>
                            <div
                                className={styles.wm2}
                                style={{
                                    width: 330,
                                    height: 150,
                                    marginLeft: 803,
                                    position: "absolute",
                                }}
                            >
                                <img
                                    src="/imgs/wRM.png"
                                    alt="오른쪽 날개"
                                    className={styles.wing2}
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookList;
