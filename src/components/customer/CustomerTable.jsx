import { useState, useEffect } from "react";
import StatusBadge from "../ui/StatusBadge";

function CustomerTable({ customers, onCustomerClick, onDeleteCustomer }) {
    const [openMenuId, setOpenMenuId] = useState(null);

    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                        <th className="p-3 w-16 text-center">Action</th>
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
                            <td className="p-3 text-center relative" onClick={(e) => e.stopPropagation()}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenMenuId(openMenuId === customer.id ? null : customer.id)
                                    }
                                    className="p-1.5 text-gray-500 hover:text-gray-800 rounded hover:bg-gray-100 font-bold leading-none text-base"
                                    title="Customer actions"
                                    aria-label="Customer actions"
                                >
                                    ⋮
                                </button>

                                {openMenuId === customer.id && (
                                    <div className="absolute left-3 top-10 bg-white border border-gray-200 rounded shadow-md py-1 z-20 w-32 text-left">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOpenMenuId(null);
                                                onCustomerClick(customer);
                                            }}
                                            className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOpenMenuId(null);
                                                onDeleteCustomer(customer.id);
                                            }}
                                            className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>

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