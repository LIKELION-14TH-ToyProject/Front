import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDiaryList, useDiaryFilter } from "../hooks/useDiary";
import DiaryCard from "../components/diary/DiaryCard";
import TagFilter from "../components/common/TagFilter";
import ROUTES from "../Routes";
import Pencil from "../assets/icons/pencil.svg";

function DiaryListPage() {
  const navigate = useNavigate();
  const { diaries } = useDiaryList(); // localStorage에서 일기 목록 불러오기
  const [selectedTags, setSelectedTags] = useState([]);
  const { allTags, filteredDiaries } = useDiaryFilter(diaries, selectedTags);

  return (
    <section className="bg-main-5 relative flex flex-1 flex-col px-[1.5rem]">
      {/* 필터 아이콘: GNB 바로 아래 우측!! */}
      <div className="mt-[0.625rem] mb-[0.125rem] flex justify-end">
        {allTags.length > 0 && (
          <TagFilter
            allTags={allTags}
            selectedTags={selectedTags}
            onApply={setSelectedTags} // 제발!!
          />
        )}
      </div>

      {/* 일기 목록 */}
      {filteredDiaries.length === 0 ? (
        /* 일기 없을 때 */
        <div className="mx-auto mt-[0.75rem] flex flex-col items-center justify-center text-center">
          <p className="text-[0.9rem] font-normal tracking-[-0.03em] whitespace-pre-wrap text-gray-50">
            {diaries.length === 0
              ? "작성된 일기가 없어요!\n 아래 버튼을 클릭해 일기를 작성해 보세요."
              : "선택한 태그에 해당하는 일기가 없습니다."}
          </p>
        </div>
      ) : (
        <ul className="m-0 list-none p-0">
          {filteredDiaries.map((diary) => (
            <li key={diary.id}>
              <DiaryCard diary={diary} />
            </li>
          ))}
        </ul>
      )}
      {/* 작성 버튼 위치 고정해야 함 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[3.06rem] px-[1.5rem]">
        <button
          type="button"
          onClick={() => navigate(ROUTES.DIARY_WRITE)}
          className={[
            "pointer-events-auto ml-auto", // 부모 박스 안에서 오른쪽 끝으로 보냄
            "h-[3.5rem] w-[3.5rem] rounded-full",
            "bg-main-100 shadow-button p-4",
            "flex items-center justify-center",
            "z-[50] cursor-pointer border-none",
          ].join(" ")}
        >
          <img
            src={Pencil}
            alt="write button"
            className="aspect-square h-[1.5rem] w-[1.5rem] shrink-0 object-contain"
          />
        </button>
      </div>
    </section>
  );
}

export default DiaryListPage;
