import Modal from "../ui/Modal";
import Button from "../ui/Button";

function CustomerDeleteModal({ customer, isOpen, onClose, onConfirm }) {
    if (!customer) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm Delete"
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-800">
                        {customer.name}
                    </span>
                    ? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default CustomerDeleteModal;
