# Service Management Dashboard

This is my Day-1 frontend developer task. 

The main goal was to focus on getting the core React structure, routing, and basic state management working before worrying about complex styling. It's a simple, functional dashboard built using mock data.

## -> What's Included

- **Login Screen:** Simple email/password form with basic validation.
- **Dashboard:** Features 4 summary cards and a table displaying recent service requests.
- **Customer Management:** 
  - View full customer list
  - Real-time search by customer name
  - Filter by status (Active / Inactive)
  - Modal pop-up to view customer details
  - Form to add new mock customers on the fly
- **Navigation:** Persistent sidebar layout using client-side routing.

##  Tech Stack

- **React** (Vite setup)
- **React Router DOM** (for page navigation)
- **Tailwind CSS** (for quick layout alignment)
- **JavaScript (ES6+)** with local JS mock data

##  Folder Layout

```text
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── SummaryCard.jsx
│   ├── ServiceRequestTable.jsx
│   ├── CustomerTable.jsx
│   ├── CustomerModal.jsx
│   └── Input.jsx
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── Customers.jsx
├── data/
│   └── mockData.js
├── App.jsx
└── main.jsx
