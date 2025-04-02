import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function KakaoCallback({ setUser }) {
  const navigate = useNavigate();
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const code = new URL(window.location.href).searchParams.get("code");
    console.log("인가코드는 다음과 같습니다.:", code);

    const sendCodeToBackend = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/members/kakao/login",
          { code: code },
          { withCredentials: true }
        );

        console.log("🎉 로그인 성공! 사용자 정보:", res.data);

        // 사용자 정보를 App에서 관리하게 넘김
        setUser(res.data);

        // 캘린더 페이지로 이동
        navigate("/calendar");
      } catch (error) {
        console.error("로그인 실패!", error);
        navigate("/"); // 실패 시 홈으로 리다이렉트
      }
    };

    if (code) {
      sendCodeToBackend();
    }
  }, [navigate, setUser]);

  return <div>로그인 처리 중입니다... 잠시만 기다려주세요!</div>;
}
