import { useNavigate } from "react-router-dom";
import { useDiaryDetail, useDiaryDelete } from "../hooks/useDiary";
import useToast from "../hooks/useToast";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";

function DiaryDetailPage() {
  const navigate = useNavigate();
  const { diary, handleEdit } = useDiaryDetail();
  const { toast, showToast } = useToast();

  // 삭제 훅 -> diary가 없으면 id를 넘길 수 없으므로 조건부로 처리
  const {
    isModalOpen,
    handleDeleteClick,
    handleCancel,
    handleConfirmDelete: baseConfirmDelete,
  } = useDiaryDelete(diary?.id);

  // 삭제 확인 시 토스트 메시지 추가 후 삭제 실행
  const handleConfirmDelete = () => {
    showToast("일기가 삭제되었습니다.");
    // 토스트 표시 후 바로 삭제 (navigate는 useDiaryDelete 내부에서 처리함!!!!)
    setTimeout(() => {
      baseConfirmDelete();
    }, 300);
  };

  // 일기 데이터가 아직 로드되지 않은 경우
  if (!diary) {
    return <p>일기를 불러오는 중...</p>;
  }

  return (
    <section>
      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        ◀
      </button>

      <h2>일기 상세</h2>

      <time dateTime={diary.date}>{diary.date}</time>

      <ul>
        {(diary.tags || []).map((tag) => (
          <li key={tag}># {tag}</li>
        ))}
      </ul>

      {diary.imageUrl && (
        <figure style={{ marginTop: "10px", marginBottom: "10px" }}>
          <img
            src={diary.imageUrl}
            alt="일기 이미지"
            width={120}
            style={{
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </figure>
      )}

      <p>{diary.content}</p>

      <Button type="button" variant="secondary" onClick={handleEdit}>
        수정
      </Button>

      <Button type="button" variant="danger" onClick={handleDeleteClick}>
        삭제
      </Button>

      <Modal
        isOpen={isModalOpen}
        title={`[${diary.date}] 해당 일기를 삭제하시겠습니까?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />

      {toast.isVisible && (
        <div role="status" aria-live="polite">
          {toast.message}
        </div>
      )}
    </section>
  );
}

export default DiaryDetailPage;
