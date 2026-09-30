import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

function AddCustomerModal({ isOpen, onClose, onAddCustomer, customers }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [customerStatus, setCustomerStatus] = useState("Active");
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setCustomerStatus("Active");
        setErrors({});
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(email.trim())) {
            newErrors.email = "Please enter a valid email address.";
        } else if (
            customers.some(
                (c) => c.email.toLowerCase() === email.trim().toLowerCase()
            )
        ) {
            newErrors.email = "A customer with this email already exists.";
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required.";
        }

        if (!customerStatus) {
            newErrors.status = "Status is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newCustomer = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            status: customerStatus,
        };

        onAddCustomer(newCustomer);
        resetForm();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Add New Customer"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Input
                        label="Name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors({ ...errors, name: null });
                        }}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.name}</p>
                    )}
                </div>

                <div>
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: null });
                        }}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.email}</p>
                    )}
                </div>

                <div>
                    <Input
                        type="tel"
                        label="Phone"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => {
                            const numericOnly = e.target.value.replace(/\D/g, "");
                            setPhone(numericOnly);
                            if (errors.phone) setErrors({ ...errors, phone: null });
                        }}
                    />
                    {errors.phone && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.phone}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-600">Status</label>
                    <select
                        value={customerStatus}
                        onChange={(e) => {
                            setCustomerStatus(e.target.value);
                            if (errors.status) setErrors({ ...errors, status: null });
                        }}
                        className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                    {errors.status && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.status}</p>
                    )}
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">
                        Save Customer
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default AddCustomerModal;
