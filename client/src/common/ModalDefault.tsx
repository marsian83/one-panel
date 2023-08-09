import { ReactNode } from "react";
import useModal from "../hooks/useModal";
import { twMerge } from "tailwind-merge";

interface ModalDefaultProps {
  children?: ReactNode;
  action?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ModalType;
  closeText?: string | false;
  actionText?: string | false;
}

type ModalType =
  | "default"
  | "singleButtonAction"
  | "singleButtonClose"
  | "disabledAction";

export default function ModalDefault(props: ModalDefaultProps) {
  const modal = useModal();

  return (
    <div className="bg-background border border-front border-opacity-25 rounded-xl overflow-hidden min-w-[35vw]">
      {props.children}
      <div className="bg-foreground bg-opacity-10 p-4 flex justify-between border-t border-front border-opacity-20">
        <button
          className={twMerge(
            "bg-background bg-opacity-75 px-5 py-2 rounded-lg border border-front border-opacity-25 duration-300 hover:bg-opacity-50",
            props.type === "singleButtonAction" && "hidden",
            props.type === "singleButtonClose" && "w-full",
          )}
          onClick={() => modal.hide()}
        >
          {props.closeText || "Cancel"}
        </button>
        <button
          className={twMerge(
            "bg-foreground px-5 py-2 rounded-lg text-back duration-300 hover:brightness-75",
            props.type === "singleButtonAction" && "w-full",
            props.type === "singleButtonClose" && "hidden",
          )}
          onClick={props.action}
          disabled={props.type === "disabledAction"}
        >
          {props.actionText || "Submit"}
        </button>
      </div>
    </div>
  );
}
