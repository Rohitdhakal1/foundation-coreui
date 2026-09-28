function Input({ type = "text", label, placeholder, value, onChange }) {
    return (
        <div className="flex flex-col gap-1 flex-1">
            {label && (
                <label className="text-xs font-semibold text-gray-600">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
        </div>
    );
}

export default Input;