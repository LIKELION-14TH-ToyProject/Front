import { Outlet } from "react-router-dom";
import GNB from "./GNB";

function Layout() {
  return (
    <div className="bg-gray-1 flex min-h-screen w-full justify-center">
      <div className="relative flex min-h-screen w-full max-w-[430px] flex-col overflow-x-hidden bg-white">
        <GNB />
        <main className="bg-main-5 flex flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
