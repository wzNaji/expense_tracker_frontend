// main.js
import { renderMonths } from './ui/render.js';
import { checkAuth, logout } from './auth.js';


// Check authentication before DOM load
checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Fetch and display months in the sidebar
    renderMonths();
    
});
