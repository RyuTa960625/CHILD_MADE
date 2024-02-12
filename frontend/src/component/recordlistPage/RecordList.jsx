import { useEffect, useState } from "react";
import styles from "./RecordList.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RecordList() {
    useEffect(() => {}, []);

    const [isOpen, setIsOpen] = useState(false);
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();

    const openModal = function () {
        setIsOpen(!isOpen);
    };

    const moveToViewPage = function () {
        navigate("/viewpage");
    };

    // const apiTest = function(){
    //     axios.get('http://localhost:8080/api/books/')
    //     .then(response=>{
    //         console.log(response.data)

    //     })
    // }

    // const loadBookList = function(){
    //     axios.get('http://localhost:8080/api/books/')
    //     .then(response=>{
    //         console.log(response)
    //         setBookList(response.data.data.content)
    //     })
    // }

    const 서버에서온데이터 = [
        {
            imageUrl:
                "https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/1.png",
            title: "해님과 달님",
            story: "해님과 달님, 그 두 개의 존재는 어둠과 빛, 미지의 영역과 밝히기 어려운 비밀을 지닌다. 해님은 뜨거운 불길과 함께 땅을 불태우며, 끝없이 번뜩이는 불빛으로 모든 것을 드러내는 존재다. 그러나 그 불꽃 속에는 타오르는 고통과 끝없는 욕망이 감춰져 있다. 한편 달님은 어둠 속에서 나타나는 정적이고 차가운 빛이다. 그 눈에 비치는 빛은 불안과 심연의 신비로움을 안고 있다. 달님은 끊임없이 변하는 얼굴을 갖고 있어서 때로는 숨겨진 고요와 휴식, 때로는 어둠의 깊은 비밀을 드러내는 존재이다. 해님과 달님, 양립하는 두 세계의 존재는 우리에게 숨겨진 현실의 양면을 상징한다. 그들의 존재는 무서움과 경외, 놀라움과 감동을 동시에 안겨준다. 이 두 날개를 가진 존재들은 우리가 알지 못하는 세계의 문을 열어주며, 우리에게 새로운 이야기를 간직하고 있다.",
            savedDate: "2024-02-14",
            time: "12분 30초",
            myRole: "우주",
        },

        {
            imageUrl:
                "https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/1.png",
            title: "해님과 달님",
            story: "해님과 달님, 그 두 개의 존재는 어둠과 빛, 미지의 영역과 밝히기 어려운 비밀을 지닌다. 해님은 뜨거운 불길과 함께 땅을 불태우며, 끝없이 번뜩이는 불빛으로 모든 것을 드러내는 존재다. 그러나 그 불꽃 속에는 타오르는 고통과 끝없는 욕망이 감춰져 있다. 한편 달님은 어둠 속에서 나타나는 정적이고 차가운 빛이다. 그 눈에 비치는 빛은 불안과 심연의 신비로움을 안고 있다. 달님은 끊임없이 변하는 얼굴을 갖고 있어서 때로는 숨겨진 고요와 휴식, 때로는 어둠의 깊은 비밀을 드러내는 존재이다. 해님과 달님, 양립하는 두 세계의 존재는 우리에게 숨겨진 현실의 양면을 상징한다. 그들의 존재는 무서움과 경외, 놀라움과 감동을 동시에 안겨준다. 이 두 날개를 가진 존재들은 우리가 알지 못하는 세계의 문을 열어주며, 우리에게 새로운 이야기를 간직하고 있다.",
        },

        {
            imageUrl:
                "https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/1.png",
            title: "해님과 달님",
            story: "해님과 달님, 그 두 개의 존재는 어둠과 빛, 미지의 영역과 밝히기 어려운 비밀을 지닌다. 해님은 뜨거운 불길과 함께 땅을 불태우며, 끝없이 번뜩이는 불빛으로 모든 것을 드러내는 존재다. 그러나 그 불꽃 속에는 타오르는 고통과 끝없는 욕망이 감춰져 있다. 한편 달님은 어둠 속에서 나타나는 정적이고 차가운 빛이다. 그 눈에 비치는 빛은 불안과 심연의 신비로움을 안고 있다. 달님은 끊임없이 변하는 얼굴을 갖고 있어서 때로는 숨겨진 고요와 휴식, 때로는 어둠의 깊은 비밀을 드러내는 존재이다. 해님과 달님, 양립하는 두 세계의 존재는 우리에게 숨겨진 현실의 양면을 상징한다. 그들의 존재는 무서움과 경외, 놀라움과 감동을 동시에 안겨준다. 이 두 날개를 가진 존재들은 우리가 알지 못하는 세계의 문을 열어주며, 우리에게 새로운 이야기를 간직하고 있다.",
        },

        {
            imageUrl:
                "https://pj1.s3.ap-northeast-2.amazonaws.com/img/cover/1.png",
            title: "해님과 달님",
            story: "해님과 달님, 그 두 개의 존재는 어둠과 빛, 미지의 영역과 밝히기 어려운 비밀을 지닌다. 해님은 뜨거운 불길과 함께 땅을 불태우며, 끝없이 번뜩이는 불빛으로 모든 것을 드러내는 존재다. 그러나 그 불꽃 속에는 타오르는 고통과 끝없는 욕망이 감춰져 있다. 한편 달님은 어둠 속에서 나타나는 정적이고 차가운 빛이다. 그 눈에 비치는 빛은 불안과 심연의 신비로움을 안고 있다. 달님은 끊임없이 변하는 얼굴을 갖고 있어서 때로는 숨겨진 고요와 휴식, 때로는 어둠의 깊은 비밀을 드러내는 존재이다. 해님과 달님, 양립하는 두 세계의 존재는 우리에게 숨겨진 현실의 양면을 상징한다. 그들의 존재는 무서움과 경외, 놀라움과 감동을 동시에 안겨준다. 이 두 날개를 가진 존재들은 우리가 알지 못하는 세계의 문을 열어주며, 우리에게 새로운 이야기를 간직하고 있다.",
        },
    ];

    return (
        // 전체  배경
        <div className={styles.main_container}>
            {/* 뒷배경 구름 */}
            {/* 스타일 2개이상 적용시키는 방법 */}
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

            {isOpen && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.video_info_container}>
                        <img
                            className={styles.video_book}
                            src="/imgs/detailBookM.png"
                            alt="동영상 상세 보기 페이지"
                        ></img>
                        <div>
                            <img
                                src="/imgs/close2M.png"
                                alt="탈출"
                                className={styles.close_icon}
                                onClick={openModal}
                            ></img>
                        </div>

                        <img
                            className={styles.video_img}
                            src={서버에서온데이터[0].imageUrl}
                            alt="동영상 썸네일"
                        ></img>
                        <div className={styles.video_info}>
                            <h1 className={styles.info_text}>
                                동화제목 : {서버에서온데이터[0].title}
                            </h1>
                            <h1 className={styles.info_text}>
                                저장날짜 : {서버에서온데이터[0].savedDate}
                            </h1>
                            <h1 className={styles.info_text}>
                                나의 역할 : {서버에서온데이터[0].myRole}
                            </h1>
                        </div>

                        <div className={styles.video_btn_container}>
                            <div className={styles.video_btn}>
                                <h1
                                    className={styles.btn_text}
                                    onClick={moveToViewPage}
                                >
                                    동화책 보러가기
                                </h1>
                            </div>
                            <div className={styles.video_btn}>
                                <h1 className={styles.btn_text}>
                                    동화책 저장하기
                                </h1>
                            </div>
                            <div className={styles.video_btn}>
                                <h1 className={styles.btn_text}>
                                    동화책 삭제하기
                                </h1>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className={styles.whole_container}>
                {/* 페이지 안내 문구 */}
                <div className={styles.header_container}>
                    <div className={styles.left_ch}></div>
                    <div className={styles.boxMsg}>나의 동화책 목록</div>
                    <div className={styles.right_ch}></div>
                </div>

                <div className={styles.search_container}>
                    <input className={styles.search_box}></input>
                    <img
                        className={styles.find}
                        src="../imgs/find2M.png"
                        alt="돋보기"
                    ></img>
                </div>

                <div className={styles.video_shelf_container}>
                    <div className={styles.video_container}>
                        {/* 책장 */}
                        <div className={styles.shelf}></div>

                        <div className={styles.btn_container}>
                            <img
                                src="/imgs/pmbtnM.png"
                                alt="왼쪽 페이지 이동"
                                className={styles.left_btn}
                            ></img>
                            <img
                                src="/imgs/pmbtn2M.png"
                                alt="오른쪽 페이지 이동"
                                className={styles.right_btn}
                            ></img>
                        </div>

                        <div className={styles.bookShelf_container}>
                            {/* 동화책 목록 */}
                            {서버에서온데이터.map((data, index) => {
                                return (
                                    <>
                                        <div
                                            className={styles.book_container}
                                            onClick={() => {
                                                openModal();
                                            }}
                                        >
                                            <img
                                                className={styles.book_img}
                                                src={
                                                    서버에서온데이터[index]
                                                        .imageUrl
                                                }
                                                alt="책 표지"
                                            />
                                        </div>
                                    </>
                                );
                            })}
                        </div>

                        <div className={styles.wing_container}>
                            <div
                                className={styles.wm}
                                style={{
                                    width: 330,
                                    height: 150,
                                    marginLeft: -170,
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
                                    marginLeft: 1040,
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
        </div>
    );
}
