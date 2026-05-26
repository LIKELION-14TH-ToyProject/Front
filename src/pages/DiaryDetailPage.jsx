import { useNavigate } from "react-router-dom";
import { useDiaryDetail, useDiaryDelete } from "../hooks/useDiary";
import useModalStore from "../store/useModalStore";
import useToastStore from "../store/useToastStore";
import ROUTES from "../Routes";
import Back from "../assets/icons/back.svg";
import Photo from "../assets/icons/photo.svg";

function formatDate(dateStr) {
  if (!dateStr) return "";
  // "2026. 5. 6." 을 ["2026", "5", "6", ""] split 해야 됨 ㅠ 이거 때무넹 애먹엇다
  const parts = dateStr
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);
  const [year, month, day] = parts.map(Number);
  if (!year || !month || !day) return dateStr;
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleString("en-US", { month: "short" });
  return `${monthName}. ${day}, ${year}`; // "May. 6, 2026"
}

function DiaryDetailPage() {
  const navigate = useNavigate();
  const { diary, handleEdit } = useDiaryDetail();
  const openModal = useModalStore((state) => state.openModal);
  const showToast = useToastStore((state) => state.showToast);

  // 삭제 훅 -> diary가 없으면 id를 넘길 수 없으므로 조건부로 처리
  const { handleConfirmDelete: baseConfirmDelete } = useDiaryDelete(diary?.id);

  // 삭제 버튼 클릭하면 openModal로 모달 띄우기
  const handleDeleteClick = () => {
    const formattedDate = formatDate(diary?.date);
    const modalTitle = `[ ${formattedDate} ]\n해당 일기를 삭제하시겠습니까?`;

    openModal({
      title: modalTitle,
      confirmLabel: "삭제",
      confirmVariant: "primary",
      onConfirm: () => {
        showToast(`[ ${formattedDate} ]\n삭제되었습니다.`);
        setTimeout(() => {
          baseConfirmDelete();
        }, 2000);
      },
    });
  };

  // 일기 데이터가 아직 로드되지 않은 경우
  if (!diary) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-main-90 text-[0.9375rem]">일기를 불러오는 중...</p>
      </div>
    );
  }

  const displayDate = formatDate(diary.date);

  return (
    <section className="bg-main-5 mx-auto flex min-h-screen max-w-[430px] flex-col">
      <div className="h-[clamp(0rem,5vh,4rem)] shrink-0 bg-white" />
      {/* 상단바*/}
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
            일기 상세
          </h2>
        </div>
      </div>
      {/* main 영역 */}
      <div className="flex flex-1 flex-col overflow-y-auto px-[1.25rem] pt-[1.62rem] pb-[clamp(1rem,5vh,4rem)]">
        {/* 일기 상세 카드 */}
        <div
          className="rounded-r8 px- flex flex-col bg-white"
          style={{ minHeight: "clamp(22rem,70svh,37rem)" }}
        >
          {/* 날짜 */}
          <time
            dateTime={diary.date}
            className="text-gray-40 block pt-[1.9375rem] text-center text-[0.8125rem] font-normal tracking-[-0.03em]"
          >
            {displayDate}
          </time>

          {/* 태그 (위치만 카드 안으로 이동, 스타일 동일) */}
          {diary.tags && diary.tags.length > 0 && (
            <ul className="m-0 mx-[clamp(0.75rem,4vw,1.2rem)] mt-[0.625rem] flex list-none flex-wrap justify-center gap-[0.375rem] p-0">
              {diary.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-r4 bg-main-80 px-[0.625rem] py-[0.125rem] text-[0.8125rem] font-medium tracking-[-0.03em] text-white"
                >
                  # {tag}
                </li>
              ))}
            </ul>
          )}

          {/* 이미지 */}
          <div className="mt-[1rem] w-full shrink-0 px-[clamp(0.5rem,3vw,1rem)]">
            {diary.imageUrl ? (
              <figure className="m-0">
                <img
                  src={diary.imageUrl}
                  alt="일기 이미지"
                  className="h-auto max-h-[clamp(12rem,50svh,28rem)] w-full object-contain"
                />
              </figure>
            ) : (
              <div className="flex aspect-square max-h-[clamp(10rem,35svh,22rem)] w-full items-center justify-center bg-[#F5F5F5]">
                <img
                  src={Photo}
                  alt="이미지 없음"
                  className="h-[1.66rem] w-[1.66rem]"
                />
              </div>
            )}
          </div>

          {/* 본문 (위치만 카드 안으로 이동, 스타일 동일) */}
          <p className="text-gray-90 m-0 mx-[clamp(0.75rem,4vw,1.25rem)] mt-[1rem] pb-[1.5rem] text-[1rem] font-medium tracking-[-0.03em] whitespace-pre-wrap">
            {diary.content}
          </p>
        </div>

        {/* [변경] 수정/삭제 버튼: 카드 안 mt-auto → 카드 바깥 아래 mt-[1.25rem] 여백으로 분리 */}
        <div className="mt-[1.25rem] flex justify-end gap-[0.1875rem]">
          <button
            type="button"
            onClick={handleEdit}
            className="text-gray-70 cursor-pointer border-none bg-transparent p-[0.625rem] text-[1rem] font-normal tracking-[-0.03em]"
          >
            수정
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="text-gray-90 cursor-pointer border-none bg-transparent p-[0.625rem] text-[1rem] font-normal tracking-[-0.03em]"
          >
            삭제
          </button>
        </div>
      </div>
    </section>
  );
}

export default DiaryDetailPage;
