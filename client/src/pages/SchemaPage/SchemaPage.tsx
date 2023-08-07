import { useParams } from "react-router-dom";
import dummyCollections from "../../assets/data/collections";
import dummySchemas from "../../assets/data/schemas";

export default function SchemaPage() {
  const { id } = useParams();

  const collection = dummyCollections.filter((c) => c.id === Number(id))[0];
  const schema = dummySchemas.filter((s) => s.id === collection.schema)[0];

  return (
    <>
      <section className="flex h-[80vh] p-page">
        <div className="basis-2/3 h-full overflow-y-scrolls scrollbar-primary">
          {schema.definition.map((item, i) => (
            <div>{item.name}</div>
          ))}
        </div>
        <div className="basis-1/3"></div>
      </section>
    </>
  );
}
