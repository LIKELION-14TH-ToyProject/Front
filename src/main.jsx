import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error?.response?.status === 401) return false; // 401이면 재시도 안 함
        return failureCount < 1; // 그 외 에러는 1번만 재시도
      },
      staleTime: 1000 * 30, // 30초 동안은 신선한 데이터로 (불필요한 재요청 방지)
    },
  },
});

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>,
);
// 앱의 entry point
