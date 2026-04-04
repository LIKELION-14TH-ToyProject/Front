import { useNavigate } from "react-router-dom";
import { logout, getUserId } from "../hooks/useAuth";
import Button from "../components/common/Button";

function MyPage() {
  const navigate = useNavigate();

  const userId = getUserId();

  return (
    <section>
      <h2>마이페이지</h2>

      <div>
        <span>👤</span>
        <span>{userId || "알 수 없음"}</span>
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={() => logout(navigate)}
      >
        로그아웃
      </Button>
    </section>
  );
}

export default MyPage;
