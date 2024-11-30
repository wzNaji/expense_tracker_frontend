// month.js
import { getToken,checkAuth } from '../auth.js';

const API_BASE = 'http://localhost:8080/api/month';


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

export async function deleteMonth(id) {
  const response = await fetch(`${API_BASE}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
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


