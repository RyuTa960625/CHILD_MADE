import React, { useEffect, useRef } from 'react';
import styles from './SubVidu.module.css'

export default function OpenViduVideoComponent({ streamManager, UserName }) {
  const videoRef = useRef(null); // video element에 대한 참조를 생성합니다.

  useEffect(() => {
    // useEffect 훅을 사용하여 컴포넌트가 mount될 때와 streamManager가 변경될 때마다 실행됩니다.
    if (streamManager && videoRef.current) {
      // streamManager가 존재하고 videoRef가 유효한 경우에만 실행됩니다.
      streamManager.addVideoElement(videoRef.current); // streamManager에 video element를 추가합니다.
    }

    // useEffect 내부에서 반환하는 함수는 cleanup 함수로, 컴포넌트가 unmount될 때 실행됩니다.
    return () => {
      if (streamManager && videoRef.current) {
        // streamManager가 존재하고 videoRef가 유효한 경우에만 실행됩니다.
        streamManager.removeVideoElement(videoRef.current); // streamManager에서 video element를 제거합니다.
      }
    };
  }, [streamManager]); // useEffect의 의존성 배열로 streamManager를 지정하여 해당 값이 변경될 때마다 효과가 실행됩니다.

  return (
    <div className={styles.sub_container}>
      <div className={styles.sub_roleTag}>{`흐음 - ${UserName}`}</div>

      {/* ref를 사용하여 video element에 videoRef를 할당하고 JSX로 반환합니다. */}
      <video className={styles.sub_video} autoPlay={true} ref={videoRef} />
    </div>
  )
};
