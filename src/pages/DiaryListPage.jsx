import { useNavigate } from "react-router-dom";
import { useDiaryList } from "../hooks/useDiary";
import DiaryCard from "../components/diary/DiaryCard";
import Button from "../components/common/Button";
import ROUTES from "../Routes";

function DiaryListPage() {
    const navigate = useNavigate();
    const { diaries } = useDiaryList(); // localStorage에서 일기 목록 불러오기
   
    return (
      <section>
        
        <h2 className="sr-only">일기 목록</h2>
   
        {diaries.length === 0 ? (
          // 일기가 없을 때 안내 메시지
          <p>아직 작성한 일기가 없습니다 ㅠ.ㅜ 첫 일기를 작성해보세요!</p>
        ) : (
          // 일기가 있으면 카드 목록 렌더링
          <ul>
            {diaries.map((diary) => (
              <li key={diary.id}>
                
                <DiaryCard diary={diary} />
              </li>
            ))}
          </ul>
        )}
   
        {/* 작성하기 버튼!!! ->  오른쪽 하단에 위치 (스타일링 후 position: fixed로 처리할끄야) */}
        <Button
          type="button"
          variant="primary"
          onClick={() => navigate(ROUTES.DIARY_WRITE)}
          aria-label="일기 작성하기"
        >
          ✏️ 
        </Button>
      </section>
    );
  }
   
  export default DiaryListPage;
   