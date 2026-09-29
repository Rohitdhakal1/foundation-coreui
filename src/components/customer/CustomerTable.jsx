import StatusBadge from "../ui/StatusBadge";

function CustomerTable({ customers, onCustomerClick }) {
    return (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-sm">
                    {customers.map((customer) => (
                        <tr
                            key={customer.id}
                            onClick={() => onCustomerClick(customer)}
                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <td className="p-3 font-medium text-gray-800">
                                {customer.name}
                            </td>

                            <td className="p-3 text-gray-600">
                                {customer.email}
                            </td>

                            <td className="p-3 text-gray-600">
                                {customer.phone}
                            </td>

                            <td className="p-3">
                                <StatusBadge status={customer.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerTable;