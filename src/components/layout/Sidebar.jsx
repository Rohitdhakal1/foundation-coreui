import { Link } from "react-router-dom";
import LogoutButton from "../ui/LogoutButton";

function Sidebar() {
    return (
        <aside className="hidden md:flex flex-col justify-between md:w-48 lg:w-64 bg-gray-800 text-white min-h-screen p-4 shrink-0">
            <div className="space-y-6">
                <h2 className="text-lg lg:text-xl font-bold border-b border-gray-700 pb-2">
                    Sidebar Panel
                </h2>

                <nav className="flex flex-col gap-3">
                    <Link
                        to="/dashboard"
                        className="hover:text-blue-400 font-medium text-sm transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/customers"
                        className="hover:text-blue-400 font-medium text-sm transition-colors"
                    >
                        Customers
                    </Link>
                </nav>
            </div>

            <div className="pt-4 border-t border-gray-700">
                <LogoutButton variant="danger" />
            </div>
        </aside>
    );
}

export default Sidebar;