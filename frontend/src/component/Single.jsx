import { Col, Container, Row } from "react-bootstrap";
import styles from "./Single.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { OpenVidu } from "openvidu-browser";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

// 환경 변수에 따라 애플리케이션 서버 URL을 설정합니다.
const APPLICATION_SERVER_URL =
    process.env.NODE_ENV === "production" ? "" : "https://i10d209.p.ssafy.io/";

export default function Single() {
    // 상태 변수들을 선언합니다.

    // 멤버 ID, 방 만드는데 사용된다.
    // 1로 고정값 설정했는데, 백에서 api로 받아와야 한다.
    const [memberId] = useState(1);
    const [session, setSession] = useState(undefined); // OpenVidu 세션
    const [mainStreamManager, setMainStreamManager] = useState(undefined); // 주 비디오 스트림
    const [publisher, setPublisher] = useState(undefined); // 방장
    const [subscribers, setSubscribers] = useState([]); // 참가자들

    // 역할 id와 책 id 변수로 설정했는데, 아래측에서 먹히지가 않는다.
    // 손 봐야함
    // 규리한테 물어보기
    const roleId = 1;
    const bookId = 1;

    // 화면 출력 관련
    const videoRef = useRef(null); // 비디오 요소를 참조하기 위한 useRef 훅

    // 녹화 관련
    const [recorder, setRecorder] = useState(null); // 녹화기
    const [recordedChunks, setRecordedChunks] = useState([]);

    // 녹화 시작 함수
    const startRecording = () => {
        if (
            mainStreamManager &&
            mainStreamManager.stream &&
            mainStreamManager.stream.getMediaStream()
        ) {
            const mediaStream = mainStreamManager.stream.getMediaStream(); // 웹캠 스트림
            // const canvasStream = canvasRef.current.captureStream(); // 얼굴인식을 그린 스트림

            // 녹화 옵션
            const options = {
                mimeType: "video/webm", // 녹화를 위한 코덱
                mirror: true, // 거울모드
            };

            const recorder = new MediaRecorder(mediaStream, options); // 녹화할 스트림과 옵션을 설정

            recorder.ondataavailable = (event) => {
                recordedChunks.push(event.data);
            };

            recorder.onstop = () => {
                setRecordedChunks(recordedChunks);
            };

            recorder.start();
            console.log("녹화 시작해라");
            setRecorder(recorder);
        }
    };

    // 녹화 중지 함수
    const stopRecording = () => {
        if (recorder) {
            recorder.stop(); // 녹화 중지
            console.log("녹화 그만해라");
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    const recordedBlob = new Blob([event.data], {
                        type: "video/webm",
                    });
                    const url = URL.createObjectURL(recordedBlob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "테스트가보자.webm";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            };
        }
    };

    // --------------------------------------------------------------

    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 이벤트 리스너를 추가합니다.
        window.addEventListener("beforeunload", onBeforeUnload);
        // 컴포넌트가 언마운트되기 전에 이벤트 리스너를 제거합니다.
        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
            leaveSession();
        };
    }, []);

    // 페이지 입장 시, 화상 회의 즉시 입장된다.
    useEffect(() => {
        joinSession();
    }, []);

    // 창을 닫거나 새로고침하면 화상회의에서 나간다.
    const onBeforeUnload = () => {
        leaveSession();
    };

    // 구독자 삭제 함수 ( 참가자가 방 나가는거와 관련 )
    const deleteSubscriber = (streamManager) => {
        setSubscribers((prevSubscribers) =>
            prevSubscribers.filter((sub) => sub !== streamManager)
        );
    };

    // 세션에 참가하는 함수
    const joinSession = async () => {
        const OV = new OpenVidu(); // OpenVidu 객체 생성

        const newSession = OV.initSession(); // 새로운 세션 초기화

        // 새로운 세션의 이벤트 리스너 등록
        newSession.on("streamCreated", (event) => {
            const subscriber = newSession.subscribe(event.stream, undefined);
            setSubscribers((prevSubscribers) => [
                ...prevSubscribers,
                subscriber,
            ]);
        });

        newSession.on("streamDestroyed", (event) => {
            deleteSubscriber(event.stream.streamManager);
        });

        newSession.on("exception", (exception) => {
            console.warn(exception);
        });

        setSession(newSession); // 세션 설정

        try {
            const token = await getToken(); // 토큰 가져오기
            await newSession.connect(token, { clientData: memberId }); // 세션 연결

            // 발행자 초기화
            const publisher = await OV.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                resolution: "1920x1080", // 해상도
                frameRate: 30, // 주사율, 싸트북에서 30이상 안됌
                mirror: true, // 거울모드
            });

            newSession.publish(publisher); // 발행
            setMainStreamManager(publisher); // 주 비디오 스트림 설정
            setPublisher(publisher); // 방장 설정
        } catch (error) {
            console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
            );
        }
    };

    // 방 나가기 함수
    const leaveSession = () => {
        if (session) {
            session.disconnect();
        }

        // 상태 변수 초기화
        setSession(undefined);
        setSubscribers([]);
        setMainStreamManager(undefined);
        setPublisher(undefined);
    };

    // 토큰 가져오기 함수
    const getToken = async () => {
        // const memberId = await createSession(memberId);
        console.log("getToken");
        return await createSession();
    };

    // 세션 생성 함수
    const createSession = async () => {
        const response = await axios.put(
            APPLICATION_SERVER_URL + `api/rooms/${memberId}`,
            {
                roleId: 1,
                bookId: 1,
            },
            { headers: { "Content-Type": "application/json" } }
        );
        console.log(response.data.data.token + " 토큰 생성");
        return response.data.data.token; // 세션 ID 반환
    };

    useEffect(() => {
        const resizeCanvas = () => {
            const videoEl = videoRef.current;
            // const canvasEl = chromakeyRef.current;

            // if (videoEl && canvasEl) {
            //   canvasEl.width = videoEl.videoWidth;
            //   canvasEl.height = videoEl.videoHeight;
            // }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // 초기에도 크기를 조정해줍니다.

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        // 전체 배경
        <div className={styles.bg}>
            {/* 별, CSS 관련 클래스가 2개 이상일 때 아래와 같은 방법으로 사용 가능 */}
            <div
                className={`${styles.star} ${styles.star1} ${styles.blinking}`}
            ></div>
            <div className={`${styles.star} ${styles.star2}`}></div>
            <div className={`${styles.star} ${styles.star3}`}></div>
            <div className={`${styles.star} ${styles.star4}`}></div>

            <Container>
                <Row>
                    {/* 메인 화면 COLUMN */}
                    <Col className={styles.container_1} md="9">
                        <button onClick={startRecording}>녹화 시작</button>
                        <button onClick={stopRecording}>녹화 중지</button>
                        <div
                            className={styles.main_container}
                            id="main_container"
                        >
                            {/* 메인 비디오 화면 */}
                            {mainStreamManager ? (
                                <video
                                    className={styles.main_video}
                                    streammanager={publisher}
                                    autoPlay={true}
                                    ref={videoRef}
                                />
                            ) : (
                                "화면 로딩중..."
                            )}

                            {/* 역할 태그 */}
                            <div
                                className={styles.main_roleTag}
                            >{`역할 - ${roleId}`}</div>
                        </div>

                        {/* 대사 관련 div */}
                        <div className={styles.scriptBox}>대사 나올거임</div>

                        {/* 다른 참가자 화면 */}
                        <div className={styles.container_2}>
                            {/* 참가자 배열의 길이에 따라 참가자 화면을 출력 */}

                            <div className={styles.player}>
                                {/* 참가자 비디오 1 */}
                                {subscribers.length > 0 ? (
                                    <video
                                        streamManager={subscribers[0]}
                                        autoPlay={true}
                                        ref={videoRef}
                                    />
                                ) : (
                                    "참가자 대기중"
                                )}
                            </div>

                            <div className={styles.player}>
                                {/* 참가자 비디오 2 */}
                                {subscribers.length > 1 ? (
                                    <video
                                        streamManager={subscribers[1]}
                                        autoPlay={true}
                                        ref={videoRef}
                                    />
                                ) : (
                                    "참가자 대기중"
                                )}
                            </div>

                            <div className={styles.player}>
                                {/* 참가자 비디오 3 */}
                                {subscribers.length > 2 ? (
                                    <video
                                        streamManager={subscribers[2]}
                                        autoPlay={true}
                                        ref={videoRef}
                                    />
                                ) : (
                                    "참가자 대기중"
                                )}
                            </div>

                            <div className={styles.player}>
                                <p>나레이션 공간</p>
                            </div>
                        </div>
                    </Col>

                    {/* 도우미 관련 컨테이너 */}
                    <Col className={styles.container_3} md="3">
                        {/* 도우미 말풍선 */}
                        <div className={styles.bubble}>
                            {/* 도우미 대사 */}
                            <div className={styles.helper_script}>
                                대사 테스트
                            </div>
                        </div>

                        {/* 도우미 캐릭터 */}
                        <div className={styles.helper}></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
