// events.js
import { showAddMonthModal,renderMonths} from '/js/ui/render.js';
import { createMonth, deleteMonth } from '/js/api/month.js';
import { createCategory,deleteCategory } from '/js/api/category.js';


export async function setupDeleteMonthButtons() {
    const deleteButtons = document.querySelectorAll('.deleteMonthBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function(event) {
            event.stopPropagation(); // Prevent click propagation
            const monthId = this.getAttribute('data-month-id');
            const result = await deleteMonth(monthId);
            if (result.success) {
                console.log('Month deleted:', result.message);
                renderMonths(); // Re-render the list to reflect the deletion
            } else {
                console.error('Failed to delete month:', result.message);
            }
        });
    });
}




export function addMonthBtnEvent() {
    const addMonthBtn = document.getElementById("addMonthBtn");

    addMonthBtn.addEventListener("click", () => {
        const {form, sidebar,addMonthModal} = showAddMonthModal(); // destructure.

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log("Form submitted");
        
            
            const monthData = {
                year : form.year.value,
                month : form.month.value
            }
            console.log(monthData)

            try {
                await createMonth(monthData);
                console.log('Month Added:');
                sidebar.removeChild(addMonthModal); // Remove modal after submission
                renderMonths();
                
            } catch (error) {
                console.error('Failed to add month:', error);
                // TODO show an error message within the modal
            }

        });
    });
}

export function addCategoryFormSubmission(modal) {
    const form = modal.querySelector('#categoryForm');
    
    form.addEventListener('submit', async (event) =>{
        event.preventDefault(); //Prevent the default
    
        const categoryData = {
            name: form.name.value
        }
        console.log(JSON.stringify(categoryData));
    
        const result = await createCategory(categoryData);
        if(result.success){
            console.log('Category created', result.message)
            document.body.removeChild(modal)
        }
        else {
            console.error('Error:', result.message);
        }
    
    })
    }
    
    export function setupCategoryDeleteButtons() {
        console.log("inde i setup")
        const categoryDeleteButtons = document.querySelectorAll('.categoryDeleteBtn');
        console.log(categoryDeleteButtons)
        categoryDeleteButtons.forEach(button => {
            button.addEventListener('click', async () => {
                console.log("jeg er clicked")
                const categoryId = button.getAttribute('data-category-id');
                try {
                    const result = await deleteCategory(categoryId);
                    if (result.success) {
                        alert(result.message);
                        button.closest('tr').remove(); // Remove row from table
                    } else {
                        alert(`Error: ${result.message}`);
                    }
                } catch (error) {
                    console.error('Error deleting category:', error);
                    alert('An unexpected error occurred. Please try again.');
                }
            });
        });
    
    }
