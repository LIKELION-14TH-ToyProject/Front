// 새로 전면 수정해야함... ㅠ.ㅠ
// 피그마 파일 중간 끝나고 최종 확인해서 수정

import { useMyPage } from "../hooks/useMyInfo";
import Modal from "../components/common/Modal";
import Toast from "../components/common/Toast";
import useToast from "../hooks/useToast";
import Cake from "../assets/icons/cake.svg";
import Chat from "../assets/icons/chat.svg";

function MyPage() {
  const {
    userInfo,
    isLogoutModalOpen,
    handleGoToEdit,
    handleLogoutClick,
    handleLogoutCancel,
    handleLogoutConfirm: baseLogoutConfirm,
  } = useMyPage();

  const { toast, showToast } = useToast();

  const handleLogoutConfirm = () => {
    handleLogoutCancel();
    showToast("로그아웃되었습니다.");
    setTimeout(() => baseLogoutConfirm(), 1500);
  };

  const formatBirthdate = (birthdate) => {
    if (!birthdate) return "생년월일 미설정";
    const [year, month, day] = birthdate.split("-");
    return `${year}. ${month}. ${day}.`;
  };

  return (
    <section className="bg-main-5 flex flex-1 flex-col">
      {/* 프로필 영역 */}
      <div className="bg-white px-[1.5rem] pt-[1.875rem] pb-[1.625rem]">
        {/* 닉네임 + 아이디 */}
        <div className="mb-[0.5rem] flex items-center gap-[0.25rem]">
          <span className="text-[1.25rem] font-medium tracking-[-0.03em] text-gray-100">
            {userInfo.nickname || "닉네임 미설정"}
          </span>
          <span className="text-gray-70 text-[0.875rem] font-normal tracking-[-0.03em]">
            ({userInfo.id || "아이디 미설정"})
          </span>
        </div>

        {/* 생년월일 — 케이키 + 날짜 */}
        <div className="mb-[0.25rem] flex items-center gap-[0.25rem]">
          <img
            src={Cake}
            alt="birthday"
            className="h-[1rem] w-[1rem] shrink-0"
          />
          <span className="text-gray-70 text-[0.875rem] font-normal tracking-[-0.03em]">
            {formatBirthdate(userInfo.birthdate)}
          </span>
        </div>

        {/* 일기 작성 목적 */}
        <div className="flex items-center gap-[0.25rem]">
          <img
            src={Chat}
            alt="purpose"
            className="h-[1rem] w-[1rem] shrink-0"
          />
          <span className="text-gray-70 text-[0.875rem] font-normal">
            {userInfo.purpose || "작성 목적 미설정"}
          </span>
        </div>
      </div>

      {/* 구분선 넣어줘야함 */}
      <div className="h-[0.56rem]" />

      {/* 마이페이지 메뉴 */}
      <div className="flex flex-col bg-white">
        {/* 내 정보 수정 */}
        <button
          type="button"
          onClick={handleGoToEdit}
          className={[
            "px-[1.625rem] py-[0.9375rem] text-left",
            "text-[1rem] font-medium tracking-[-0.03em] text-gray-100",
            "cursor-pointer border-none bg-transparent",
            "border-transparent",
            "hover:bg-gray-1 transition-colors duration-150",
          ].join(" ")}
        >
          내 정보 수정
        </button>

        <div className="bg-main-5 h-[0.06rem]" />

        {/* 로그아웃 */}
        <button
          type="button"
          onClick={handleLogoutClick}
          className={[
            "px-[1.625rem] py-[0.9375rem] text-left",
            "text-[1rem] font-medium tracking-[-0.03em] text-gray-100",
            "cursor-pointer border-none bg-transparent",
            "hover:bg-gray-1 transition-colors duration-150",
          ].join(" ")}
        >
          로그아웃
        </button>
      </div>

      {/* 로그아웃 확인 모달 띄우기 */}
      <Modal
        isOpen={isLogoutModalOpen}
        title={"로그아웃하시겠어요?"}
        cancelLabel="취소"
        confirmLabel="로그아웃"
        confirmVariant="primary"
        onCancel={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />

      {/* 로그아웃 완료 토스트 메세지 */}
      <Toast message={toast.message} isVisible={toast.isVisible} />
    </section>
  );
}

export default MyPage;
