function CustomerModal({ customer, onClose }) {
    if (!customer) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg space-y-2 max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Customer Details</h2>

                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Status:</strong> {customer.status}</p>

                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default CustomerModal;