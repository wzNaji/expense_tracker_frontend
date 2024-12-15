import { getToken } from '../auth.js';

const API_BASE = 'http://localhost:8080/api';

export async function fetchBotApi(year, month, expenseName, userQuery) {
    const message = `${year}, ${month}, ${expenseName}, ${userQuery}`;

    try {
        const response = await fetch(`${API_BASE}/bot?message=${encodeURIComponent(message)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });

        if (response.ok) {
            const result = await response.json(); // Parsing the JSON response
            return result;
        } else {
            // Handle HTTP error statuses
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'An error occurred' };
        }
    } catch (error) {
        // Handle network errors or issues with the fetch operation
        return { success: false, message: error.message || 'Network or parsing error' };
    }
}
