import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ROUTES from "../Routes";
 
function LoginPage() {
  const navigate = useNavigate();
  const {
    id, setId,
    password, setPassword,
    error,
    isLoading,
    handleLogin,
  } = useLogin();
 
  return (
    <main>
      <h1>Diing</h1>

      <h3>로그인</h3>
 
      <form onSubmit={handleLogin}>
 
        <Input
          id="login-id"
          label="아이디"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해 주세요."
        />

        <Input
          id="login-password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요."
          showPasswordToggle={true} // 암호화/해제 토글 활성화
        />
 
        {error && <p role="alert">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
      </form>
 
      <p>
        회원이 아닌가요?{" "}
        <button
          type="button"
          onClick={() => navigate(ROUTES.SIGNUP)}
        >
          회원가입하기
        </button>
      </p>
    </main>
  );
}
 
export default LoginPage;
 