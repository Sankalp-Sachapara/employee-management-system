# Employee Management System

A Node.js web service that stores employee information using MVC architecture.

## MVC Architecture Explanation

This application follows the Model-View-Controller (MVC) design pattern:

### Model
- **employeeModel.js**: Handles all the data-related logic including storing, retrieving, and manipulating employee data in our JSON "database" (in-memory array).
- Implements business rules like preventing duplicate employee IDs.

### View
- **index.html**: Provides the user interface for entering employee information.
- **styles.css**: Defines the appearance of the UI elements.
- The browser renders these files to present data to the user.

### Controller
- **employeeController.js**: Acts as an intermediary between Model and View.
- Processes HTTP requests, validates input data, and determines responses.
- Coordinates with the Model to retrieve or store data.

### Additional Components
- **Routes**: Define the API endpoints and direct requests to the appropriate controller methods.
- **Server**: Initializes the application, sets up middleware, and listens for incoming requests.

## Installation and Setup

1. Make sure you have Node.js installed
2. Clone or download this repository
3. Navigate to the project directory
4. Install dependencies:
   ```
   npm install
   ```
5. Start the server:
   ```
   npm start
   ```
6. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- **GET /api/employees**: Get all employees
- **GET /api/employees/:id**: Get an employee by ID
- **POST /api/employees**: Create a new employee
- **PUT /api/employees/:id**: Update an existing employee
- **DELETE /api/employees/:id**: Delete an employee

## Technologies Used

- Node.js
- Express.js
- HTML/CSS/JavaScript (frontend)
