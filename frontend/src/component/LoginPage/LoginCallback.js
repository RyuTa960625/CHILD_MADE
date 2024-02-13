import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function LoginCallback() {
    const [searchParams] = useSearchParams();
    // const [accessToken, setAccessToken] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
        async function getTokens() {
            const accessToken = await searchParams.get("access-token");
            const memberId = await searchParams.get("member-id");
            const nextPage = await searchParams.get("next");

            // setAccessToken(newAccessToken);
            console.log("accessToken", accessToken);
            console.log("memberId", memberId);
            console.log("nextPage", nextPage);
            if (accessToken !== null) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("memberId", memberId);
            }

            if (localStorage.getItem("accessToken")) {
                if (nextPage === "main") {
                    return navigate("/main");
                } else {
                    return navigate("/get-user-nickname");
                }
            } else {
                return navigate("/intro");
            }
        }

        getTokens();
    }, []);

    return (
        <div>
            로그인 중입니다.
            {/* <p>Access Token : {accessToken}</p>
      <p>Refresh Token : {refreshToken}</p> */}
        </div>
    );
}

export default LoginCallback;
