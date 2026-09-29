function EmptyState({ title = "No results found", message = "Try adjusting your search or filter options." }) {
    return (
        <div className="p-8 text-center bg-white border border-gray-200 rounded-lg my-4">
            <p className="text-gray-800 font-medium text-base">{title}</p>
            <p className="text-gray-500 text-sm mt-1">{message}</p>
        </div>
    );
}

export default EmptyState;