function StatusBadge({ status }) {
    const styles = {
        Active: "bg-green-100 text-green-700",
        Completed: "bg-green-100 text-green-700",
        Pending: "bg-amber-100 text-amber-700",
        Inactive: "bg-gray-100 text-gray-600",
    };

    return (
        <span
            className={`px-2.5 py-1 text-xs rounded-full font-medium ${styles[status] || "bg-gray-100 text-gray-600"
                }`}
        >
            {status}
        </span>
    );
}

export default StatusBadge;