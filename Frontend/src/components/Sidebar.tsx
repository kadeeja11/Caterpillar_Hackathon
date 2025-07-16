import { LayoutDashboard, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white flex flex-col p-6">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center gap-2 hover:text-brand">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/settings" className="flex items-center gap-2 hover:text-brand">
          <Settings size={20} /> Settings
        </Link>
      </nav>
    </aside>
  );
}
