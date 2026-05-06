import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ROUTES from "../Routes";

function LoginPage() {
  const navigate = useNavigate();
  const { id, setId, password, setPassword, error, isLoading, handleLogin } =
    useLogin();

  //둘 다 인풋 채워야 버튼 활성화
  const isReady = id.trim().length > 0 && password.trim().length > 0;

  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-6">
      <div className="flex min-h-screen w-full max-w-[22.125rem] flex-col">
        <div className="mt-[min(15vh,10.06rem)] mb-[2.69rem] flex flex-col items-center">
          <h1 className="font-poppins text-main-100 m-0 text-[2rem] font-extrabold tracking-[-0.04rem]">
            Diing
          </h1>
          <p className="text-gray-60 m-0 text-center text-[1.25rem] font-medium tracking-[-0.0375rem]">
            로그인
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-[2rem]">
          <div className="flex flex-col gap-[0.5625rem]">
            <label className="text-[1rem] font-medium tracking-[-0.03rem] text-gray-100">
              아이디
            </label>
            <Input
              id="login-id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력해 주세요."
            />
          </div>

          <div className="flex flex-col gap-[0.5625rem]">
            <label className="text-[1rem] font-medium tracking-[-0.03rem] text-gray-100">
              비밀번호
            </label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요."
              showPasswordToggle
            />
          </div>

          {error && (
            <p className="m-0 text-[0.8125rem] text-[#FF4444]">{error}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!isReady || isLoading}
            className="mt-5"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </form>

        <div className="grow" />

        <p className="mb-12 text-center text-[0.8125rem] font-normal tracking-[-0.02438rem] text-gray-50">
          회원이 아니신가요?{" "}
          <button
            type="button"
            onClick={() => navigate(ROUTES.SIGNUP)}
            className={[
              "cursor-pointer border-none bg-transparent p-0",
              "text-gray-80 text-[0.8125rem]",
              "font-normal tracking-[-0.02438rem] underline",
            ].join(" ")}
          >
            회원가입하기
          </button>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
