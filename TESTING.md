# Testing Checklist

Manual test cases for the core workflows and edge cases in this project. All data is mock data; no backend is involved.

**How to run:** `npm install`, then `npm run dev`
**Test accounts:** `admin@example.com` / `admin123` or `rohit@example.com` / `rohit123`

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| 1 | Login with valid credentials (`admin@example.com` / `admin123`) | Loading state shows on the button, then the Dashboard opens | Pass |
| 2 | Login with invalid credentials (valid email format, wrong password) | "Invalid email or password." message appears and the user stays on the login page | Pass |
| 3 | Login validation: empty email, invalid email format, empty password, password under 6 characters | Inline error message appears under the offending field | Pass|
| 4 | Click Log Out from the sidebar or mobile menu | `isAuthenticated` is cleared and the Login page is shown | Pass |
| 5 | Open `/dashboard` or `/customers` directly without logging in | Redirected to `/login` | Pass |
| 6 | Dashboard timeframe filter: All Time / Today / This Week / This Month | Active Services, Pending Requests, Revenue, and the request table update to match the selected period; Total Customers stays constant | Pass |
| 7 | Service request search by customer or service name | Table shows only matching requests | Pass |
| 8 | Service request status filter (All / Active / Pending / Completed) | Table shows only requests with the selected status | Pass |
| 9 | Service request sorting (Newest, Oldest, Amount High to Low, Amount Low to High) | Rows reorder by date or amount as selected | Pass |
| 10 | Dashboard search/filter combination that matches no request | "No service requests found" empty state appears | Pass |
| 11 | Customer search by name | Table shows only customers whose name matches | Pass |
| 12 | Customer status filter (All / Active / Inactive / Pending) | Table shows only customers with the selected status | Pass |
| 13 | Add Customer with valid name, email, phone, and status | Modal closes, form resets, and the new customer appears at the top of the table | Pass |
| 14 | Add Customer with any required field left empty | Inline error appears under each empty field and the form does not submit | Pass |
| 15 | Add Customer with an invalid email format | "Please enter a valid email address." appears under the email field | Pass |
| 16 | Add Customer with an email already used by an existing customer | "A customer with this email already exists." appears and the form does not submit | Pass |
| 17 | Type letters or symbols into the phone field | Non-digit characters are not accepted | Pass |
| 18 | Click a customer row, or "View Details" in the row action menu | Customer details modal opens with name, email, phone, and status | Pass |
| 19 | Click "Delete" in the row action menu | Confirmation modal opens, naming the customer and warning the action cannot be undone | Pass |
| 20 | Cancel from the delete confirmation modal | Modal closes and the customer is still listed | Pass |
| 21 | Confirm the delete in the confirmation modal | Customer is removed from the table; the details modal closes if it was open for that customer | Pass |
| 22 | Add or delete a customer, then refresh the page | The change is still present after reload | Pass |
| 23 | Change the customer list, then open the Dashboard | Total Customers reflects the current number of customers | Pass |
| 24 | Customer search or filter that matches no customer | "No customers found" empty state appears | Pass |
| 25 | View the app at mobile | Sidebar collapses into the header hamburger menu; tables scroll horizontally without breaking the layout | Pass |
| 26 | Open a row action menu, then click outside the table | The menu closes | Pass |

## Notes

- `app_customers` in `localStorage` holds the customer list. Clear it to restore the original 10 mock records.
- `isAuthenticated` in `localStorage` stores the session flag; logout removes it.
