// render.js
import { fetchMonths, fetchExpensesByMonth } from '/js/api/month.js';

export function renderMonths() {
    fetchMonths().then(months => {
        const monthList = document.getElementById('monthList');
        months.forEach(month => {
            const li = document.createElement('li');
            li.textContent = `${month.year} - ${month.month}`;
            li.id = month.id; // month object has an 'id' property
            li.addEventListener('click', () => renderExpensesForMonth(month.id));
            monthList.appendChild(li);
        });
    }).catch(error => {
        console.error('Error fetching months:', error);
    });
}
function renderExpensesForMonth(monthId) {
    fetchExpensesByMonth(monthId).then(expenses => {
        const content = document.getElementById('content');
        content.innerHTML = ''; // Clear previous content
        if (expenses.length >= 0) {
            const table = document.createElement('table');
            table.innerHTML = `
                <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Date</th>
                </tr>
            `;
            expenses.forEach(expense => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${expense.itemName}</td>
                    <td>${expense.price}</td>
                    <td>${expense.description}</td>
                    <td>${expense.category}</td>
                    <td>${expense.date}</td>
                `;
                table.appendChild(row);
            });
            content.appendChild(table);
        } else {
            content.textContent = 'No expenses available for this month.';
        }
    }).catch(error => {
        console.error('Error fetching expenses:', error);
    });
}

