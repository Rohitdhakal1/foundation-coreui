# DAY2
## Tech Stack

* **React 19** – UI library
* **Vite 8** – Build tool and development server
* **Tailwind CSS 4** – Styling and responsive layouts
* **React Router DOM 7** – Client-side routing
* **JavaScript (ES6+)** – Application logic
* **ESLint 10** – Code quality and linting

## Getting Started

Install the dependencies:

```bash
npm install
```
Start the server:
```bash
npm run dev
```

## What's Included

### Login

* Email and password validation
* Inline validation messages
* Minimum password length validation
* Simulated loading state during login
* Mock authentication using `localStorage`
* Navigation to the dashboard after successful login
* Logout functionality

There is no real authentication or backend. Any valid-looking email and password combination is accepted.

### Dashboard

* Four summary cards:

  * **Total Customers**
  * **Active Services**
  * **Pending Requests**
  * **Revenue**
* Timeframe filtering:

  * All Time
  * Today
  * This Week
  * This Month
* Dynamic date-based filtering
* Search by customer name or service name
* Filter service requests by status
* Sort by date or amount
* Revenue calculated from completed service requests
* Empty state when no requests match the selected filters

### Customer Management

* Customer directory
* Search customers by name
* Filter customers by Active / Inactive / Pending status
* Add new customers via a centered modal overlay
* Comprehensive form validation:
  * Required field checks (Name, Email, Phone, Status)
  * Email format validation via regex
  * Numeric-only phone number input
  * Real-time and submit-time inline red error messages
* Customer details modal
* Shared customer state
* Empty state when no customers match the current filters

### Navigation & Layout

* Responsive sidebar navigation
* Header with mobile navigation
* Dashboard and Customers pages
* Client-side routing with React Router
* Responsive layouts for mobile, tablet, and desktop
* Horizontally scrollable tables on smaller screens

## Reusable Components

| Component             | Purpose                                                     |
| --------------------- | ----------------------------------------------------------- |
| `Button`              | Reusable button with variants, loading, and disabled states |
| `Input`               | Reusable labelled input field                               |
| `Modal`               | Reusable modal/overlay component                            |
| `StatusBadge`         | Displays status with consistent styling                     |
| `EmptyState`          | Displays a message when no records are available            |
| `LogoutButton`        | Handles the logout action                                   |
| `Sidebar`             | Application navigation                                      |
| `Header`              | Application header and mobile navigation                    |
| `SummaryCard`         | Dashboard statistics card                                   |
| `CustomerTable`       | Displays customer records                                   |
| `CustomerModal`       | Displays selected customer details                          |
| `ServiceRequestTable` | Displays service request records                            |

## Project Structure

```text
src/
├── main.jsx
├── index.css
├── App.jsx
│
├── pages/
│   ├── login.jsx
│   ├── Dashboard.jsx
│   └── Customers.jsx
│
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── EmptyState.jsx
│   │   └── LogoutButton.jsx
│   │
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   │
│   ├── customer/
│   │   ├── CustomerTable.jsx
│   │   └── CustomerModal.jsx
│   │
│   └── dashboard/
│       ├── SummaryCard.jsx
│       └── ServiceRequestTable.jsx
│
└── data/
    └── mockData.jsx
```

## Data

The application uses local mock data instead of a backend or API.

### Service Requests

Each service request contains:

```text
id
customer
service
status
date
amount
```

### Customers

Each customer contains:

```text
id
name
email
phone
status
createdAt
```

The application uses these service request statuses:

```text
Active
Pending
Completed
```

Customer statuses are:

```text
Active
Inactive
Pending
```

## Notes

* This is a frontend-only prototype.
* There is no backend or API integration.
* Authentication is simulated on the client side.
* Customer data is persisted using `localStorage`.
* Service request data is provided through local mock data.
* The application is intended to demonstrate frontend functionality and React development practices.
