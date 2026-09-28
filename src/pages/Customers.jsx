import { useState } from "react";
import CustomerTable from "../components/CustomerTable";
import CustomerModal from "../components/CustomerModal";
import { customers as initialCustomers } from "../data/mockData";
import Input from "../components/Input";

function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
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

  const handleAddCustomer = () => {
    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      name,
      email,
      phone,
      status: "Active",
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customers</h2>

      <div className="flex gap-4 items-center">
        <input
          className="p-2 border border-gray-300 rounded"
          placeholder="Search customers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border border-gray-300 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-3">
        <h3 className="font-bold">Add Customer</h3>
        <div className="flex gap-3">
          <Input
            label="Name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="tel"
            label="Phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleAddCustomer}
            className="px-4 py-2 bg-blue-600 text-white rounded self-end"
          >
            Add Customer
          </button>
        </div>
      </div>

      <CustomerTable
        customers={filteredCustomers}
        onCustomerClick={setSelectedCustomer}
      />

      <CustomerModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}

export default Customers;