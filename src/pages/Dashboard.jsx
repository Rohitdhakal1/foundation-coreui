import { useState } from "react";

import SummaryCard from "../components/dashboard/SummaryCard";

import ServiceRequestTable from "../components/dashboard/ServiceRequestTable";

import EmptyState from "../components/ui/EmptyState";

import { serviceRequests } from "../data/mockData";

function Dashboard({ customers }) {
    const [timeframe, setTimeframe] = useState("All");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("date-desc");

    const totalCustomers = customers ? customers.length : 0;


    // new learn date techique usecase still syntax i forget but logic is quite easy 
    const today = new Date();
    const startOfWeek = new Date(today);
    const day = today.getDay(); // Sunday = 0
    const diff = day === 0 ? 6 : day - 1; // Monday as start of week
    startOfWeek.setDate(today.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const filteredByTimeframe = serviceRequests.filter((req) => {
        const requestDate = new Date(req.date);

        if (timeframe === "Today") {
            return (
                requestDate.getFullYear() === today.getFullYear() &&
                requestDate.getMonth() === today.getMonth() &&
                requestDate.getDate() === today.getDate()
            );
        }

        if (timeframe === "This Week") {
            return requestDate >= startOfWeek;
        }

        if (timeframe === "This Month") {
            return requestDate >= startOfMonth;
        }

        return true;
    });


    const activeServices = filteredByTimeframe.filter(
        (r) => r.status === "Active"
    ).length;

    const pendingRequests = filteredByTimeframe.filter(
        (r) => r.status === "Pending"
    ).length;

    const totalRevenue = filteredByTimeframe
        .filter((r) => r.status === "Completed")
        .reduce((sum, r) => sum + (r.amount || 0), 0);

    const processedRequests = filteredByTimeframe
        .filter((req) => {
            const matchesSearch =
                req.customer.toLowerCase().includes(search.toLowerCase()) ||
                req.service.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "All" || req.status === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === "date-desc") {
                return new Date(b.date) - new Date(a.date);
            }

            if (sortBy === "date-asc") {
                return new Date(a.date) - new Date(b.date);
            }

            if (sortBy === "amount-desc") {
                return (b.amount || 0) - (a.amount || 0);
            }

            if (sortBy === "amount-asc") {
                return (a.amount || 0) - (b.amount || 0);
            }

            return 0;
        });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Dashboard
                    </h1>

                    <p className="text-xs sm:text-sm text-gray-500">
                        Overview of service performance
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-600">
                        Timeframe:
                    </label>

                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="p-2 text-xs sm:text-sm border border-gray-300 rounded bg-white"
                    >
                        <option value="All">All Time</option>
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard
                    title="Total Customers"
                    value={totalCustomers}
                />

                <SummaryCard
                    title="Active Services"
                    value={activeServices}
                />

                <SummaryCard
                    title="Pending Requests"
                    value={pendingRequests}
                />

                <SummaryCard
                    title="Revenue"
                    value={`₹${totalRevenue.toLocaleString()}`}
                />
            </div>

            <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="text-lg font-bold text-gray-800">
                        Recent Service Requests
                    </h2>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 text-sm border border-gray-300 rounded w-full sm:w-48"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="p-2 text-sm border border-gray-300 rounded bg-white"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="p-2 text-sm border border-gray-300 rounded bg-white"
                        >
                            <option value="date-desc">Newest</option>
                            <option value="date-asc">Oldest</option>
                            <option value="amount-desc">
                                Amount: High to Low
                            </option>
                            <option value="amount-asc">
                                Amount: Low to High
                            </option>
                        </select>
                    </div>
                </div>

                {processedRequests.length > 0 ? (
                    <ServiceRequestTable requests={processedRequests} />
                ) : (
                    <EmptyState
                        title="No service requests found"
                        message="No requests match your current search parameters."
                    />
                )}
            </div>
        </div>
    );
}

export default Dashboard;