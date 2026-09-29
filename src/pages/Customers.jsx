import { useState } from "react";

import CustomerTable from "../components/customer/CustomerTable";
import CustomerModal from "../components/customer/CustomerModal";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

function Customers({ customers, setCustomers }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [customerStatus, setCustomerStatus] = useState("Active");
  const [errors, setErrors] = useState({});

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

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

  const handleAddCustomer = (e) => {
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

    setCustomers([newCustomer, ...customers]);

    setName("");
    setEmail("");
    setPhone("");
    setCustomerStatus("Active");
    setErrors({});
    setIsAddModalOpen(false);
  };

  const handleCloseModal = () => {
    setErrors({});
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Customers
        </h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          + Add Customer
        </Button>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        title="Add New Customer"
      >
        <form onSubmit={handleAddCustomer} className="space-y-4">
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
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: null });
              }}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 font-medium mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
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
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Customer
            </Button>
          </div>
        </form>
      </Modal>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-gray-800">
            Customer Directory
          </h2>

          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <input
              className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Search customers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              className="p-2 text-sm border border-gray-300 rounded bg-white"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {filteredCustomers.length > 0 ? (
          <CustomerTable
            customers={filteredCustomers}
            onCustomerClick={setSelectedCustomer}
          />
        ) : (
          <EmptyState
            title="No customers found"
            message="No records match your search criteria."
          />
        )}
      </div>

      <CustomerModal
        customer={selectedCustomer}
        onClose={() =>
          setSelectedCustomer(null)
        }
      />
    </div>
  );
}

export default Customers;