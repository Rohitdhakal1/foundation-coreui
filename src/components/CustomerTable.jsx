function CustomerTable({ customers, onCustomerClick }) {
    return (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600">
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
                            <td className="p-3 font-medium text-gray-800">{customer.name}</td>
                            <td className="p-3 text-gray-600">{customer.email}</td>
                            <td className="p-3 text-gray-600">{customer.phone}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${customer.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}>
                                    {customer.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerTable;