import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Link to="/auth" className="bg-primary px-4 py-1 rounded-md text-white" />
    </>
  );
}
