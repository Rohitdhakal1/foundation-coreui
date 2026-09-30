# foundation-coreui

A frontend-only ServiceDesk admin interface for reviewing service-request performance and managing customer records.

## Project Overview

Three screens: a login page, a dashboard, and a customer directory. The dashboard summarises service activity (total customers, active services, pending requests, revenue) for a selectable timeframe and lists recent service requests with search, status filtering, and sorting. The customer directory supports searching, status filtering, adding a customer through a modal form, viewing customer details, and deleting a customer with confirmation. All data is local mock data; there is no backend.

## Tech Stack

- **React 19** — UI
- **Vite 8** — dev server and build
- **Tailwind CSS 4** (via `@tailwindcss/vite`) — styling and responsive layout
- **React Router DOM 7** — client-side routing
- **Fira Sans** (Google Fonts) — global typeface, set in `index.css` and `index.html`
- **JavaScript (ES modules, JSX)** and **ESLint 10** for linting

No state-management, form, or component libraries are used; state is handled with React hooks.

## Features

### Login and Route Protection
- Email format validation via regex, required password with a 6-character minimum, and inline error messages
- Credentials checked against the hardcoded `mockCredentials` list; a general "Invalid email or password" message on mismatch
- Simulated ~600 ms loading state on the submit button, then `isAuthenticated` is set in `localStorage` and the user is routed to the dashboard
- Logout removes the flag and returns to `/login` (available in the sidebar and the mobile menu)
- `<ProtectedRoute>` in `App.jsx` redirects unauthenticated visits to `/dashboard` or `/customers` back to `/login`, and sends already-authenticated visitors away from `/login`
- `/` and any unmatched path redirect to `/dashboard`

### Dashboard
- Four summary cards: Total Customers, Active Services, Pending Requests, and Revenue (sum of `amount` for completed requests)
- Timeframe filter — All Time, Today, This Week (Monday-based), This Month — recalculated from the current date on every render; the three request-based cards and the table update with it (Total Customers is a headcount, so it stays constant)
- Service request table with search across customer and service name, status filter (All / Active / Pending / Completed), and sorting by date or amount in either direction
- Empty state when nothing matches the current search and filters

### Customers
- Search by name using the shared `Input` component, plus a status filter (All / Active / Inactive / Pending)
- Add Customer modal (`AddCustomerModal`) with name, email, phone, and status fields
- Validation: required name, email, phone, and status; email regex check; duplicate email check against existing customers; phone input stripped to digits. Errors show inline and clear as the field is edited, and the form resets on save or cancel
- Clicking a row (or "View Details" in the row action menu) opens the customer details modal
- "Delete" in the row action menu opens a confirmation modal (`CustomerDeleteModal`) naming the customer; confirming removes the record and closes the details modal if it was open for that customer
- The row action menu closes when clicking outside the table
- Empty state when no customers match the current search and filter

### Layout and Responsiveness
- Sidebar navigation on desktop with the active link highlighted via `useLocation`; collapsible hamburger menu in the sticky header on smaller screens
- Static "Admin User" identity in the header
- Responsive breakpoints (`sm`, `md`, `lg`); tables scroll horizontally rather than breaking the layout on narrow screens

## How to Run

```bash
npm install
npm run dev      # start the Vite dev server
```

Mock accounts: `admin@example.com` / `admin123` or `rohit@example.com` / `rohit123`.

## Project Structure

```text
src/
├── main.jsx                 # React entry point
├── App.jsx                  # Routes + ProtectedRoute, shared layout, customer state and localStorage sync
├── index.css                # Tailwind entry and global font family
├── pages/
│   ├── login.jsx            # Login form and mock credential check
│   ├── Dashboard.jsx        # Summary cards, timeframe filter, table search/filter/sort
│   └── Customers.jsx        # Customer list state and modal wiring
├── components/
│   ├── layout/              # Sidebar.jsx, Header.jsx
│   ├── ui/                  # Button, Input, Modal, StatusBadge, EmptyState, LogoutButton
│   ├── dashboard/           # SummaryCard, ServiceRequestTable
│   └── customer/            # CustomerTable, CustomerModal, AddCustomerModal, CustomerDeleteModal
└── data/
    └── mockData.jsx         # initialCustomers, serviceRequests, mockCredentials
```

`Customers.jsx` holds only page-level state — search text, status filter, the selected customer, and which modal is open — and delegates the add form to `AddCustomerModal` and the delete confirmation to `CustomerDeleteModal`, so each component owns one job.

## Mock Data and Persistence

All seed data lives in `src/data/mockData.jsx`:

- `initialCustomers` — 10 customers (`id`, `name`, `email`, `phone`, `status`, `createdAt`)
- `serviceRequests` — 15 requests (`id`, `customer`, `service`, `status`, `date`, `amount`)
- `mockCredentials` — the two login accounts

`App.jsx` owns the customer list: it initialises state from `localStorage` (`app_customers`) and falls back to `initialCustomers` when nothing is stored. A `useEffect` writes the list back on every change, so additions and deletions survive a reload. `customers` and `setCustomers` are passed to `Dashboard` (read-only, for the Total Customers card) and `Customers` (add and delete), so both screens read the same array. Service requests are static mock data and are never persisted.

## Validation and UI States

- Inline red error text under invalid fields on login and on the add-customer form; errors clear when the field is edited
- Phone field strips non-numeric characters as you type
- Empty states via the `EmptyState` component when the customer list or the request table has no matches
- A successful add closes the modal, clears the form, and shows the new customer at the top of the table, in search and filter results, and in the dashboard's Total Customers card — there is no toast or success banner
- Deleting a customer always goes through the confirmation modal; cancelling leaves the list untouched
- Loading state on the login button only
- Closing the add-customer modal without submitting resets the form, so stale input or errors never carry into the next open

## Known Limitations

- Frontend prototype with mock data only — no backend or API integration.
- Authentication is client-side and simulated: credentials are hardcoded in the bundle and matched locally, and `isAuthenticated` is a plain `localStorage` flag with no real session or server-side enforcement. The guard reads `localStorage` during render rather than from React state, so a change made in another tab is not seen until this tab re-renders.
- Service request data is read-only and never persisted.
- No confirmation message after adding or deleting — only the resulting change in the list.
- No pagination, no way to edit or update a customer's status, and no automated tests.

## What I Learned

- **React state management with hooks:** `useState` holds each piece of UI state separately (search text, filters, sort order, timeframe, modal visibility, selected customer, form fields, errors), and `useEffect` handles side effects such as persisting customers.
- **Keeping related states consistent:** pages maintain several state values that must work together. Validation collects all problems into a single `errors` object and the submit handler bails out unless `Object.keys(newErrors).length === 0`.
- **Derived vs. stored state:** search results, filtered and sorted rows, and summary totals are recomputed during render from the source arrays instead of being stored, so they cannot drift out of sync with the underlying data.
- **One source of truth across components:** lifting `customers` into `App.jsx` means the table, search, filters, details modal, and the dashboard's Total Customers card all read the same array, so an add or delete is reflected everywhere at once.
- **Persistence with `localStorage`:** reading the stored value in the lazy `useState` initialiser and writing it back in `useEffect` keeps storage aligned with state across reloads, with the mock data acting as the seed.
- **Splitting components by responsibility:** moving the add form and delete confirmation out of the page left `Customers.jsx` only coordinating which modal is open and what happens on submit or confirm, while each component owns its own form state and validation.
- **Destructive actions need confirmation:** routing a delete through an explicit confirm modal that names the customer prevents an accidental click from silently removing data.
- **Date and time filtering:** deriving the start of the week from `getDay()` (treating Sunday as 0, Monday as 1) and the start of the month from `getFullYear()`/`getMonth()` supports Today / This Week / This Month, with all totals computed from the same filtered set.
- **Reactive UI:** because everything is derived during render, changing the timeframe, search, filter, or sort makes React re-run the computation and update the view automatically — no manual refresh or DOM manipulation.
- **Route protection with React Router:** a small `ProtectedRoute` wrapper that checks `isAuthenticated` before rendering the layout prevents direct URL access to protected pages, and the redirect is handled declaratively with `<Navigate>`.
