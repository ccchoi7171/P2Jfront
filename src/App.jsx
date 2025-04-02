import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

// 페이지 컴포넌트 임포트
import MainPage from "./pages/MainPage";
import KakaoCallback from "./pages/KakaoCallback";
import CalendarPage from "./pages/CalendarPage";
<<<<<<< HEAD
=======
import FriendList from "./components/Friend/FriendsList";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
>>>>>>> lgd

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 앱 최초 실행 시 사용자 정보 불러오기
  // Axios 인터셉터 설정 (한 번만 실행되도록 useEffect 사용)
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // /token/refresh 요청 실패면 바로 return (재귀 방지)
        if (originalRequest.url.includes("/api/members/token/refresh")) {
          console.warn("리프레시 토큰 요청 실패");
          return Promise.reject(error);
        }

        //  /me 요청에서 401은 리프레시 시도하지 않음!
        if (originalRequest.url.includes("/api/members/me")) {
          console.log("/me 요청 401 - 리프레시 안 함");
          return Promise.reject(error);
        }

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            console.log("토큰 갱신 시도");

            const res = await axios.post(
              "http://localhost:8080/api/members/token/refresh",
              {},
              { withCredentials: true }
            );

            console.log("토큰 갱신 성공", res);

            // 기존 요청 재시도
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("리프레시 실패", refreshError);
            setUser(null);
            window.location.href = "/";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log("사용자 정보 요청 시작");

      try {
        const res = await axios.get("http://localhost:8080/api/members/me", {
          withCredentials: true,
        });

        console.log("사용자 정보 수신", res.data);
        setUser(res.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(" 비로그인 상태입니다.");
        } else {
          console.error("사용자 정보 요청 실패:", error);
        }

        // 401이든 뭐든 그냥 null로 세팅하고 끝
        setUser(null);
      } finally {
        setLoading(false);
        console.log("로딩 종료");
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    console.log("로딩 중입니다…");
    return <div>로딩 중…</div>;
  }

  console.log("라우팅 시작, user:", user);
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        {/* 메인페이지 */}
=======
        {/* 메인 페이지 */}
>>>>>>> lgd
        <Route path="/" element={<MainPage user={user} />} />

        {/* 카카오 콜백 페이지 */}
        <Route
          path="/kakao/callback"
          element={<KakaoCallback setUser={setUser} />}
        />

        {/* 캘린더 페이지 - 로그인한 사용자만 접근 가능 */}
        <Route
          path="/calendar"
          element={
            user ? (
              <CalendarPage user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
<<<<<<< HEAD
=======

        {/* 왼쪽 사이드바 - 다른 페이지와 별도로 존재하는 것이 아닌 경우 제거 가능 */}
        <Route path="/left-sidebar" element={<LeftSidebar />} />

        {/* 친구 목록 페이지 */}
        <Route path="/friends" element={<FriendList />} />
>>>>>>> lgd
      </Routes>
    </Router>
  );
}
