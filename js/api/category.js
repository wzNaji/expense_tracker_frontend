// category.js
import { getToken } from '../auth.js';

const API_BASE = 'http://localhost:8080/api/category';

export async function fetchCategories() {
  const response = await fetch(`${API_BASE}/categoryList`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  if(response.status === 204) {
    console.log("No saved categories")
    return [];
  }
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

export async function createCategory(data) {
  try{
    const response = await fetch(`${API_BASE}/create`, {
  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  if(!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message) || 'Failed to create category';
  }
  const result =await response.json();
  return {success: true, message: result.message};

} catch (error){
  return {success: false, message: error.message|| 'Network or parsing error' }
}
}