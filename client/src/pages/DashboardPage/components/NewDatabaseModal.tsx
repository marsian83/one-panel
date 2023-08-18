import { useState } from "react";
import { icons } from "../../../assets/data/icons";
import IconSelect from "../../../common/IconSelect";
import ModalDefault from "../../../common/ModalDefault";
import { Plan } from "../../../interfaces/Data.d";

export default function NewDatabaseModal() {
  const [icon, setIcon] = useState(icons[0]);

  return (
    <ModalDefault>
      <div className="p-8 flex flex-col gap-y-3">
        <h2 className="font-medium text-2xl tracking-tight">Create Database</h2>
        <p className="text-front text-sm text-opacity-60">
          Enter a unique name for your database
        </p>
        <input
          type="text"
          className="border border-front border-opacity-30 px-2 py-1 rounded-md"
          placeholder="DB name..."
        />
        <p className="text-front text-sm text-opacity-60 mt-3">
          Choose the plan for this Database
        </p>
        <select
          name="plan"
          className="border border-front border-opacity-30 capitalize px-2 py-1 rounded-md"
        >
          {(Object.keys(Plan) as (keyof typeof Plan)[]).map((plan) => (
            <option value={plan} className="capitalize text-black">
              {plan}
            </option>
          ))}
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
