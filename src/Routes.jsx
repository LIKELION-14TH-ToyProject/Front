const ROUTES = {
  // 로그인/회원가입
  LOGIN: "/", // 로그인 (접속 시 가장 먼저 보이는 화면)
  SIGNUP: "/signup", // 회원가입

  // 온보딩(회원 가입 시에 넘어가는 페이지)
  ONBOARDING_NICKNAME: "/onboarding/nickname", // 0-1. 사용할 닉네임 받기
  ONBOARDING_BIRTHDATE: "/onboarding/birthdate", // 0-2. 생년월일 받기
  ONBOARDING_PURPOSE: "/onboarding/purpose", // 0-3. 일기 작성 목적 받기

  // 일기
  DIARY_LIST: "/diary", // 1-1. 일기 목록 (로그인 후 메인)
  DIARY_WRITE: "/diary/write", // 1-2. 일기 작성
  DIARY_DETAIL: "/diary/:id", // 1-3. 일기 상세

  // 마이페이지
  MY_PAGE: "/mypage", // 2-1. 마이페이지 (계정 정보+ 내 정보 수정 + 로그아웃)
  MY_INFO_EDIT: "/mypage/edit", // 2-1-1. 내 정보 수정(아이디, 닉네임, 일기 작성 목적)
};

export default ROUTES;
