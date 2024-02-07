import React, { useEffect, useRef } from 'react';
import styles from './MainVidu.module.css'; // MainVidu 컴포넌트에 대한 CSS 모듈 import
import * as faceapi from 'face-api.js'; // face-api.js를 import

export default function MainVidu({ streamManager, UserName }) {
  const videoRef = useRef(null); // 비디오 요소를 참조하기 위한 useRef 훅
  const canvasRef = useRef(null); // 캔버스 요소를 참조하기 위한 useRef 훅

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
        // .withFaceExpressions(); // 감정표현 관련 함수
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        // face-api와 모델을 통해 그리기
        // faceapi.draw.drawDetections(canvas, resizedDetections); // 네모난 틀 그려주는 기능
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        // faceapi.draw.drawFaceExpressions(canvas, resizedDetections); // 지금 느끼는 감정 표시해주는 기능
      }, 100);

      // 클리어 인터벌 함수 반환
      return () => clearInterval(interval);
    };

    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current); // 비디오 요소를 스트림 매니저에 추가
      loadModelsAndDetectFaces(); // 모델 로드 및 얼굴 감지 함수 호출
    }

    // 컴포넌트가 마운트 해제될 때 실행될 클린업 함수 정의
    return () => {
      if (streamManager && videoRef.current) {
        streamManager.removeVideoElement(videoRef.current); // 비디오 요소를 스트림 매니저에서 제거
      }
    };
  }, [streamManager]);

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

  return (
    <div className={styles.main_container}>
      {/* 사용자 역할 표시 */}
      <div className={styles.main_roleTag}>{`역할 - ${UserName}`}</div>
      {/* 웹캠 비디오 요소 */}
      <video className={styles.main_video} autoPlay={true} ref={videoRef} />
      {/* 얼굴 감지 및 표현을 위한 캔버스 요소 */}
      <canvas className={styles.main_canvas} ref={canvasRef} />
    </div>
  );
}
