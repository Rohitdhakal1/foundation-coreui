function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg max-w-md w-full p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 font-bold text-xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal;