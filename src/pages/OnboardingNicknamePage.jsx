import { useOnboardingNickname } from "../hooks/useOnboarding";
import Dot from "../assets/icons/indicator-dot.svg";
import DeleteCircle from "../assets/icons/delete-circle.svg";
import Button from "../components/common/Button";

function OnboardingNicknamePage() {
  const { nickname, setNickname, error, handleNext, handleClear } =
    useOnboardingNickname();

  const isReady = nickname.trim().length > 0;

  return (
    <main className="mx-auto flex min-h-screen max-w-[22.125rem] flex-col bg-white px-[1.5rem] pt-[9.4rem] pb-[4.19rem]">
      {/* 진행 인디케이터 */}
      <div className="mb-[1.82rem] flex items-center gap-[0.49rem]">
        <span className="bg-main-100 h-[0.32531rem] w-[1rem] rounded-[0.5rem]" />
        <img
          src={Dot}
          alt="indicator dot"
          className="object-contai aspect-square h-[0.33rem] w-[0.33rem] shrink-0"
        />
        <img
          src={Dot}
          alt="indicator dot"
          className="aspect-square h-[0.33rem] w-[0.33rem] shrink-0 object-contain"
        />
      </div>

      {/* 질문 텍스트 */}
      <h2 className="m-0 mb-[4.31rem] text-[1.1rem] font-normal tracking-[-0.03em] text-gray-100">
        닉네임을 입력해 주세요.
      </h2>

      <form onSubmit={handleNext} className="flex flex-1 flex-col">
        <div className="flex flex-col">
          <div
            className={[
              "flex items-center",
              "border-b-[0.0625rem]",
              "border-gray-80",
              "focus-within:border-gray-90",
              "pb-[0.38rem]",
              "transition-colors duration-150",
            ].join(" ")}
          >
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={10}
              placeholder=" "
              className={[
                "min-w-0 flex-1 bg-transparent outline-none",
                "text-[1rem] font-medium tracking-[-0.03rem] text-gray-100",
                "placeholder:text-gray-1",
              ].join(" ")}
            />
            {/* ✕ 버튼 */}
            {nickname && (
              <button
                type="button"
                onClick={handleClear}
                className="ml-[0.44rem] h-[1.5rem] w-[1.5rem] shrink-0 cursor-pointer border-none"
              >
                <img
                  src={DeleteCircle}
                  alt="delete button"
                  className="aspect-square shrink-0 object-contain p-[0.13rem]"
                />
              </button>
            )}
          </div>

          {/* 글자수 카운터 */}
          <span className="mt-[0.31rem] self-end text-[0.75rem] font-normal tracking-[-0.0225rem] text-gray-50">
            {nickname.length} /10
          </span>
        </div>

        {error && (
          <p className="m-0 mt-[0.5rem] text-[0.8125rem] text-[#FF4444]">
            {error}
          </p>
        )}

        <div className="mt-auto pt-[4.19rem]">
          <Button type="submit" variant="primary" fullWidth disabled={!isReady}>
            다음
          </Button>
        </div>
      </form>
    </main>
  );
}

export default OnboardingNicknamePage;
