// render.js
import { fetchMonths, fetchExpensesByMonth } from '/js/api/month.js';
import { createExpense, apiDeleteExpense } from '/js/api/expense.js';
import { fetchCategories } from '/js/api/category.js';
import { setupDeleteMonthButtons, addCategoryFormSubmission } from '/js/ui/events.js';

export function renderMonths() {
    fetchMonths().then(months => {
    
        const monthList = document.getElementById('monthList');
        monthList.innerHTML = ''; // Clear the list before rendering
        months.forEach(month => {
            const li = document.createElement('li');
            li.textContent = `${month.year} - ${month.month}`;
            li.id = `month-${month.id}`;  // Assigning an ID to the list item for potential future use

            // Create delete button for each month
            const deleteMonthBtn = document.createElement("button");
            deleteMonthBtn.textContent = "X";
            deleteMonthBtn.className = "deleteMonthBtn";
            deleteMonthBtn.setAttribute('data-month-id', month.id); // Store month ID in data attribute

            li.appendChild(deleteMonthBtn);
            li.addEventListener('click', (event) => {
                // Check if the clicked element is not the delete button
                if (event.target !== deleteMonthBtn) {
                    renderExpensesForMonth(month.id);
                }
            });
            monthList.appendChild(li);
        });

        setupDeleteMonthButtons(); // Set up delete buttons after rendering all months
    }).catch(error => {
        monthList.innerHTML = '<li>No months available.</li>'; // Provide feedback on the UI
    });
}


// add month modal
export function showAddMonthModal() {
    const sidebar = document.getElementById("sidebar");
    const addMonthModal = document.createElement('div');
    addMonthModal.id = "addMonthModal";
    addMonthModal.className = "modal";

    addMonthModal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <form id="addMonthForm">
                <label for="year">Year:</label>
                <input type="text" id="year" name="year"><br>
                <label for="month">Month:</label>
                <input type="text" id="month" name="month"><br>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;
    sidebar.appendChild(addMonthModal);
    addMonthModal.style.display = 'block';

    addMonthModal.querySelector('.close').addEventListener('click', () => {
        sidebar.removeChild(addMonthModal);
    });
    const form = addMonthModal.querySelector("#addMonthForm");
    return { form, sidebar, addMonthModal}; // Return both as an object
}



function renderExpensesForMonth(monthId) {
    fetchExpensesByMonth(monthId).then(expenses => {
        const content = document.getElementById('content');
        content.innerHTML = ''; // Clear previous content
        createExpenseTable(monthId,content, expenses);
        createAddExpenseButton(content, monthId);
        createAddCategoryButton(content);
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

        
        

        const expenseData = {
            itemName: form.itemName.value,
            description: form.description.value,
            price: parseFloat(form.price.value),
            category :{
                name : form.category.value
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

function createAddCategoryButton(content) {
    const addCategoryBtn = document.createElement('button');
    addCategoryBtn.id = 'addCategoryBtn';
    addCategoryBtn.textContent = 'Categories';
    addCategoryBtn.addEventListener('click', () => {
        showCategoryModal();
    });
    content.appendChild(addCategoryBtn);
}

function showCategoryModal() {
    const modal = document.createElement('div');
    modal.id = 'categoryModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <form id="categoryForm">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name"><br>
                <button type="submit">Add Category</button>
                
            </form>
        </div>
    `;
    document.body.appendChild(modal); // Append modal to body to cover entire screen
    modal.style.display = 'block';

    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
addCategoryFormSubmission(modal);
}

function createExpenseTable(monthId, content, expenses) {
    if (expenses.length >= 0) {
        const table = document.createElement('table');
        table.innerHTML = `<tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th></th>
        </tr>`;
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.itemName}</td>
                <td>${expense.price}</td>
                <td>${expense.description}</td>
                <td>${expense.category ? expense.category.name : ''}</td>
                <td>${expense.date}</td>
                <td><button class="deleteBtn" data-expense-id="${expense.id}">X</button></td>
            `;
            table.appendChild(row);
        });
        content.appendChild(table);
        setupDeleteButtons(monthId);
    } else {
        content.textContent = 'No expenses available for this month.';
    }

    async function deleteExpense(monthId,id) {
        try {
            console.log(id);
            await apiDeleteExpense(id); // Destructure to get status and data
            renderExpensesForMonth(monthId);
        } catch (error) {
            // This will catch network errors and other fetch-related issues
            console.error("Error deleting expense:", error);
        }
    }
    
    // Function to add event listeners to all delete expense buttons
function setupDeleteButtons(monthId) {
    const deleteButtons = document.querySelectorAll('.deleteBtn'); // Select all delete buttons
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expenseId = this.getAttribute('data-expense-id'); // Get the expense ID from data attribute
            deleteExpense(monthId,expenseId); // Call deleteExpense function with the correct ID
        });
    });
}


}
