import { useEffect, useRef, useState } from "react";
import { Icon, icons } from "../../../assets/data/icons";
import IconSelect from "../../../common/IconSelect";
import ModalDefault from "../../../common/ModalDefault";
import { Plan } from "../../../interfaces/Data.d";
import api from "../../../helpers/api";

export default function NewDatabaseModal() {
  const [icon, setIcon] = useState<Icon>(icons[0]);
  const [basicAllowed, setBasicAllowed] = useState(false);

  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const planRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  async function submitHandler() {
    if (nameRef.current.reportValidity()) {
      await api.newDatabase(
        nameRef.current.value,
        planRef.current.value as Plan,
        {
          codepoint: icon,
        }
      );
    }
  }

  async function checkIfBasicAllowed() {
    const allowed = await api.isBasicAllowed();
    setBasicAllowed(allowed || false);
  }

  useEffect(() => {
    checkIfBasicAllowed();
  }, []);

  return (
    <ModalDefault action={submitHandler}>
      <div className="p-8 flex flex-col gap-y-3">
        <h2 className="font-medium text-2xl tracking-tight">Create Database</h2>
        <p className="text-front text-sm text-opacity-60">
          Enter a unique name for your database
        </p>
        <input
          type="text"
          ref={nameRef}
          className="border border-front border-opacity-30 px-2 py-1 rounded-md"
          placeholder="DB name..."
          minLength={3}
          maxLength={32}
        />
        <p className="text-front text-sm text-opacity-60 mt-3">
          Choose the plan for this Database
        </p>
        <select
          name="plan"
          ref={planRef}
          className="border border-front border-opacity-30 capitalize px-2 py-1 rounded-md"
        >
          {(Object.keys(Plan) as (keyof typeof Plan)[]).map(
            (plan, key) =>
              (plan != "basic" || basicAllowed) && (
                <option
                  key={key}
                  value={plan}
                  className="capitalize text-black"
                >
                  {plan}
                </option>
              )
          )}
        </select>

        <p className="text-front text-sm text-opacity-60 mt-3">
          Choose an icon to represent this Database
        </p>
        <IconSelect
          iconState={[icon, setIcon]}
          className="border border-front border-opacity-30 capitalize px-2 py-1 rounded-md focus-within:border-primary"
        />
      </div>
    </ModalDefault>
  );
}
