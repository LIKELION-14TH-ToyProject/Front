import { useSignup } from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function SignupPage() {
  const {
    id,
    setId,
    password,
    setPassword,
    error,
    isLoading,
    handleSignup,
    goToLogin,
  } = useSignup();

  return (
    <main>
      <h1>Diing</h1>

      <h3>회원가입</h3>

      <form onSubmit={handleSignup}>
        <Input
          id="signup-id"
          label="아이디"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해 주세요."
        />

        <Input
          id="signup-password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요."
          showPasswordToggle={true}
        />

        {error && <p role="alert">{error}</p>}

        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "처리 중..." : "회원가입"}
        </Button>
      </form>

      <p>
        이미 회원인가요?{" "}
        <button type="button" onClick={goToLogin}>
          로그인하기
        </button>
      </p>
    </main>
  );
}

export default SignupPage;
