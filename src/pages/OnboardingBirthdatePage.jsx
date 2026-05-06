import { useOnboardingBirthdate } from "../hooks/useOnboarding";
import Back from "../assets/icons/back.svg";
import Dot from "../assets/icons/indicator-dot.svg";
import InputNumber from "../components/common/InputNumber";
import Button from "../components/common/Button";

function OnboardingBirthdatePage() {
  const {
    yyyy,
    setYyyy,
    mm,
    setMm,
    dd,
    setDd,
    yyyyRef,
    mmRef,
    ddRef,
    error,
    handleNext,
    handleBack,
  } = useOnboardingBirthdate();

  const isReady = yyyy.length === 4 && mm.length > 0 && dd.length > 0;

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
        <span className="bg-main-100 h-[0.32531rem] w-[1rem] rounded-[0.5rem]" />
        <img
          src={Dot}
          alt="indicator dot"
          className="aspect-square h-[0.33rem] w-[0.33rem] shrink-0 object-contain"
        />
      </div>

      {/* 질문 텍스트 */}
      <h2 className="m-0 mb-[4.44rem] text-[1.1rem] font-normal tracking-[-0.03em] text-gray-100">
        생년월일을 입력해 주세요.
      </h2>

      <form onSubmit={handleNext} className="flex flex-1 flex-col">
        {/* YYYY / MM / DD 분리해서 입력 받기 */}
        <div className="flex h-[1.5rem] items-end gap-[1.03rem]">
          {/* 연도 입력 */}
          <div className="flex flex-[3] items-end gap-[0.38rem]">
            <InputNumber
              ref={yyyyRef}
              value={yyyy}
              onChange={setYyyy}
              placeholder="YYYY"
              maxLength={4}
              onComplete={() => mmRef.current?.focus()}
            />
            <span className="text-gray-80 shrink-0 text-[0.75rem] font-normal tracking-[-0.0225rem]">
              년
            </span>
          </div>

          {/* 월 입력 */}
          <div className="flex flex-[2] items-end gap-[0.38rem]">
            <InputNumber
              ref={mmRef}
              value={mm}
              onChange={setMm}
              placeholder="MM"
              maxLength={2}
              onComplete={() => ddRef.current?.focus()}
            />
            <span className="text-gray-80 shrink-0 text-[0.75rem] font-normal tracking-[-0.0225rem]">
              월
            </span>
          </div>

          {/* 일 입력 */}
          <div className="flex flex-[2] items-end gap-[0.38rem]">
            <InputNumber
              ref={ddRef}
              value={dd}
              onChange={setDd}
              placeholder="DD"
              maxLength={2}
            />
            <span className="text-gray-80 shrink-0 text-[0.75rem] font-normal tracking-[-0.0225rem]">
              일
            </span>
          </div>
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

export default OnboardingBirthdatePage;
