import StatusBadge from "../ui/StatusBadge";

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
                        <th className="p-3">Amount</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-sm">
                    {requests.map((request) => (
                        <tr
                            key={request.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="p-3 font-medium text-gray-800">
                                {request.customer}
                            </td>

                            <td className="p-3 text-gray-600">
                                {request.service}
                            </td>

                            <td className="p-3">
                                <StatusBadge status={request.status} />
                            </td>

                            <td className="p-3 text-gray-500">
                                {request.date}
                            </td>
                            <td className="p-3 text-gray-500">
                                {request.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceRequestTable;