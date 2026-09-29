import { useState } from "react";

import CustomerTable from "../components/customer/CustomerTable";
import CustomerModal from "../components/customer/CustomerModal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

function Customers({ customers, setCustomers }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

  const handleAddCustomer = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      email,
      phone,
      status: "Active",
    };

    setCustomers([newCustomer, ...customers]);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Customers
      </h1>

      <div className="p-4 sm:p-5 bg-white border border-gray-200 rounded-lg space-y-4">
        <h3 className="text-base font-bold text-gray-800">
          Add New Customer
        </h3>

        <form
          onSubmit={handleAddCustomer}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <Input
              label="Name"
              placeholder="Enter name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <Input
              type="email"
              label="Email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <Input
              type="tel"
              label="Phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Add Customer
            </Button>
          </div>
        </form>
      </div>

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