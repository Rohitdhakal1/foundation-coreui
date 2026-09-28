import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";

// Previously, I added the Header separately to the Customer and Dashboard pages, 
// but that felt a bit hardcoded to me personally ,
//so I made it more reusable by moving it into a shared layout. 
function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <Layout>
                            <Dashboard />
                        </Layout>
                    }
                />

                <Route
                    path="/customers"
                    element={
                        <Layout>
                            <Customers />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;