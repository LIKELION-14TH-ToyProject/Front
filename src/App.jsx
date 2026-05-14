import { RouterProvider } from "react-router-dom";
import Router from "./Router";

import GlobalModal from "./components/common/GlobalModal";
import GlobalToast from "./components/common/GlobalToast";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <GlobalModal />
      <GlobalToast />
    </>
  );
}

export default App;
