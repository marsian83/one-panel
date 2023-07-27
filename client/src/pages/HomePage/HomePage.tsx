import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <section className="flex gap-x-4 my-8 p-page">
        <Link to="/auth" className="bg-primary px-4 py-1 rounded-md text-white">
          Auth
        </Link>
        <Link
          to="/dashboard"
          className="bg-primary px-4 py-1 rounded-md text-white"
        >
          Dashboard
        </Link>
        <Link
          to="/databases/0"
          className="bg-primary px-4 py-1 rounded-md text-white"
        >
          Artifacts
        </Link>
      </section>
    </>
  );
}
