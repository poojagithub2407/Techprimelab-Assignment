# Techprimelab Assignment

## Introduction
This assignment consists  using frontend and backend technologies to demonstrate full stack development capabilities.

## Technology Stack
- **Front-End**: React
- **Back-End**: Node.js
- **Database**: MongoDB 
- **UI**: HTML, CSS, Bootstrap

## Functionalities
The following functionalities are required for the assignment:

1. **Login with Authentication**:
   - UI to support login functionality.
   - UI validation for email format and non-empty fields.
   - Authentication using JWT token.
   - Display message "Invalid credentials" for invalid users.
   - Navigate to the dashboard for valid users.

2. **Insert Project Details**:
   - Form to insert project details with validations.
   - Use date picker for start and end dates with validation.
   - Default value for status field as “Registered”.

3. **Project Listing**:
   - List all projects inserted into the database.
   - Update project status (Start, Close, Cancel) and reflect changes without refreshing.
   - Search functionality to filter projects.
   - Sorting functionality for columns.
   - Pagination to display 10 records per page.

4. **Dashboard**:
   - Counters showing various project statuses.
   - Graph showing department-wise project completion report.

## Pages

### Login Page
- UI to support login functionality.
- Validate email format and non-empty fields.
- Use JWT token for authentication.
- Display "Invalid credentials" message for invalid users.
- Navigate to the dashboard for valid users.

### Insert Project Page
- Form to insert new project details.
- All fields are mandatory and use dropdowns.
- Date picker for start and end dates with validation.
- Default value for status field as “Registered”.
- Implement UI validations.

### Project Listing Page
- Display all projects from the database.
- Update project status without refreshing the page.
- Implement search, sort, and pagination functionalities.

### Dashboard Page
- Display counters for total projects, closed projects, running projects, delayed projects, and cancelled projects.
- Chart showing department-wise success percentage of projects.

## Menu
- Dashboard: Navigate to the dashboard.
- Project Listing: Navigate to the project listing page.
- Add Project: Navigate to the insert project page.
- Logout: Navigate to the login page. Ensure other pages are not accessible without logging in.

## Mockups and Resources
- [Assignment Demo Videos](https://drive.google.com/drive/folders/1oqTrRXimLiNGHoizuQ0eHNkHExtwlW-3?usp=drive_link)

## Notes
- Create separate API calls for getting counters and chart data.
- Do not use the project listing API to get these values.
- Implement a horizontal menu or a similar one shown in the mockups.
