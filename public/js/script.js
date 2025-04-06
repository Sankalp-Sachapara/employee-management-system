// Client-side JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get form and message elements
  const employeeForm = document.getElementById('employeeForm');
  const messageDiv = document.getElementById('message');
  const employeeList = document.getElementById('employeeList');
  
  // Load employees when page loads
  loadEmployees();
  
  // Add event listener for form submission
  employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(employeeForm);
    const employee = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      id: formData.get('id'),
      salary: formData.get('salary') || 0,
      workingDepartment: formData.get('workingDepartment') || 'General',
      email: formData.get('email')
    };
    
    try {
      // Send POST request to API
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Display success message
        showMessage(data.message, 'success');
        
        // Clear the form
        employeeForm.reset();
        
        // Reload employee list
        loadEmployees();
      } else {
        // Display error message
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Error adding employee. Please try again.', 'error');
      console.error('Error:', error);
    }
  });
  
  // Function to load employees from API
  async function loadEmployees() {
    try {
      const response = await fetch('/api/employees');
      const employees = await response.json();
      
      // Clear existing list
      employeeList.innerHTML = '';
      
      // Add employees to the table
      employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${employee.id}</td>
          <td>${employee.firstName}</td>
          <td>${employee.lastName}</td>
          <td>${employee.workingDepartment}</td>
          <td>${employee.salary}</td>
          <td>${employee.email}</td>
        `;
        
        employeeList.appendChild(row);
      });
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }
  
  // Function to display messages
  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = 'message';
    }, 5000);
  }
});