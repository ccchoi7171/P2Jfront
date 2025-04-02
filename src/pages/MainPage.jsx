import React from "react";
import {} from "react-router-dom";

export default function MainPage() {
  const REST_API_KEY = "d8e1934bd8359a4c286f17336d39c6e2";
  const REDIRECT_URI = "http://localhost:3000/kakao/callback";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden">
      {/* P2J 이미지 */}
      <div className="absolute w-[31.25vw] h-[58.61vh] left-[7.97vw] top-[20.64vh] bg-[url('/P2J.png')] bg-contain bg-no-repeat" />

      {/* 카카오 로그인 버튼 */}
      <button
        onClick={handleKakaoLogin}
        className="absolute w-[31.25vw] h-[8.33vh] left-[58.33vw] top-[43.80vh] bg-[url('/kakao_login.png')] bg-contain bg-no-repeat rounded-xl transition-all duration-150 active:translate-y-[2px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
        aria-label="카카오 로그인"
      >
        <span className="sr-only">카카오 로그인</span>
      </button>

      {/* 카카오 설명 */}
      <p className="absolute left-[65.36vw] top-[53.8vh] w-[17.44vw] h-[2.31vh] text-[1vw] text-[#949494]">
        카카오 계정으로 간편하게 로그인하세요
      </p>

      {/* 타이틀 */}
      <h1 className="absolute left-[28.64vw] top-[57.31vh] w-[23.96vw] h-[10.09vh] font-bold text-[5.2vw] leading-[6.3vw] text-[#F38B68]">
        P2J
      </h1>

      {/* 서브 타이틀 */}
      <h2 className="absolute left-[28.64vw] top-[68.33vh] w-[14.17vw] h-[3.8vh] font-semibold text-[1.77vw] leading-[2.1vw] text-[#C53C62]">
        Planner with You
      </h2>

      {/* 설명 */}
      <p className="absolute left-[28.64vw] top-[72.96vh] w-[28.9vw] h-[5vh] font-semibold text-[1.77vw] leading-[2.1vw] text-[#E05054]">
        Perceiving to Judging with AI
      </p>

      {/* 하단 메뉴 */}
      <div className="absolute left-[36.25vw] top-[94.81vh] w-[3.85vw] h-[2.31vh] text-[1vw] text-[#949494]">
        회사소개
      </div>
      <div className="absolute left-[42.71vw] top-[94.81vh] w-[3.85vw] h-[2.31vh] text-[1vw] text-[#949494]">
        고객센터
      </div>
      <div className="absolute left-[49.17vw] top-[94.81vh] w-[3.85vw] h-[2.31vh] text-[1vw] text-[#949494]">
        이용약관
      </div>
      <div className="absolute left-[55.62vw] top-[94.81vh] w-[8.07vw] h-[2.31vh] text-[1vw] text-[#949494]">
        개인정보 처리방침
      </div>

      {/* 하단 카카오 이미지 */}
      <div className="absolute left-[87.29vw] top-[94.62vh] w-[10.62vw] h-[2.77vh] bg-[url('/kakao_powered.png')] bg-contain bg-no-repeat" />
    </div>
  );
}
