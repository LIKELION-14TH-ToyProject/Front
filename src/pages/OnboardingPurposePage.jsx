import { useOnboardingPurpose } from "../hooks/useOnboarding";
import Back from "../assets/icons/back.svg";
import Dot from "../assets/icons/indicator-dot.svg";
import Button from "../components/common/Button";

function OnboardingPurposePage() {
  const { purpose, setPurpose, error, handleComplete, handleBack } =
    useOnboardingPurpose();

  const isReady = purpose.trim().length > 0;

  return (
    <main className="mx-auto flex min-h-screen max-w-[22.125rem] flex-col bg-white px-[1.5rem] pt-[5.44rem] pb-[4.19rem]">
      {/*뒤로가기*/}
      <button
        type="button"
        onClick={handleBack}
        className="shirink-0 mb-[2.46rem] h-[1.5rem] w-[1.5rem] cursor-pointer self-start border-none"
      >
        <img
          src={Back}
          alt="back button"
          className="aspect-square shrink-0 object-contain"
        />
      </button>

      {/* 진행 인디케이터 */}
      <div className="mb-[1.82rem] flex items-center gap-[0.49rem]">
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
        <span className="bg-main-100 h-[0.32531rem] w-[1rem] rounded-[0.5rem]" />
      </div>

      <div className="mb-[2.5rem]">
        <h2 className="m-0 text-[1.1rem] font-normal tracking-[-0.03em] text-gray-100">
          일기를 쓰는 이유가 무엇인가요?
        </h2>
        <p className="text-gray-70 m-0 text-[0.8rem] font-normal tracking-[-0.03em]">
          간단하게 적어도 괜찮아요.
        </p>
      </div>

      <form onSubmit={handleComplete} className="flex flex-1 flex-col">
        <div className="group border-gray-80 focus-within:border-gray-90 border-b pb-[0.5rem] transition-colors duration-150">
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="하루를 기록하고 싶어서, 감정을 정리하려고..."
            rows={1}
            className={[
              "w-full resize-none bg-transparent outline-none",
              "text-[0.85rem] font-normal tracking-[-0.03em]",
              "text-gray-100",
              "placeholder:text-gray-30",
              "overflow-hidden",
            ].join(" ")}
            // 내용에 따라 높이 자동 조절 되는 게 좋을 듯!!!
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>

        {error && (
          <p className="m-0 mt-[0.5rem] text-[0.8125rem] text-[#FF4444]">
            {error}
          </p>
        )}

        <div className="mt-auto pt-[4.19rem]">
          <Button type="submit" variant="primary" fullWidth disabled={!isReady}>
            완료
          </Button>
        </div>
      </form>
    </main>
  );
}

export default OnboardingPurposePage;
