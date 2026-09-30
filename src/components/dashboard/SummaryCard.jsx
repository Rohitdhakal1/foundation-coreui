function SummaryCard({ title, value }) {
    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-xs text-gray-500 font-medium tracking-wide uppercase">{title}</h3>
            <p className="text-4xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
    );
}

export default SummaryCard;