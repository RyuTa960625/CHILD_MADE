import { useEffect, useState } from "react";
import styles from "../viewPage/ViewPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewPage() {
    const location = useLocation();
    const videoIndex = location.state ? location.state.videoIndex : null;
    const pageNum = location.state ? location.state.pageNum : null;
    const [videoUrl, setVideoUrl] = useState(
        "https://pj1.s3.ap-northeast-2.amazonaws.com/test.mp4"
    );

    const loadVideoUrl = function () {
        axios
            .get(
                `https://i10d209.p.ssafy.io/api/videos/2?&keyword=&page=${pageNum}&size=4&sort=id`
            )
            .then((response) => {
                console.log(response.data.data.content[videoIndex].videoUrl);
                setVideoUrl(response.data.data.content[videoIndex].videoUrl);
            });
    };

    useEffect(() => {
        console.log("\n\n\n\n" + pageNum + "\n\n\n\n" + videoIndex);
        loadVideoUrl();
    }, []);

    useEffect(() => {
        console.log(videoUrl);
    }, [videoUrl]);

    return (
        // 배경
        <div className={styles.main_container}>
            {/* 뒷배경 구름 */}
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

            <div className={styles.screen_container}>
                {/* 왼쪽 캐릭터 */}
                <img
                    className={styles.ch1}
                    src="/imgs/ch1-4.png"
                    alt="곰돌이"
                    width={140}
                ></img>
                {/* 오른쪽 캐릭터 */}
                <img
                    className={styles.ch2}
                    src="/imgs/ch2-5.png"
                    alt="공룡"
                    width={140}
                ></img>

                {/* 동화책 보는 화면 */}
                <div className={styles.main_view_container}>
                    <video key={videoUrl} className={styles.view} controls>
                        <source src={videoUrl} type="video/mp4"></source>
                    </video>
                </div>
            </div>
        </div>
    );
}
