
//client side validation for todolist
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todoForm');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const date = document.getElementById('date');
  
    form.addEventListener('submit', function(event) {
      // Clear previous error messages
      clearErrors();
  
      // Validate inputs
      let isValid = true;
      if (title.value.trim() === '') {
        showError('title', 'Title is required.');
        isValid = false;
      }
      if (description.value.trim() === '') {
        showError('description', 'Description is required.');
        isValid = false;
      }
      if (date.value.trim() === '') {
        showError('date', 'Date is required.');
        isValid = false;
      }
  
      // Prevent form submission if validation fails
      if (!isValid) {
        event.preventDefault();
      }
    });
  
    function showError(inputId, message) {
      const inputElement = document.getElementById(inputId);
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.innerText = message;
      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
      inputElement.classList.add('is-invalid');
    }
  
    function clearErrors() {
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(function(error) {
        error.remove();
      });
      const invalidInputs = document.querySelectorAll('.is-invalid');
      invalidInputs.forEach(function(input) {
        input.classList.remove('is-invalid');
      });
    }
  });

  function todoForm1 (){
    let homebtns=document.querySelector(".home-btns");
    let todoform=document.querySelector(".fill-todolist");
    homebtns.style.display="none";
    todoform.style.display="block";
}
function homePagebtn(){
    let homebtns=document.querySelector(".home-btns");
    let todoform=document.querySelector(".fill-todolist");
    homebtns.style.display="flex";
    todoform.style.display="none";

}

  