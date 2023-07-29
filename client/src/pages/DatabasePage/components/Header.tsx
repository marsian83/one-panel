import useModal from "../../../hooks/useModal";
import GetConnectionStringModal from "./modals/GetConnectionStringModal";

export default function Header(props: { name: string }) {
  const modal = useModal();

  return (
    <section className="p-page-lg border-t border-b mt-3 py-12 border-foreground border-opacity-20">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl tracking-tight">{props.name}</h1>
        <div className="flex gap-x-4">
          <button
            className="btn-1 px-6 py-2 font-medium"
            onClick={() => modal.show(<GetConnectionStringModal />)}
          >
            Connection string
          </button>
          <button className="btn-1 px-6 py-2 font-medium">Settings</button>
          <button className="btn-2 px-6 py-2 font-medium">Endpoints</button>
        </div>
      </div>
    </section>
  );
}
