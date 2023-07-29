import { useParams } from "react-router-dom";

export default function SchemaPage() {
  const { id } = useParams();

  return <div>SchemaPage</div>;
}
