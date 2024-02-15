import { Col, Container, Row } from "react-bootstrap";
import styles from "./MakePage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { OpenVidu } from "openvidu-browser";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// 환경 변수에 따라 애플리케이션 서버 URL을 설정합니다.
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://i10d209.p.ssafy.io/";

export default function Single({ setShowHeader }) {
  // 상태 변수들을 선언합니다.

  // 멤버 ID, 방 만드는데 사용된다.
  // 1로 고정값 설정했는데, 백에서 api로 받아와야 한다.
  const [session, setSession] = useState(undefined); // OpenVidu 세션
  const [roomId, setRoomId] = useState(null); // 방 시작을 위한 방 번호
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 주 비디오 스트림
  const [publisher, setPublisher] = useState(undefined); // 방장
  const [subscribers, setSubscribers] = useState([]); // 참가자들
  const [roomStart, setRoomStart] = useState(false); // 방 시작을 위한 상태

  // 값 넘겨 받는 곳
  // 순서대로 싱글/멀티모드, 책 id, 역할 id
  const location = useLocation();
  const playMode = location.state ? location.state.playMode : null;
  const bookId = location.state ? location.state.bookId : null;
  const roleId = location.state ? location.state.roleId : null;
  const roleName = location.state ? location.state.roleName : null;
  const memberId = localStorage.getItem("memberId")

  const branchNum = 1; // 분기점 사용할 경우 값 새롭게 할당. 이전까진 1로 고정값

  // 나가기 버튼을 위함
  const navigate = useNavigate()

  const apiTest = function () {
    console.log("게임 모드 : ", playMode);
    console.log("책 번호 : ", bookId);
    console.log("역할 번호 : ", roleId);
    console.log("나의 역할 : ", roleName);
    console.log("멤버 id : ", memberId);
  };

  useEffect(() => {
    apiTest();
  }, []);

  useEffect(() => {
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, []);

  // 화면 출력 관련
  const videoRef = useRef(null); // 비디오 요소를 참조하기 위한 useRef 훅

  // 대사 관련
  const [scriptLine, setScriptLine] = useState([]); // 대사를 담을 list
  const [scriptIndex, setScriptIndex] = useState(0); // 대사 순서 관리

  // 도우미 대사 관련
  const [helperScriptLine, setHelperScriptLine] = useState([]); // 도우미 대사를 담을 list
  const [helperScriptIndex, setHelperScriptIndex] = useState(0); // 도우미 대사 순서 관리

  // 동화책 시작 관련
  const [countDown, setCountDown] = useState(3);

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
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
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
        audioSource: undefined, // 오디오 장비
        videoSource: undefined, // 비디오 장비
        publishAudio: true, // 오디오 동적 처리
        publishVideo: true, // 비디오 동적 처리
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
  // roomId도 같이 설정한다.
  const getToken = async () => {
    const { token, roomId } = await createSession(); // 방 생성하면서 받은 데이터를 변수에 저장
    setRoomId(roomId); // roomId 설정
    console.log("getToken and roomId");
    console.log("getToken 함수에서 받아오는 roomId : ", roomId);
    return token; // return 으로 token만 받음
  };

    // 세션 생성 함수
    const createSession = async () => {
        const response = await axios.put(
            APPLICATION_SERVER_URL + `api/rooms/${memberId}`,
            {
                roleId: roleId,
                bookId: bookId,
            },
            { headers: { "Content-Type": "application/json" } }
        );
        console.log(response.data.data.token + " 토큰 생성");
        console.log("방 번호 : ", response.data.data.roomId);
        console.log("역할 id : ", roleId);
        console.log("책 id : ", bookId);

    return {
      token: response.data.data.token, // 방 접속을 위한 token값 반환
      roomId: response.data.data.roomId, // 방 시작을 위한 roomId값 반환
    };
  };

  useEffect(() => {
    if (mainStreamManager && videoRef.current) {
      mainStreamManager.addVideoElement(videoRef.current); // 비디오 요소를 스트림 매니저에 추가
    }

    // 컴포넌트가 마운트 해제될 때 실행될 클린업 함수 정의
    return () => {
      if (mainStreamManager && mainStreamManager.removeVideoElement) {
        mainStreamManager.removeVideoElement(videoRef.current); // 비디오 요소를 스트림 매니저에서 제거
      }
    };
  }, [mainStreamManager]);

  // 혼자하기 할 때 3초 뒤에 시작하도록 설정
  useEffect(() => {
    if (playMode === "SINGLE" && session && publisher) {
      // 설정한 시간이 지나면 타이머와 동화시작 관련 상태변수의 값을 true로 설정
      const timeout = setTimeout(() => {
        setRoomStart(true);
      }, 3 * 1000);

      // 시간이 얼마나 흘렀는지 확인하기 위한 타이머
      const timer = setInterval(() => {
        setCountDown((prev) => prev - 1); // 1초씩 감소
      }, 1000);

      // clena up 함수
      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [session, publisher]);

  // console 창에 찍을 timer
  useEffect(() => {
    if (playMode === "SINGLE" && countDown > 0) {
      console.log(`시작까지 ${countDown}초 남았습니다.`);
    } else if (countDown === 0) {
      console.log("시작~~~~~~~~~~~~~하겠습니다~~~~~~~~~~");
      console.log(scriptLine[0]);
    }
  }, [scriptLine, countDown]);

    // 대사 데이터 요청
    useEffect(() => {
        axios
            .get(APPLICATION_SERVER_URL + `api/books/${bookId}/${branchNum}`)
            .then((res) => {
                setScriptLine(res.data.data);
            })
            .catch((err) => {
                console.error("에러 떳지롱 ㅋㅋ", err);
            });
    }, []);

  // 일정 시간이 지나면 다음 대사가 나오도록 하는 useEffect
  useEffect(() => {
    const intervalScript = setInterval(() => {
      setScriptIndex((prevIndex) => {
        if (roomStart && prevIndex < scriptLine.length - 1) {
          // 보여줄 대사가 남았다면?
          console.log("현재 대사 : ", scriptLine[prevIndex + 1]);
          return prevIndex + 1;
        }
        // 방 시작 안했거나 대사 데이터 아직 안 받아왔을 경우
        else if (!roomStart || scriptLine.length === 0) {
          console.log("대사 받아오는 중...");
          return prevIndex;
        } else {
          // 모든 대사를 보여줬다
          clearInterval(intervalScript); // interval을 정리한다.
          console.log("대사 다 보여줬어 ㅎㅎ");
          return scriptLine.length;
        }
      });
    }, 7 * 1000); // 7초 타이머 설정

    return () => {
      clearInterval(intervalScript);
    };
  }, [roomStart, scriptLine]);

  // 대사에 맞는 배경 얻어오는 함수
  const getBackGruond = (backgroundUrl) => {
    if (roomStart && backgroundUrl) {
      return `url(${backgroundUrl})`;
    } else {
      return "";
    }
  };

    // 사람이 다 왔거나 타이머 종료되면 자동 시작
    useEffect(() => {
        if (subscribers.length === 2) {
            axios
                .put(APPLICATION_SERVER_URL + `api/rooms/${roomId}/start`)
                .then((res) => {
                    console.log("동화책 읽어보자~", res);
                    console.log(scriptLine[0]);
                    setRoomStart(true); // 방 시작했을 경우에만 대사가 출력
                })
                .catch((err) => {
                    console.error("아직 사람이 없어", err);
                });
        }
    }, [roomId, subscribers.length]);

    //   useEffect(() => {
    //     // 방 시작했고 녹화중 아니면 녹화 시작 호출
    //     if (roomStart && !isRecording) {
    //       startRecording();
    //     }

    //     // 대사 다 불러냈고 녹화중이라면 녹화 중지 호출
    //     if (scriptIndex === scriptLine.length - 1 && isRecording) {
    //       stopRecording();
    //     }
    //   }, [roomStart, scriptIndex, scriptLine, isRecording]);

    //   // 녹화 시작 함수
    //   const startRecording = () => {
    //     navigator.mediaDevices
    //       .getDisplayMedia({ video: {mediaSource: "screen"}, audio: true })
    //       .then((stream) => {
    //         mediaRef.current = stream;

    //         const recordOption = {
    //           mimeType: "video/webm",
    //           mirror: true,
    //         };
    //         const recorder = new MediaRecorder(stream, recordOption);

    //         recorder.ondataavailable = (event) => {
    //           chunks.push(event.data);
    //         };

    //         recorder.onstop = () => {
    //           setChunks(chunks);
    //         };

    //         recorder.start();
    //         console.log("책 읽으니까 녹화 시작할게~");
    //         setIsRecording(true);
    //         setMediaRecorder(mediaRecorder);
    //       });
    //   };

    //   // 녹화 종료 함수
    //   const stopRecording = () => {
    //     if (mediaRecorder) {
    //       mediaRecorder.stop(); // 녹화 중지
    //       console.log("녹화 그만할게~")

    //       // 녹화가 멈출 때 실행되는 부분
    //       mediaRecorder.onstop = () => {
    //         // 녹화된 데이터를 하나의 Blob으로 만듦
    //         const blob = new Blob(chunks, { type: "video/webm" });

    //         // Blob을 다운로드할 수 있는 URL 생성
    //         const url = URL.createObjectURL(blob);

    //         // 다운로드 링크 생성 및 클릭
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = "recorded.webm";
    //         document.body.appendChild(a);
    //         a.click();

    //         // 사용한 URL 해제
    //         URL.revokeObjectURL(url);
    //       };
    //     }
    //   };

  // 나가기 버튼 온클릭 함수
  const exitToMain = () => {
    navigate("/main");
    leaveSession();
  };

    useEffect(() => {
        axios
            .get(APPLICATION_SERVER_URL + `api/roles/1/helpers`)
            .then((res) => {
                setHelperScriptLine(res.data.data);
            })
            .catch((err) => {
                console.error("에러 떳지롱 ㅋㅋ", err);
            });
    }, []);

  // 도우미 대사 출력
  useEffect(() => {
    const helperintervalScript = setInterval(() => {
      setHelperScriptIndex((prevIndex) => {
        if (roomStart && prevIndex < helperScriptLine.length - 1) {
          // 보여줄 대사가 남았다면?
          console.log("현재 대사 : ", helperScriptLine[prevIndex + 1]);
          return prevIndex + 1;
        }
        // 방 시작 안했거나 대사 데이터 아직 안 받아왔을 경우
        else if (!roomStart || helperScriptLine.length === 0) {
          console.log("도우미 대사 받아오는 중...");
          return prevIndex;
        } else {
          // 모든 대사를 보여줬다
          clearInterval(helperintervalScript); // interval을 정리한다.
          console.log("대사 다 보여줬어 ㅎㅎ");
          return helperScriptLine.length;
        }
      });
    }, 7 * 1000); // 7초 타이머 설정

    return () => {
      clearInterval(helperintervalScript);
    };
  }, [roomStart, helperScriptLine]);

  return (
    // 전체 배경
    <div className={styles.bg}>
      {/* 별, CSS 관련 클래스가 2개 이상일 때 아래와 같은 방법으로 사용 가능 */}
      <div
        className={`${styles.star} ${styles.star1} ${styles.blinking}`}
      ></div>
      <div className={`${styles.star} ${styles.star2} ${styles.blinking2}`}></div>
      <div className={`${styles.star} ${styles.star3} ${styles.blinking}`}></div>
      <div className={`${styles.star} ${styles.star4} ${styles.blinking}`}></div>
      <div className={`${styles.star} ${styles.star5} ${styles.blinking2}`}></div>
      <div className={`${styles.star} ${styles.star6} ${styles.blinking}`}></div>
      <div className={`${styles.star} ${styles.star7} ${styles.blinking2}`}></div>
      <div className={`${styles.star} ${styles.star8} ${styles.blinking}`}></div>
      <div className={`${styles.star} ${styles.star9} ${styles.blinking2}`}></div>
      <div className={`${styles.star} ${styles.star10} ${styles.blinking}`}></div>
      <div className={`${styles.star} ${styles.star11} ${styles.blinking2}`}></div>

      <div className={styles.exitzz}>
        <div className={styles.exit} onClick={exitToMain}>
          <img
            src="../imgs/logoutIcon.png"
            className={styles.exitIcon}
          ></img>
          <p className={styles.exitText}>나가기</p>
        </div>
      </div>

      {/* 디자인 이 위에서 건드리면 됩니다~ */}
      <Container>
        <Row>
          {/* 메인 화면 COLUMN */}
          <Col className={styles.container_1} md="9">
            {/* <button onClick={startRecording}>녹화 시작</button> */}
            {/* <button onClick={stopRecording}>녹화 중지</button> */}
            <div
              className={styles.main_container}
              style={{
                backgroundImage: getBackGruond(
                  roomStart && scriptLine.length > 0
                    ? scriptLine[scriptIndex]?.backgroundUrl
                    : null
                ),
              }}
            ></div>

            {/* 대사 관련 div */}
            <div className={`${styles.scriptBox}`}>
              {roomStart && scriptLine.length > 0 ? (
                scriptIndex < scriptLine.length ? (
                  <p className={styles.p}>
                    {scriptLine[scriptIndex].scriptLine}
                  </p>
                ) : (
                  "- 끝 -"
                )
              ) : (
                "잠깐만 기다려봐😅 곧 친구들이 올거야"
              )}
            </div>

            {/* 참가자 화면 */}
            <div className={styles.container_2}>
              <div className={styles.player}>
                {/* 메인 비디오 화면 */}
                {publisher && publisher.stream ? (
                  <>
                    <video
                      className={styles.test}
                      streammanager={publisher}
                      autoPlay={true}
                      ref={videoRef}
                    />
                    <div
                      className={styles.sub_roleTag}
                    >{`역할 - ${roleName}`}</div>
                  </>
                ) : (
                  "참가자 대기중"
                )}
              </div>

              <div className={styles.player}>
                {/* 참가자 1 */}
                {subscribers.length > 0 ? (
                  <>
                    <video
                      className={styles.test}
                      autoPlay={true}
                      ref={(videoRef) => {
                        if (videoRef && subscribers[0]) {
                          const streamManager = subscribers[0];
                          streamManager.addVideoElement(videoRef); // 해당 구독자의 비디오 요소 추가
                        }
                      }}
                    />
                    {/* <div className={styles.sub_roleTag}>{`흐음 - ${subInfo[0]?.roleName}`}</div> */}
                  </>
                ) : (
                  "참가자 대기중😴"
                )}
              </div>

              <div className={styles.player}>
                {/* 참가자 2 */}
                {subscribers.length > 1 ? (
                  <>
                    <video
                      className={styles.test}
                      autoPlay={true}
                      ref={(videoRef) => {
                        if (videoRef && subscribers[1]) {
                          const streamManager = subscribers[1];
                          streamManager.addVideoElement(videoRef); // 해당 구독자의 비디오 요소 추가
                        }
                      }}
                    />
                    {/* <div className={styles.sub_roleTag}>{`흐음 - ${roleName}`}</div> */}
                  </>
                ) : (
                  "참가자 대기중😴"
                )}
              </div>

              <div className={styles.player}>
                {/* 참가자 3 */}
                {subscribers.length > 2 ? (
                  <>
                    <video
                      className={styles.test}
                      autoPlay={true}
                      ref={(videoRef) => {
                        if (videoRef && subscribers[2]) {
                          const streamManager = subscribers[2];
                          streamManager.addVideoElement(videoRef); // 해당 구독자의 비디오 요소 추가
                        }
                      }}
                    />
                    {/* <div className={styles.sub_roleTag}>{`흐음 - ${roleName}`}</div> */}
                  </>
                ) : (
                  "참가자 대기중😴"
                )}
              </div>
            </div>
          </Col>

          {/* 도우미 관련 컨테이너 */}
          <Col className={styles.container_3} md="3">
            {/* 도우미 말풍선 */}
            <div className={styles.bubble}>
              {/* 도우미 대사 */}
              <div className={styles.helperScript}>
                {roomStart && helperScriptLine.length > 0 ? (
                  helperScriptIndex < helperScriptLine.length ? (
                    <p className={styles.p}>
                      {helperScriptLine[helperScriptIndex]?.helperLine}
                    </p>
                  ) : (
                    " 고생염 "
                  )
                ) : (
                  "잠깐만 기다려줘 친구들이 들어오면 시작할꺼야!!😁"
                )}
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