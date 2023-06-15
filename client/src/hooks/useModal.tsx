import { ReactNode } from "react";
import useGlobalContext from "../contexts/globalContext";

export default function useModal() {
  const global = useGlobalContext();

  function show(element: ReactNode) {
    global.modalState.setModal(element);
  }

  function hide() {
    global.modalState.setModal(null);
  }

  return { element: global.modalState.modal, show, hide };
}
