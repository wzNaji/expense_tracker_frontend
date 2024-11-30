export function checkAuth() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      window.location.href = 'login.html'; // Redirect to login page
    }
  }
  
  export function getToken() {
    return localStorage.getItem('jwtToken');
  }
  
  export function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
  }
  