// render.js
import { fetchMonths, fetchExpensesByMonth } from '/js/api/month.js';
import { createExpense, } from '/js/api/expense.js';
import { fetchCategories } from '/js/api/category.js';

export function renderMonths() {
    fetchMonths().then(months => {
        const monthList = document.getElementById('monthList');
        months.forEach(month => {
            const li = document.createElement('li');
            li.textContent = `${month.year} - ${month.month}`;
            li.id = month.id;
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
        createAddExpenseButton(content, monthId);
        createExpenseTable(content, expenses);
    }).catch(error => {
        console.error('Error fetching expenses:', error);
    });
}

function createAddExpenseButton(content, monthId) {
    const addExpenseBtn = document.createElement('button');
    addExpenseBtn.id = 'addExpenseBtn';
    addExpenseBtn.textContent = 'Add Expense';
    addExpenseBtn.addEventListener('click', () => {
        showExpenseModal(monthId);
    });
    content.appendChild(addExpenseBtn);
}

function showExpenseModal(monthId) {
    const modal = document.createElement('div');
    modal.id = 'expenseModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <form id="expenseForm">
                <label for="itemName">Item Name:</label>
                <input type="text" id="itemName" name="itemName"><br>
                <label for="description">Description:</label>
                <input type="text" id="description" name="description"><br>
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" step="0.01" min="0">
                <label for="category">Category:</label>
                <select id="category" name="category" ></select><br>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal); // Append modal to body to cover entire screen
    modal.style.display = 'block';

    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    populateCategories();
    // Adding form submission handling
    const form = modal.querySelector('#expenseForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        let categoryValue = form.category.value;
        console.log(categoryValue)
        if(categoryValue === "") {
            categoryValue = null;
        }

        const expenseData = {
            itemName: form.itemName.value,
            description: form.description.value,
            price: parseFloat(form.price.value),
            category :{
                name : categoryValue
            },
            month: {
                id: monthId
            }
        }

        console.log(JSON.stringify(expenseData));

        try {
            const response = await createExpense(expenseData);
            console.log('Expense Added:', response);
            document.body.removeChild(modal); // Remove modal after submission
            renderExpensesForMonth(monthId);
        } catch (error) {
            console.error('Failed to add expense:', error);
            // TODO show an error message within the modal
        }
    });
}

function populateCategories() {
    fetchCategories().then(categories => {
        const select = document.getElementById('category');
        select.innerHTML = ''; 
        categories.forEach(category => {
            let option = new Option(category.name);
            select.appendChild(option);
        });
    }).catch(error => {
        console.error('Error loading categories:', error);
    });
}

function createExpenseTable(content, expenses) {
    if (expenses.length > 0) {
        const table = document.createElement('table');
        table.innerHTML = `<tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
        </tr>`;
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.itemName}</td>
                <td>${expense.price}</td>
                <td>${expense.description}</td>
                <td>${expense.category ? expense.category.name : ''}</td>
                <td>${expense.date}</td>
            `;
            table.appendChild(row);
        });
        content.appendChild(table);
    } else {
        content.textContent = 'No expenses available for this month.';
    }
}
