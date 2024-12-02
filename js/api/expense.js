import { getToken } from '../auth.js';

const API_BASE = 'http://localhost:8080/api/expense';


export async function createExpense(data) {
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

export async function deleteExpense(id) {
  const response = await fetch(`${API_BASE}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return response.json();
}
