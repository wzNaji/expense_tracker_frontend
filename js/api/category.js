// category.js
import { getToken } from '../auth.js';

const API_BASE = 'http://localhost:8080/api/category';

export async function fetchCategories() {
  try{
    const response = await fetch(`${API_BASE}/categoryList`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    if(response.ok) {
      const result = await response.json();
      if(result.success === false){
        return { success: false, categories: [], message: result.message };
      } else if(result.success === true) {
        return { success: true, categories: result.categories, message: result.message };
      }
  }
  }
  catch(error) {
  const errorData = await response.json();
  return { success: false, message: error.message || 'Network or parsing error' };
  }
}

export async function deleteCategory(id) {
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
      throw new Error(errorData.message || 'Failed to delete category');
    }
    // Only return success details if everything was okay
    const result = await response.json(); // Parsing JSON for success response
    return { success: true, message: result.message };
  } catch (error) {
    // Catch both fetch errors and errors thrown from non-ok responses
    return { success: false, message: error.message || 'Network or parsing error' };
  }
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