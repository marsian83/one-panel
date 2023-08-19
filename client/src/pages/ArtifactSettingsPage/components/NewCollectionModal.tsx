import { useRef } from "react";
import ModalDefault from "../../../common/ModalDefault";
import api from "../../../helpers/api";

export default function NewCollectionModal(props: { artifactId: number }) {
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  async function submitHandler() {
    if (nameRef.current.reportValidity()) {
      await api.newCollection(props.artifactId, nameRef.current.value);
      location.reload();
    }
  }

  return (
    <ModalDefault action={submitHandler}>
      <div className="p-8 flex flex-col gap-y-3">
        <h2 className="font-medium text-2xl tracking-tight">Create Database</h2>
        <p className="text-front text-sm text-opacity-60">
          Enter a unique name for this collection
        </p>
        <input
          type="text"
          ref={nameRef}
          className="border border-front border-opacity-30 px-2 py-1 rounded-md"
          placeholder="Collection name..."
          minLength={3}
          maxLength={32}
        />
      </div>
    </ModalDefault>
  );
}
