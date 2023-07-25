import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-page flex items-center py-6">
      <Link to="/" className="flex items-center gap-x-2">
        <img src="/logo.png" alt="onepanel logo" className="w-[3em]" />
        <h1 className="font-medium text-2xl">Onepanel</h1>
      </Link>
    </nav>
  );
}
