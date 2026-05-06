import { useNavigate, useLocation } from "react-router-dom";
import User from "../assets/icons/user.svg";
import UserActive from "../assets/icons/user-active.svg";
import ROUTES from "../Routes";

function GNB({ children }) {
  // page별로 추가 UI 넣을 수 있게
  const navigate = useNavigate();
  const location = useLocation();

  const isMyPage = location.pathname === ROUTES.MY_PAGE;

  return (
    <header className="border-gray-5 sticky top-0 z-50 border-b bg-white pt-[3rem]">
      <div className="flex h-20 items-center justify-between px-[1.5rem] py-4">
        {/* 로고 */}
        <h1 className="font-poppins m-0">
          <button
            type="button"
            onClick={() => navigate(ROUTES.DIARY_LIST)}
            className={[
              "cursor-pointer border-none bg-transparent p-0",
              "text-main-100 text-[2rem] font-extrabold",
              "leading-none tracking-[-0.04rem]",
            ].join(" ")}
          >
            Diing
          </button>
        </h1>

        {/* 마이페이지 아이콘 */}
        <nav>
          <button
            type="button"
            onClick={() => navigate(ROUTES.MY_PAGE)}
            className={[
              "cursor-pointer border-none bg-transparent p-0",
              "flex h-[1.5rem] w-[1.5rem] shrink-0 items-center",
            ].join(" ")}
          >
            <img
              src={isMyPage ? UserActive : User}
              alt="my page button"
              className="aspect-square shrink-0 object-contain"
            />
          </button>
        </nav>
      </div>

      {children && <div>{children}</div>}
    </header>
  );
}

export default GNB;
