function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    isLoading = false,
    disabled = false,
    className = ""
}) {
    const baseStyles = "px-4 py-2 text-sm font-medium rounded transition-colors focus:outline-none";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100",
        danger: "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
}

export default Button;