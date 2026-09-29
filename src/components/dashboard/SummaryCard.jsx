function SummaryCard({ title, value }) {
    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
    );
}

export default SummaryCard;