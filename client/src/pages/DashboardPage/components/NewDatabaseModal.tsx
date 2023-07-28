import MaterialIcon from "../../../common/MaterialIcon";
import useModal from "../../../hooks/useModal";
import { Plan } from "../../../interfaces/Data.d";

export default function NewDatabaseModal() {
  const modal = useModal();

  return (
    <div className="bg-background border border-front border-opacity-25 rounded-xl overflow-hidden min-w-[35vw]">
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
      </div>
      <div className="bg-foreground bg-opacity-10 p-4 flex justify-between border-t border-front border-opacity-20">
        <button
          className="bg-background bg-opacity-75 px-5 py-2 rounded-lg border border-front border-opacity-25 duration-300 hover:bg-opacity-50"
          onClick={() => modal.hide()}
        >
          Cancel
        </button>
        <button className="bg-foreground px-5 py-2 rounded-lg text-back duration-300 hover:brightness-75">
          Submit
        </button>
      </div>
    </div>
  );
}
