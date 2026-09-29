import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import { initialCustomers } from "./data/mockData";

function Layout({ children }) {
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
                <Header />
                <main className="p-4 md:p-6 flex-1 overflow-x-hidden">{children}</main>
            </div>
        </div>
    );
}

function App() {
    const [customers, setCustomers] = useState(() => {
        const saved = localStorage.getItem("app_customers");
        return saved ? JSON.parse(saved) : initialCustomers;
    });

    useEffect(() => {
        localStorage.setItem("app_customers", JSON.stringify(customers));
    }, [customers]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <Layout>
                            <Dashboard customers={customers} />
                        </Layout>
                    }
                />
                <Route
                    path="/customers"
                    element={
                        <Layout>
                            <Customers customers={customers} setCustomers={setCustomers} />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;