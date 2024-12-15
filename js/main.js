// main.js
import { checkAuth, logout } from './auth.js';
import { renderMonths,setupChatButton } from './ui/render.js';
import { addMonthBtnEvent } from './ui/events.js';


// Check authentication before DOM load
checkAuth();

document.addEventListener('DOMContentLoaded', () => {
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', logout)

    setupChatButton();


    // Fetch and display months in the sidebar
    renderMonths();

    // Eventlistener for add month button
    addMonthBtnEvent();


});
