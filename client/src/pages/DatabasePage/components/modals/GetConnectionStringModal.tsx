import { useState } from "react";
import ModalDefault from "../../../../common/ModalDefault";
import MaterialIcon from "../../../../common/MaterialIcon";
import Loader from "../../../../common/Loader";

enum Stage {
  password,
  loading,
  error,
  success,
}

export default function GetConnectionStringModal() {
  const [visible, setVisible] = useState({
    password: false,
    uri: false,
  });

  const [stage, setStage] = useState<Stage>(Stage.password);
  const [connectionString, setConnectionString] = useState<string>(
    "mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]"
  );
  const [errorMsg, setErrorMsg] = useState("");

  function submitHandler() {
    if (stage === Stage.password) {
      setStage(Stage.loading);
      setTimeout(() => {
        if (Math.random() < 0.9) {
          setStage(Stage.success);
        } else {
          setErrorMsg(
            "The lorem ipsum is a placeholder text used in publishing and graphic design. This filler text is a short paragraph that contains all the letters of the alphabet. The characters are spread out evenly so that the reader's attention is focused on the layout of the text instead of its content."
          );
          setStage(Stage.error);
        }
      }, 4000);
    }
  }

  return (
    <ModalDefault
      action={submitHandler}
      type={stage === Stage.password ? "default" : "singleButtonClose"}
      closeText={
        (stage === Stage.error && "OK") || (stage === Stage.success && "Close")
      }
    >
      {stage === Stage.password && (
        <div className="p-8 flex flex-col gap-y-3">
          <h2 className="font-medium text-2xl tracking-tight">
            Confirm your password
          </h2>
          <p className="text-front text-sm text-opacity-60">
            We need to confirm it's you
          </p>
          <div className="relative">
            <input
              type={visible.password ? "text" : "password"}
              className="border border-front border-opacity-30 px-2 py-1 rounded-md w-full pr-10"
              placeholder="Enter your Password"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center"
              onClick={() =>
                setVisible((v) => {
                  return { ...v, password: !v.password };
                })
              }
            >
              <MaterialIcon codepoint={visible.password ? "e8f5" : "e8f4"} />
            </button>
          </div>
        </div>
      )}

      {stage === Stage.loading && (
        <div className="p-8 flex flex-col items-center gap-y-3">
          <h2 className="font-medium text-2xl tracking-tight">Wait a second</h2>
          <Loader className="w-1/5" />
        </div>
      )}

      {stage === Stage.error && (
        <div className="p-8 flex flex-col gap-y-3">
          <h2 className="font-medium text-2xl tracking-tight">
            Something went wrong!
          </h2>
          <p className="text-front text-sm text-opacity-60">
            Please try again and if the error persists, contact us
          </p>
          <p className="max-w-[40vw] text-sm mt-2 text-red-500">{errorMsg}</p>
        </div>
      )}

      {stage === Stage.success && (
        <div className="p-8 flex flex-col gap-y-3">
          <h2 className="font-medium text-2xl tracking-tight">
            Connection URI
          </h2>
          <p className="text-front text-sm text-opacity-60">
            Keep it safe and secret, anyone with access to the connection URI
            can modify the database
          </p>
          <div className="relative">
            <input
              type={visible.uri ? "text" : "password"}
              className="border border-front border-opacity-30 px-2 py-1 rounded-md w-full pr-10 focus:hidden pointer-events-none"
              value={connectionString}
              readOnly
              placeholder="Enter your Password"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center"
              onClick={() =>
                setVisible((v) => {
                  return { ...v, uri: !v.uri };
                })
              }
            >
              <MaterialIcon codepoint={visible.uri ? "e8f5" : "e8f4"} />
            </button>
          </div>
        </div>
      )}
    </ModalDefault>
  );
}
