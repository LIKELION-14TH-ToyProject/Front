import { useNavigate } from "react-router-dom";
import ROUTES from "../../Routes";

function DiaryCard({ diary }) {
  const navigate = useNavigate();

  // 카드 클릭 시 해당 일기 상세 페이지로 이동
  const handleClick = () => {
    navigate(ROUTES.DIARY_DETAIL.replace(":id", diary.id));
  };

  return (
    <article
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: "1px solid #aaaaaa",
        borderRadius: "12px",
        padding: "20px",
        margin: "10px 0",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <ul>
          {diary.tags.map((tag) => (
            <li key={tag}># {tag}</li>
          ))}
        </ul>

        <p>{diary.content}</p>

        <time dateTime={diary.date}>{diary.date}</time>
      </div>

      {diary.imageUrl && (
        <img src={diary.imageUrl} alt="일기 이미지" width={60} height={60} />
      )}
    </article>
  );
}

export default DiaryCard;
