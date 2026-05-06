import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDiaryWrite, useDiaryEdit } from "../hooks/useDiary";
import Back from "../assets/icons/back.svg";
import XCircle from "../assets/icons/x-circle.svg";
import Photo from "../assets/icons/photo.svg";
import TagInput from "../components/common/TagInput";
import TextArea from "../components/common/TextArea";
import Button from "../components/common/Button";
import ROUTES from "../Routes";

function DiaryWritePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state에 editDiary가 있으면 수정 모드, 없으면 작성 모드
  const editDiary = location.state?.editDiary || null;
  const isEditMode = !!editDiary;

  // 두 훅을 항상 모두 호출하도록 하쟈... 괜찮겠징
  const writeHook = useDiaryWrite();
  const editHook = useDiaryEdit();

  // 모드에 따라 사용할 훅 선택
  const {
    imagePreview,
    tags,
    setTags,
    content,
    setContent,
    handleImageChange,
    removeImage,
    handleSubmit,
    initWithExistingData,
    isLoading,
  } = isEditMode ? editHook : writeHook;

  // 수정 모드일 때 기존 데이터를 폼에 채워넣기
  useEffect(() => {
    if (isEditMode && editDiary && initWithExistingData) {
      initWithExistingData(editDiary);
    }
    // editDiary가 바뀔 때만 실행 (eslint 경고 무시해도 됨) @@@오류방지@@@
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isReady = content.trim().length > 0;

  const textareaRows = window.innerHeight >= 760 ? 5 : 3;

  return (
    <section className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-white">
      {/* 위쪽 여백*/}
      <div className="h-[clamp(0rem,5vh,4rem)]" />
      <div className="sticky top-0 z-10 shrink-0 bg-white">
        {/* 상단바 본체 */}
        <div className="border-gray-5 relative flex h-[clamp(3.5rem,8vh,4rem)] items-center justify-center border-b px-[1.5rem]">
          <button
            type="button"
            onClick={() => navigate(ROUTES.DIARY_LIST)}
            className="absolute left-[1.5rem] flex cursor-pointer items-center border-none bg-transparent p-0"
          >
            <img
              src={Back}
              alt="뒤로가기"
              className="h-[1.5rem] w-[1.5rem] shrink-0"
            />
          </button>
          <h2 className="text-gray-90 m-0 text-[1.25rem] font-medium tracking-[-0.03em]">
            {isEditMode ? "일기 수정" : "일기 작성"}
          </h2>
        </div>
      </div>

      {/* 메인 영역 */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col px-[1.5rem] pt-[1.38rem] pb-[clamp(1rem,3vh,4rem)]"
      >
        {/* 사진 섹션 */}
        <div className="mb-[clamp(0.75rem,2.5vh,2rem)] flex flex-col gap-[0.625rem]">
          <span className="text-gray-80 text-[0.9375rem] font-normal tracking-[-0.03em]">
            사진
          </span>
          <label className="cursor-pointer self-start">
            {imagePreview ? (
              <div className="relative h-[clamp(6.5rem,15vh,7.5rem)] w-[clamp(7rem,20vw,8rem)]">
                <img
                  src={imagePreview}
                  alt="선택한 이미지"
                  className="rounded-r4 h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removeImage();
                  }}
                  className="absolute -top-[0.35rem] -right-[0.5rem] cursor-pointer border-none bg-transparent p-0"
                >
                  <img
                    src={XCircle}
                    alt="삭제"
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                </button>
              </div>
            ) : (
              <div className="rounded-r4 bg-gray-5 flex h-[clamp(6.5rem,15vh,7.5rem)] w-[clamp(7rem,20vw,8rem)] items-center justify-center">
                <img
                  src={Photo}
                  alt="사진 추가"
                  className="h-[1.5rem] w-[1.5rem]"
                />
              </div>
            )}
            <input
              id="diary-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* 태그 섹션 */}
        <div className="mb-[clamp(0.75rem,2.5vh,2rem)] flex flex-col gap-[0.625rem]">
          <span className="text-gray-80 text-[0.9375rem] font-normal tracking-[-0.03em]">
            태그
          </span>
          <TagInput tags={tags} onTagsChange={setTags} />
        </div>

        {/* 본문 섹션 */}
        <div className="mb-[clamp(0.75rem,2.5vh,2rem)] flex min-h-0 flex-1 flex-col gap-[0.625rem]">
          <span className="text-gray-80 text-[0.9375rem] font-normal tracking-[-0.03em]">
            본문
          </span>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘을 한 줄로 남겨 보세요."
            rows={textareaRows}
            className="min-h-[4.5rem]"
            required
            autoResize
            variant="bordered"
          />
        </div>

        <div className="flex-1" />

        {/* 등록 버튼 */}
        <div className="shrink-0">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!isReady || isLoading}
          >
            {isLoading ? "처리 중..." : isEditMode ? "수정 완료" : "등록"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default DiaryWritePage;
