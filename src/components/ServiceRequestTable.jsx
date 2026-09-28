function ServiceRequestTable({ requests }) {
    return (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600">
                        <th className="p-3">Customer</th>
                        <th className="p-3">Service</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-sm">
                    {requests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-3 font-medium text-gray-800">{request.customer}</td>
                            <td className="p-3 text-gray-600">{request.service}</td>
                            <td className="p-3">
                                <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${request.status === "Completed text-green-700 bg-green-100" || request.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : request.status === "Pending"
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-gray-100 text-gray-600"
                                    }`}>
                                    {request.status}
                                </span>
                            </td>
                            <td className="p-3 text-gray-500">{request.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceRequestTable;