// render.js
import { fetchMonths, fetchExpensesByMonth } from '/js/api/month.js';
import { createExpense, apiDeleteExpense } from '/js/api/expense.js';
import { fetchCategories } from '/js/api/category.js';
import { setupDeleteMonthButtons, addCategoryFormSubmission,setupCategoryDeleteButtons} from '/js/ui/events.js';

export function renderMonths() {
    fetchMonths().then(months => {
    
        const monthList = document.getElementById('monthList');
        monthList.innerHTML = ''; // Clear the list before rendering

        months.forEach(month => {
            const li = document.createElement('li');
            li.textContent = `${month.year} - ${month.month}`;
            li.id = `month-${month.id}`;
            li.className = 'month-item'; // Base class for all months

            // Create delete button for each month
            const deleteMonthBtn = document.createElement("button");
            deleteMonthBtn.textContent = "X";
            deleteMonthBtn.className = "deleteMonthBtn";
            deleteMonthBtn.setAttribute('data-month-id', month.id); // Store month ID in data attribute

            li.appendChild(deleteMonthBtn);
            li.addEventListener('click', (event) => {
                if (event.target !== deleteMonthBtn) {
                    document.querySelectorAll('.month-item').forEach(item => {
                        item.classList.remove('selected-month'); // Remove highlight from all months
                    });
                    li.classList.add('selected-month'); // Highlight the clicked month
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
        createCategoryButton(content);
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
    fetchCategories().then(response => {
        const select = document.getElementById('category');
        select.innerHTML = ''; 
        // Access the 'categories' property of the response
        if (response.success && Array.isArray(response.categories)) {
            response.categories.forEach(category => {
                let option = new Option(category.name);
                select.appendChild(option);
            });
        } else {
            console.error('Categories not found or invalid response format');
        }
    }).catch(error => {
        console.error('Error loading categories:', error);
    });
}


function createCategoryButton(content) {
    const categoryBtn = document.createElement('button');
    categoryBtn.id = 'categoryBtn';
    categoryBtn.textContent = 'Categories';
    categoryBtn.addEventListener('click', () => {
        showCategoryModal();
    });
    content.appendChild(categoryBtn);
}

async function showCategoryModal() {
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
    document.body.appendChild(modal);

    // Await the table creation and append it to modal content
    const table = await populateCategoryTable();
    modal.querySelector('.modal-content').appendChild(table);
    modal.style.display = 'block';
    setupCategoryDeleteButtons();

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
                <td>${new Date(expense.date).getDate()}</td>
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

async function populateCategoryTable() {
    const categoryTable = document.createElement('table');
    categoryTable.innerHTML = `
        <tr>
            <th>Category Name</th>
            <th>Action</th>
        </tr>`;

    try {
        const result = await fetchCategories();
        if (result.success) {
            if (result.categories.length > 0) {
                result.categories.forEach(category => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${category.name}</td>
                        <td><button class="categoryDeleteBtn" data-category-id="${category.id}">Delete</button></td>
                    `;
                    categoryTable.appendChild(row);
                });
            } else if(result.categories.length === 0) {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = `<td colspan="2">No categories available.</td>`;
                categoryTable.appendChild(emptyRow);
            }
        } else {
            const errorRow = document.createElement('tr');
            errorRow.innerHTML = `<td colspan="2">Failed to load categories.</td>`;
            categoryTable.appendChild(errorRow);
        }
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        const errorRow = document.createElement('tr');
        errorRow.innerHTML = `<td colspan="2">Error loading categories.</td>`;
        categoryTable.appendChild(errorRow);
    }
 // Ensure buttons are wired up
    return categoryTable; // Return the table

}

