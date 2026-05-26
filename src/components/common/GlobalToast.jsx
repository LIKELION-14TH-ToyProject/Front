// store 구독해서 toast 띄우도록 props 전달

import Toast from "./Toast";
import useToastStore from "../../store/useToastStore";

function GlobalToast() {
  const { message, isVisible } = useToastStore();

  return <Toast message={message} isVisible={isVisible} />;
}

export default GlobalToast;
