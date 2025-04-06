// models/employeeModel.js - Handles data and business logic

// Our in-memory database (JSON array)
let employees = [];

class EmployeeModel {
  // Get all employees
  getAllEmployees() {
    return employees;
  }

  // Get employee by ID
  getEmployeeById(id) {
    return employees.find(employee => employee.id === id);
  }

  // Add a new employee
  addEmployee(employee) {
    // Check if employee with the same ID already exists
    if (this.getEmployeeById(employee.id)) {
      return { success: false, message: 'Employee with this ID already exists' };
    }

    // Add employee to our database
    employees.push(employee);
    return { success: true, employee };
  }

  // Update an employee
  updateEmployee(id, updatedEmployee) {
    const index = employees.findIndex(employee => employee.id === id);
    if (index === -1) {
      return { success: false, message: 'Employee not found' };
    }

    employees[index] = { ...employees[index], ...updatedEmployee };
    return { success: true, employee: employees[index] };
  }

  // Delete an employee
  deleteEmployee(id) {
    const index = employees.findIndex(employee => employee.id === id);
    if (index === -1) {
      return { success: false, message: 'Employee not found' };
    }

    const deletedEmployee = employees[index];
    employees = employees.filter(employee => employee.id !== id);
    return { success: true, employee: deletedEmployee };
  }
}

module.exports = new EmployeeModel();