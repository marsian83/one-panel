import { useEffect, useRef, useState } from "react";
import { Icon, icons } from "../../../../assets/data/icons";
import api from "../../../../helpers/api";
import ModalDefault from "../../../../common/ModalDefault";
import IconSelect from "../../../../common/IconSelect";
import { Color, colors } from "../../../../assets/data/colors";

export default function NewArtifactModal(props: { dbId: number }) {
  const [icon, setIcon] = useState<Icon>(icons[0]);

  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const colorRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  async function submitHandler() {
    if (nameRef.current.reportValidity()) {
      await api.newArtifact(
        props.dbId,
        nameRef.current.value,
        colorRef.current.value as Color,
        { codepoint: icon }
      );
    }
  }

  return (
    <ModalDefault action={submitHandler}>
      <div className="p-8 flex flex-col gap-y-3">
        <h2 className="font-medium text-2xl tracking-tight">Create Database</h2>
        <p className="text-front text-sm text-opacity-60">
          Enter a unique name for this artifact
        </p>
        <input
          type="text"
          ref={nameRef}
          className="border border-front border-opacity-30 px-2 py-1 rounded-md"
          placeholder="Artifact name..."
          minLength={3}
          maxLength={32}
        />

        <p className="text-front text-sm text-opacity-60 mt-3">
          Choose a color to represent this artifact
        </p>
        <select
          name="color"
          ref={colorRef}
          className="border border-front border-opacity-30 capitalize px-2 py-1 rounded-md"
        >
          {colors.map((clr) => (
            <option
              key={clr}
              value={clr}
              className="capitalize text-black"
              style={{ backgroundColor: clr, color: clr }}
            >
              {clr}
            </option>
          ))}
        </select>

        <p className="text-front text-sm text-opacity-60 mt-3">
          Choose an icon to represent this artifact
        </p>
        <IconSelect
          iconState={[icon, setIcon]}
          className="border border-front border-opacity-30 capitalize px-2 py-1 rounded-md focus-within:border-primary"
        />
      </div>
    </ModalDefault>
  );
}
