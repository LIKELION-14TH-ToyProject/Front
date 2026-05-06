import { useNavigate } from "react-router-dom";
import ROUTES from "../../Routes";

// 좌측엔 태그 목록, 본문 미리보기, 날짜
// 우측엔 이미지 썸네일 보여주기
// 태그 늘어나면 박스 늘어나게 하기 -> 물어보고 확인 완

function DiaryCard({ diary }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(ROUTES.DIARY_DETAIL.replace(":id", diary.id))}
      className={[
        "cursor-pointer",
        "rounded-r4 shadow-card bg-white",
        "p-[1rem]",
        "flex items-stretch justify-between gap-[1rem]",
        "my-[0.5rem]",
        "hover:shadow-button transition-shadow duration-150",
      ].join(" ")}
    >
      {/* 좌측 - 태그 + 본문 + 날짜 */}
      <div className="flex min-w-0 flex-1 flex-col gap-[0.5rem]">
        {/* 태그 많아지면 줄바꿈, 카드 높이 자동 증가 */}
        {diary.tags && diary.tags.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-x-[0.25rem] gap-y-[0.25rem] p-0">
            {diary.tags.map((tag) => (
              <li
                key={tag}
                className={[
                  "bg-main-70 text-white-100",
                  "rounded-r4 text-center",
                  "px-[0.5rem] py-[0.125rem]",
                  "text-[0.75rem] font-medium tracking-[-0.0225rem]",
                ].join(" ")}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* 본문: 최대 2줄, 넘치면 말줄임으로 */}
        <p
          className={[
            "m-0",
            "text-[0.9375rem] font-normal tracking-[-0.02813rem]",
            "text-gray-90",
            "line-clamp-2",
          ].join(" ")}
        >
          {diary.content}
        </p>

        {/* 날짜 */}
        <div className="mt-auto">
          <time
            dateTime={diary.date}
            className="text-[0.8125rem] font-normal tracking-[-0.02438rem] text-[#AEAEAE]"
          >
            {diary.date}
          </time>
        </div>
      </div>

      {/* 우측: 이미지 썸네일 */}
      {diary.imageUrl && (
        <div className="flex shrink-0 items-center">
          <img
            src={diary.imageUrl}
            alt="일기 이미지"
            className="rounded-r4 h-[8rem] w-[8rem] shrink-0 object-cover"
          />
        </div>
      )}
    </article>
  );
}

export default DiaryCard;
