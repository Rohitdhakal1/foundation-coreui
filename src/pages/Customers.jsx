import { useState } from "react";

import CustomerTable from "../components/customer/CustomerTable";
import CustomerModal from "../components/customer/CustomerModal";
import AddCustomerModal from "../components/customer/AddCustomerModal";
import CustomerDeleteModal from "../components/customer/CustomerDeleteModal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

function Customers({ customers, setCustomers }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

  const handleAddCustomer = (newCustomer) => {
    setCustomers([newCustomer, ...customers]);
    setIsAddModalOpen(false);
  };

  const handleDeleteCustomer = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setCustomerToDelete(customer);
    }
  };

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      setCustomers(customers.filter((c) => c.id !== customerToDelete.id));
      if (selectedCustomer && selectedCustomer.id === customerToDelete.id) {
        setSelectedCustomer(null);
      }
      setCustomerToDelete(null);
    }
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

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-gray-800">
            Customer Directory
          </h2>

          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
            onDeleteCustomer={handleDeleteCustomer}
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
        onClose={() => setSelectedCustomer(null)}
      />

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCustomer={handleAddCustomer}
        customers={customers}
      />

      <CustomerDeleteModal
        customer={customerToDelete}
        isOpen={!!customerToDelete}
        onClose={() => setCustomerToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Customers;