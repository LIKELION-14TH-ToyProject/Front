const ROUTES = {
  // 로그인/회원가입
  LOGIN: "/", // 로그인 (접속 시 가장 먼저 보이는 화면)
  SIGNUP: "/signup", // 회원가입

  // 일기
  DIARY_LIST: "/diary", // 1-1. 일기 목록 (로그인 후 메인)
  DIARY_WRITE: "/diary/write", // 1-2. 일기 작성
  DIARY_DETAIL: "/diary/:id", // 1-3. 일기 상세

  // 마이페이지
  MY_PAGE: "/mypage", // 2-1. 마이페이지 (계정 정보 + 로그아웃)
};

export default ROUTES;
