function Header() {
    return (
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back!</p>
            </div>

            {/* small tweak for making profile name and circle icon  persoanl fav to mine*/}
            <div className="relative">
                <button className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        R
                    </div>
                    <span className="text-sm font-medium">Rohit</span>
                </button>
            </div>
        </header>
    );
}

export default Header;