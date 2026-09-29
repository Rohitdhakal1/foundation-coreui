import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../ui/LogoutButton";

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
            <div className="flex justify-between items-center">

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        <span className="text-xl font-bold">☰</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                            SD
                        </div>
                        <span className="font-bold text-gray-800 text-base hidden sm:inline">
                            ServiceDesk
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600 font-medium hidden sm:inline">
                        Admin User
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center border border-gray-300">
                        AU
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <nav className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                    <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-1 px-2 hover:bg-gray-100 rounded font-medium text-gray-700 text-sm"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/customers"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-1 px-2 hover:bg-gray-100 rounded font-medium text-gray-700 text-sm"
                    >
                        Customers
                    </Link>
                    <div className="pt-2">
                        <LogoutButton variant="danger" />
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;