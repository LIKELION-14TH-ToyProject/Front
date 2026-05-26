import axios from "axios";
import useAuthStore from "../src/store/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000, // 15초 안에 응답 없으면 자동 실패 처리 - 뭔가 넣어봐도 좋을 거 같아서
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  // 로그인 유지해서 필요한 기능들 토큰
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//응답 인터셉터 필요

api.interceptors.response.use(
  (response) => response, // 성공 시 응답 그대로 반환
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default api;
