import { showAddMonthModal,renderMonths } from '/js/ui/render.js';
import { createMonth } from '/js/api/month.js';

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
