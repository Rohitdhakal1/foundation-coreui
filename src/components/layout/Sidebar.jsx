import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../ui/LogoutButton";

function Sidebar() {
    const location = useLocation();

    const getLinkClasses = (path) => {
        const isActive = location.pathname === path;
        return isActive
            ? "bg-[#2563eb] text-white px-3 py-2 rounded-md font-medium text-sm transition-colors"
            : "text-slate-700 hover:bg-slate-200 hover:text-slate-900 px-3 py-2 rounded-md font-medium text-sm transition-colors";
    };

    return (
        <aside className="hidden md:flex flex-col justify-between md:w-48 lg:w-64 bg-[#f1f5f9] border-r border-slate-200 h-screen sticky top-0 p-4 shrink-0 overflow-y-auto">
            <div className="space-y-6">
                <h2 className="text-lg lg:text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">
                    Workspace
                </h2>

                <nav className="flex flex-col gap-2">
                    <Link
                        to="/dashboard"
                        className={getLinkClasses("/dashboard")}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/customers"
                        className={getLinkClasses("/customers")}
                    >
                        Customers
                    </Link>
                </nav>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-200">
                <LogoutButton variant="danger" />
            </div>
        </aside>
    );
}

export default Sidebar;