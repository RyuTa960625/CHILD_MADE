import React from "react";
import MainVidu from "./MainVidu"; // OpenVidu에서 제공하는 비디오 컴포넌트를 가져옵니다.

export default function UserVideoComponent({ streamManager }) {
    return (
        <div>
            {/* streamManager가 존재하는 경우에만 다음을 실행합니다. */}
            {streamManager ? (
                <div>
                    {/* OpenViduVideoComponent를 사용하여 streamManager를 전달하여 비디오를 렌더링합니다. */}
                    <MainVidu streamManager={streamManager} />
                    {/* 역할 표시 */}
                </div>
            ) : null}{" "}
            {/* streamManager가 존재하지 않는 경우 null을 반환하여 아무것도 렌더링하지 않습니다. */}
        </div>
    );
}
