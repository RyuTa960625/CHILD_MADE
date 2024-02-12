import { useEffect, useState } from "react";
import styles from "./RecordList.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookList from "../booklistPage/BookList";

export default function RecordList() {

    const [isOpen, setIsOpen] = useState(false);
    const [videoList, setVideoList] = useState([]);
    const [videoId, setVideoId] = useState(1);
    const [pageNum, setPageNum] = useState(0);

    useEffect(() => {
        loadVideoList();
        apiTest();
        // loadVideoInfo();

    }, [videoId])

    const [totalPage, setTotalPage] = useState(0);

    const navigate = useNavigate();

    const openModal = function () {
        setIsOpen(!isOpen);
    };

    const moveToViewPage = function () {
        navigate("/viewpage", { state: { videoId : videoId, pageNum : pageNum } });
    };

    const apiTest = function(){
        axios.get(`https://i10d209.p.ssafy.io/api/videos/2?page=${pageNum}&size=4&sort=id`)
        .then(response=>{
            console.log(response.data.data.content)
            console.log(response.data.data.totalPages)
            console.log(videoId)
        })
    }

    const loadVideoList = function(){
        axios.get(`https://i10d209.p.ssafy.io/api/videos/2?page=${pageNum}&size=4&sort=id`)
        .then(response=>{
            setVideoList(response.data.data.content)
            setTotalPage(response.data.data.totalPages);
        })
    }

    const moveNextPage = function(){
        // totalPage - 1을 한 이유: 페이지가 0부터 시작함(db의 인덱스 값을 그대로 넘기기 때문)
        if(pageNum < totalPage-1){
            console.log(pageNum)
            // 원하는 페이지 번호로 변경하고
            setPageNum(pageNum + 1);
            axios.get(`https://i10d209.p.ssafy.io/api/videos/2?page=${pageNum + 1}&size=4&sort=id`)
            .then(res => setVideoList(res.data.data.content));
        }
    }

    const movePrevPage = function(){
        if(pageNum > 0){
            console.log(pageNum)
            setPageNum(pageNum - 1);
            axios.get(`https://i10d209.p.ssafy.io/api/videos/2?page=${pageNum - 1}&size=4&sort=id`)
            .then(res => setVideoList(res.data.data.content));
        }
    }

    const saveVideo = function(){
        axios.get(`https://i10d209.p.ssafy.io/api/videos/${videoId}/download`)
    }

    const deleteVideo = function(){
        axios.delete(`https://i10d209.p.ssafy.io/api/videos/2${videoId}`) 
    }
    
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
                            src={videoList[videoId - 1].imageUrl}
                            alt="동영상 썸네일"
                        ></img>
                        <div className={styles.video_info}>
                            <h1 className={styles.info_text}>
                                동화제목 : {videoList[videoId - 1].videoTitle}
                            </h1>
                            <h1 className={styles.info_text}>
                                저장날짜 : {videoList[videoId - 1].createdAt.slice(0, 10)}
                            </h1>
                            <h1 className={styles.info_text}>
                                나의 역할 : {videoList[videoId - 1].roleName}
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
                            <div className={styles.video_btn} onClick={saveVideo}>
                                <h1 className={styles.btn_text}>
                                    동화책 저장하기
                                </h1>
                            </div>
                            <div className={styles.video_btn} onClick={deleteVideo}>
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
                                onClick={movePrevPage}
                            ></img>
                            <img
                                src="/imgs/pmbtn2M.png"
                                alt="오른쪽 페이지 이동"
                                className={styles.right_btn}
                                onClick={moveNextPage}
                            ></img>
                        </div>

                        <div className={styles.bookShelf_container}>
                            {/* 동화책 목록 */}
                            {videoList.map((data, index) => {
                                return (
                                    <>
                                        <div
                                            className={styles.book_container}
                                            onClick={() => {
                                                openModal();
                                                apiTest();
                                                setVideoId(data.id);
                                            }}
                                        >
                                            <img
                                                className={styles.book_img}
                                                src={
                                                    videoList[index]
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
