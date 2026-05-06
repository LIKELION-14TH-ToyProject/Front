// 새로 생긴 페이지... 할 게 늘었다!!!

import { useNavigate } from "react-router-dom";
import { useMyInfoEdit } from "../hooks/useMyInfo";
import Back from "../assets/icons/back.svg";
import Edit from "../assets/icons/edit.svg";
import ROUTES from "../Routes";

function InfoRow({ label, value, onEditStart }) {
  return (
    <div className="mb-[2rem] flex items-start justify-between px-[1.5rem]">
      <div className="flex flex-col gap-[0.37rem]">
        <span className="text-gray-90 text-[1rem] font-medium tracking-[-0.03em]">
          {label}
        </span>
        <span className="text-gray-70 text-[0.875rem] font-normal tracking-[-0.03em]">
          {value || "미설정"}
        </span>
      </div>

      {/* 수정 버튼 */}
      <button
        type="button"
        onClick={onEditStart}
        className="mt-[0.4375rem] ml-[1rem] shrink-0 cursor-pointer border-none bg-transparent p-0"
      >
        <img src={Edit} alt="수정" className="h-[1rem] w-[1rem]" />
      </button>
    </div>
  );
}

function MyInfoEditPage() {
  const {
    fields,
    editingField,
    tempValue,
    setTempValue,
    error,
    handleEditStart,
    handleEditConfirm,
    handleKeyDown,
    handleBack,
  } = useMyInfoEdit();

  const navigate = useNavigate();

  // 현재 수정 중인 필드의 라벨링
  const fieldLabel = {
    id: "아이디",
    nickname: "닉네임",
    purpose: "일기 작성 목적",
  };

  const isNickname = editingField === "nickname";

  return (
    <section className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-white">
      <div className="h-[clamp(0rem,5vh,4rem)] shrink-0 bg-white" />
      {/* 상단바*/}
      <div className="sticky top-0 z-10 mb-[2.3125rem] shrink-0 bg-white">
        {/* 상단바 본체 */}
        <div className="border-gray-5 relative flex h-[clamp(3.5rem,8vh,4rem)] items-center justify-center border-b px-[1.5rem]">
          <button
            type="button"
            onClick={() => navigate(ROUTES.MY_PAGE)}
            className="absolute left-[1.5rem] flex cursor-pointer items-center border-none bg-transparent p-0"
          >
            <img
              src={Back}
              alt="뒤로가기"
              className="h-[1.5rem] w-[1.5rem] shrink-0"
            />
          </button>
          <h2 className="text-gray-90 m-0 text-[1.25rem] font-medium tracking-[-0.03em]">
            내 정보 수정
          </h2>
        </div>
      </div>

      <div className="flex flex-col">
        {/* 아이디 - 일단 읽기 전용으로 만들자? */}
        <InfoRow
          label="아이디"
          value={fields.id}
          onEditStart={() => alert("조금만 기다려~~")}
        />

        {/* 닉네임 */}
        <InfoRow
          label="닉네임"
          value={fields.nickname}
          onEditStart={() => handleEditStart("nickname")}
        />

        {/* 일기 작성 목적 */}
        <InfoRow
          label="일기 작성 목적"
          value={fields.purpose}
          onEditStart={() => handleEditStart("purpose")}
        />
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p className="m-0 mt-[0.5rem] px-[1.5rem] text-[0.8125rem] text-[#FF4444]">
          {error}
        </p>
      )}

      {/*수정할 필드 선택하면 하단에서 올라오게 패널 만들어야 함 */}
      {/* 배경 오버레이 */}
      {editingField && (
        <div
          onClick={() => handleEditStart(null)}
          className="fixed inset-0 z-[100] bg-black/60"
        />
      )}

      {/*수정 패널*/}
      <div
        className={[
          "fixed right-0 bottom-0 left-0",
          "mx-auto max-w-[430px]",
          "rounded-t-[0.5rem] bg-white",
          "px-[1.5rem] pt-[1.375rem] pb-[0.5rem]",
          "z-[101]",
          "transition-transform duration-300 ease-in-out",
          editingField ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        {/* 수정 중인 필드 라벨 */}
        <p className="m-0 mb-[0.6875rem] text-[0.875rem] font-normal tracking-[-0.03em] text-gray-50">
          {editingField ? fieldLabel[editingField] : ""}
        </p>

        <div className="border-gray-80 focus-within:border-gray-90 relative mb-[1.3125rem] items-center border-b transition-colors">
          <input
            type="text"
            value={tempValue || ""}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={(e) => editingField && handleKeyDown(e, editingField)}
            maxLength={isNickname ? 10 : undefined}
            autoFocus
            className="text-gray-90 w-full border-none bg-transparent text-[1.125rem] font-normal outline-none"
          />
          {isNickname && (
            <span className="absolute right-0 bottom-[0.3125rem] text-[0.75rem] text-gray-50">
              {tempValue.length}/10
            </span>
          )}
        </div>

        {/*취소랑 저장 버튼도*/}
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={() => handleEditStart(null)}
            className="cursor-pointer border-none bg-transparent p-[0.625rem] text-[0.9375rem] font-normal tracking-[-0.03em] text-gray-50 outline-none"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => editingField && handleEditConfirm(editingField)}
            className="text-gray-80 cursor-pointer border-none bg-transparent p-[0.625rem] text-[0.9375rem] font-normal tracking-[-0.03em] outline-none"
          >
            저장
          </button>
        </div>
      </div>
    </section>
  );
}

export default MyInfoEditPage;
