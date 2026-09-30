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
        <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-gray-50 overflow-x-hidden md:overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 md:h-full md:overflow-y-auto">
                <Header />
                <main className="p-4 md:p-6 flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
            </div>
        </div>
    );
}

function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
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
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route
                    path="/login"
                    element={
                        localStorage.getItem("isAuthenticated") === "true" ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard customers={customers} />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Customers customers={customers} setCustomers={setCustomers} />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
