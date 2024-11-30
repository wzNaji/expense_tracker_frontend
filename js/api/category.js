import { getToken } from '../auth.js';

const API_BASE = '/api/category';

export async function fetchCategories() {
  const response = await fetch(`${API_BASE}/categoryList`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return response.json();
}

export async function createCategory(data) {
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

export async function deleteCategory(id) {
  const response = await fetch(`${API_BASE}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return response.json();
}
