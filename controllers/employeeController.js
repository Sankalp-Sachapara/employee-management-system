// controllers/employeeController.js - Handles request processing and response

const employeeModel = require('../models/employeeModel');

class EmployeeController {
  // Get all employees
  getAllEmployees(req, res) {
    try {
      const employees = employeeModel.getAllEmployees();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
  }

  // Get employee by ID
  getEmployeeById(req, res) {
    try {
      const id = req.params.id;
      const employee = employeeModel.getEmployeeById(id);

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
  }

  // Create a new employee
  createEmployee(req, res) {
    try {
      // Extract employee data from request body
      const { firstName, lastName, id, salary, workingDepartment, email } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !id || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Create employee object
      const newEmployee = {
        firstName,
        lastName,
        id,
        salary: salary || 0,
        workingDepartment: workingDepartment || 'General',
        email
      };

      // Add employee using the model
      const result = employeeModel.addEmployee(newEmployee);

      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }

      res.status(201).json({ message: 'Employee created successfully', employee: result.employee });
    } catch (error) {
      res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
  }

  // Update an employee
  updateEmployee(req, res) {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      
      const result = employeeModel.updateEmployee(id, updatedData);

      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }

      res.status(200).json({ message: 'Employee updated successfully', employee: result.employee });
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
  }

  // Delete an employee
  deleteEmployee(req, res) {
    try {
      const id = req.params.id;
      const result = employeeModel.deleteEmployee(id);

      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }

      res.status(200).json({ message: 'Employee deleted successfully', employee: result.employee });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
  }
}

module.exports = new EmployeeController();