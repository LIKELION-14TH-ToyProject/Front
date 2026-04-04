import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDiaryWrite, useDiaryEdit } from "../hooks/useDiary";
import TagInput from "../components/common/TagInput";
import Button from "../components/common/Button";

function DiaryWritePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state에 editDiary가 있으면 수정 모드, 없으면 작성 모드
  const editDiary = location.state?.editDiary || null;
  const isEditMode = !!editDiary;

  // 두 훅을 항상 모두 호출
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

  return (
    <section>
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        ◀
      </button>

      <h2>{isEditMode ? "일기 수정" : "일기 작성"}</h2>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>사진</legend>

          {imagePreview ? (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={imagePreview}
                alt="선택한 이미지 미리보기"
                width={200}
                height={200}
                style={{ display: "block" }}
              />
              <button
                type="button"
                onClick={removeImage}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                }}
              >
                ❌
              </button>
            </div>
          ) : (
            // 이미지 없을 때 플레이스홀더
            <div>🌟사진을 추가해주세요🌟</div>
          )}

          <label htmlFor="diary-image">
            이미지 업로드
            <input
              id="diary-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>태그</legend>
        
          <TagInput tags={tags} onTagsChange={setTags} />
        </fieldset>

        <fieldset>
          <legend>본문</legend>
          <textarea
            value={content ?? ""}
            onChange={(e) => setContent(e.target.value)}
            placeholder="일기를 입력해 주세요."
            rows={10}
            required
            style={{ width: "50rem", resize: "vertical" }}
          />
        </fieldset>

        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "처리 중..." : isEditMode ? "수정 완료" : "등록"}
        </Button>
      </form>
    </section>
  );
}

export default DiaryWritePage;
