// /js/api/month.js
import { getToken,checkAuth } from '../auth.js';

const API_BASE = 'http://localhost:8080/api/month';

// In your API module
export async function deleteMonth(id) {
  try {
    const response = await fetch(`${API_BASE}/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}` // Ensure correct token handling
      }
    });
    if (!response.ok) {
      // Handle non-success responses here by throwing an error
      const errorData = await response.json(); // Assumes backend sends error details in JSON
      throw new Error(errorData.message || 'Failed to delete month');
    }
    // Only return success details if everything was okay
    const result = await response.json(); // Parsing JSON for success response
    return { success: true, message: result.message };
  } catch (error) {
    // Catch both fetch errors and errors thrown from non-ok responses
    return { success: false, message: error.message || 'Network or parsing error' };
  }
}


export async function fetchMonths() {
    const response = await fetch(`${API_BASE}/monthList`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch months');
    }
    return await response.json();
}

export async function createMonth(data) {
  const response = await fetch(`${API_BASE}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
}


export async function fetchExpensesByMonth(monthId) {
    const response = await fetch(`${API_BASE}/expenseList/${monthId}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        if (response.status === 403) {
            window.location.href="login.html"
            return null;
        }
        const errorText = await response.text();
        throw new Error(`Failed to fetch expenses: ${errorText}`);
    }

    // Specifically check for 204 No Content
    if (response.status === 204) {
        console.log('No expenses available for the month.');
        return [];
    }

    return await response.json();
}


