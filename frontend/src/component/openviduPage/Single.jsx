import { Col, Container, Row } from 'react-bootstrap';
import styles from './Single.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { OpenVidu } from 'openvidu-browser';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import * as faceapi from 'face-api.js'; // 얼굴인식 관련 api

// 환경 변수에 따라 애플리케이션 서버 URL을 설정합니다.
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://i10d209.p.ssafy.io/";

export default function Single() {
  // 상태 변수들을 선언합니다.

  // 멤버 ID, 방 만드는데 사용된다.
  // 1로 고정값 설정했는데, 백에서 api로 받아와야 한다.
  const [memberId] = useState(1)
  const [session, setSession] = useState(undefined); // OpenVidu 세션
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 주 비디오 스트림
  const [publisher, setPublisher] = useState(undefined); // 방장
  const [subscribers, setSubscribers] = useState([]); // 참가자들

  // // 역할 id와 책 id 변수로 설정했는데, 아래측에서 먹히지가 않는다.
  // // 손 봐야함
  // const roleId = 1;
  // const bookId = 1;

  // 화면 출력 관련
  const videoRef = useRef(null); // 비디오 요소를 참조하기 위한 useRef 훅
  const canvasRef = useRef(null); // 캔버스 요소를 참조하기 위한 useRef 훅
  const chromakeyRef = useRef(null) // 크로마키 요소를 참조하기 위한 useRef 훅

  // 녹화 관련
  const [recorder, setRecorder] = useState(null); // 녹화기
  const [recordedChunks, setRecordedChunks] = useState([]);

  // 녹화 시작 함수
  const startRecording = () => {
    if (mainStreamManager && mainStreamManager.stream && mainStreamManager.stream.getMediaStream()) {

      const mediaStream = mainStreamManager.stream.getMediaStream(); // 웹캠 스트림
      // const canvasStream = canvasRef.current.captureStream(); // 얼굴인식을 그린 스트림

      // 녹화 옵션
      const options = {
        mimeType: 'video/webm', // 녹화를 위한 코덱
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
      console.log("녹화 시작해라")
      setRecorder(recorder);
    }
  };
  

  // 녹화 중지 함수
  const stopRecording = () => {
    if (recorder) {
      recorder.stop(); // 녹화 중지
      console.log("녹화 그만해라")
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const recordedBlob = new Blob([event.data], { type: 'video/webm' });
          const url = URL.createObjectURL(recordedBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = '테스트가보자.webm';
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
      leaveSession()
    }
  }, []);

  // 페이지 입장 시, 화상 회의 즉시 입장된다.
  useEffect(() => {
    joinSession()
  }, [])

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
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "1920x1080", // 해상도
        frameRate: 30, // 주사율, 싸트북에서 30이상 안됌
        // insertMode: "APPEND",
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
    console.log("getToken")
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


  // --------------------------------------------------------------------
  // 얼굴인식 관련 useEffect
  useEffect(() => {
    // 모델을 로드하고 얼굴을 감지하는 함수 정의
    const loadModelsAndDetectFaces = async () => {
      // 얼굴 감지 옵션 설정
      const detectionOptions = {
        withLandmarks: true,
        withDescriptors: true,
        minConfidence: 0.5,
        MODEL_URLS: {
          // face-api.js에 필요한 모델의 URL 정의
          Mobilenetv1Model:
            "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json",

          // FaceExpressionModel: // 표정인식을 통한 감정표현
          // 이거 필요 없어서 주석처리함
          //   "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_expression_model-weights_manifest.json",

          TinyFaceLandmarkModel: // 작은 얼굴 탐지기
            "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-weights_manifest.json",

          FaceLandmark68TinyNet: // 눈썹, 눈, 코, 입, 턱선 등 얼굴 외곽선 그려줌
            "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-weights_manifest.json",

          FaceRecognitionModel: // 내 얼굴이 주위 상자 어디에 있는지 인식
            "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-weights_manifest.json",
        },
      };

      // 모델 로드
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(detectionOptions.MODEL_URLS.Mobilenetv1Model),

        // 작은 얼굴 탐지기 모델
        faceapi.nets.tinyFaceDetector.loadFromUri(
          detectionOptions.MODEL_URLS.TinyFaceLandmarkModel
        ),

        // 눈, 코, 입 윤곽 그려주는 모델
        faceapi.nets.faceLandmark68Net.loadFromUri(
          detectionOptions.MODEL_URLS.FaceLandmark68TinyNet
        ),

        // 얼굴 인식
        faceapi.nets.faceRecognitionNet.loadFromUri(
          detectionOptions.MODEL_URLS.FaceRecognitionModel
        ),

        // // 감정표현 관련 모델
        // faceapi.nets.faceExpressionNet.loadFromUri(
        //   detectionOptions.MODEL_URLS.FaceExpressionModel
        // ),
      ]);

      const videoEl = videoRef.current; // 비디오 요소 참조
      const canvas = canvasRef.current; // 캔버스 요소 참조

      const displaySize = { width: videoEl.videoWidth, height: videoEl.videoHeight }; // 비디오 크기

      faceapi.matchDimensions(canvas, displaySize); // 캔버스 크기 설정

      // 일정 간격으로 얼굴 감지 및 표현 함수 호출
      const interval = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks() // 화면에 얼굴 윤곽 그려주는 함수
          // .withFaceDescriptors()
        // .withFaceExpressions(); // 감정표현 관련 함수
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        // face-api와 모델을 통해 그리기
        // faceapi.draw.drawDetections(canvas, resizedDetections); // 네모난 틀 그려주는 기능
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        // faceapi.draw.drawFaceExpressions(canvas, resizedDetections); // 지금 느끼는 감정 표시해주는 기능
        
        // 얼굴인식을 통하 얻은 얼굴 위에 이미지 그리기
        // drawImageOnFaces(canvas, resizedDetections, "/imgs/b1.png")
      }, 50);

      // 클리어 인터벌 함수 반환
      return () => clearInterval(interval);
    };

    if (mainStreamManager && videoRef.current) {
      mainStreamManager.addVideoElement(videoRef.current); // 비디오 요소를 스트림 매니저에 추가
      loadModelsAndDetectFaces(); // 모델 로드 및 얼굴 감지 함수 호출
    }

    // 컴포넌트가 마운트 해제될 때 실행될 클린업 함수 정의
    return () => {
      if (mainStreamManager && mainStreamManager.removeVideoElement) {
        mainStreamManager.removeVideoElement(videoRef.current); // 비디오 요소를 스트림 매니저에서 제거
      }
    };
  }, [mainStreamManager]);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const videoEl = videoRef.current; // 비디오 요소 참조
      const canvas = canvasRef.current; // 캔버스 요소 참조

      videoEl.onloadedmetadata = () => {
        const displaySize = { width: videoEl.videoWidth, height: videoEl.videoHeight }; // 비디오 크기
        faceapi.matchDimensions(canvas, displaySize); // 캔버스 크기 설정
      };
    }
  }, []);

  // // 이미지를 얼굴 위에 씌우는 함수
  // const drawImageOnFaces = (canvas, detections, imageUrl) => {
  //   detections.forEach((detection) => {
  //     const { x, y, width, height } = detection.detection.box;
  //     const image = new Image();
  //     image.src = imageUrl;
  //     image.onload = () => {
  //       canvas.getContext('2d').drawImage(image, x, y, width, height);
  //     };
  //   });
  // };

  return (
    // 전체 배경
    <div className={styles.bg}>

      {/* 별, CSS 관련 클래스가 2개 이상일 때 아래와 같은 방법으로 사용 가능 */}
      <div className={`${styles.star} ${styles.star1} ${styles.blinking}`}></div>
      <div className={`${styles.star} ${styles.star2}`}></div>
      <div className={`${styles.star} ${styles.star3}`}></div>
      <div className={`${styles.star} ${styles.star4}`}></div>

      <Container>
        <Row>
          {/* 메인 화면 COLUMN */}
          <Col className={styles.container_1} md="9">
            <button onClick={startRecording}>녹화 시작</button>
            <button onClick={stopRecording}>녹화 중지</button>
            <div className={styles.main_container} id='main_container'>

              {/* 메인 비디오 화면 */}
              {mainStreamManager ? <video className={styles.main_video} streammanager={publisher} autoPlay={true} ref={videoRef} /> : "화면 로딩중..."}

              {/* 역할 태그 */}
              <div className={styles.main_roleTag}>{`역할 - ${memberId}`}</div>

              {/* 얼굴인식 캔버스 */}
              <canvas className={styles.main_canvas} ref={canvasRef} />

              {/* 크로마키 캔버스 */}
              {/* <canvas className={styles.main_chromakey} ref={chromakeyRef}/> */}
            </div>

            {/* 대사 관련 div */}
            <div className={styles.scriptBox}>대사 나올거임</div>

            {/* 다른 참가자 화면 */}
            <div className={styles.container_2}>

              {/* 참가자 배열의 길이에 따라 참가자 화면을 출력 */}
              <div className={styles.player}>
                {/* {subscribers.length > 0 ? <SubVideo streamManager={subscribers[0]} /> : "참가자 대기중"} */}
              </div>
              <div className={styles.player}>
                {/* {subscribers.length > 1 ? <SubVideo streamManager={subscribers[1]} /> : "참가자 대기중"} */}
              </div>
              <div className={styles.player}>
                {/* {subscribers.length > 2 ? <SubVideo streamManager={subscribers[2]} /> : "참가자 대기중"} */}
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
