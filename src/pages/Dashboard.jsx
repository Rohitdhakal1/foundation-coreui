import SummaryCard from "../components/SummaryCard";
import ServiceRequestTable from "../components/ServiceRequestTable";
import { serviceRequests } from "../data/mockData";

function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard title="Total Customers" value="120" />
                <SummaryCard title="Active Services" value="45" />
                <SummaryCard title="Pending Requests" value="12" />
                <SummaryCard title="Revenue" value="₹1,20,000" />
            </div>

            <div>
                <h2 className="text-lg font-bold mb-3">Recent Service Requests</h2>
                <ServiceRequestTable requests={serviceRequests} />
            </div>
        </div>
    );
}

export default Dashboard;