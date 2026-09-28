import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Sample Project</h2>

            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            <Link to="/customers" className="hover:text-blue-400">Customers</Link>
        </div>
    );
}

export default Sidebar;