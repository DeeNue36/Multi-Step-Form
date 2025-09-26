// * Get DOM Elements

// * Steps
const steps = document.querySelectorAll('.step-number');

// * Step 1: Personal Info Form
const personalInfoForm = document.querySelector('.personal-info-form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const phoneField = document.querySelector('#phone');
const nextButton = document.querySelector('.next-button');


//* Validate Form Input Fields

function validateName() {
    if (nameField.value === '') {
        nameField.classList.add('error-mode');
        nameField.classList.add('error-vibrate');
        setTimeout(() => {
            nameField.classList.remove('error-vibrate');
        }, 2000);
    }
    else {
        nameField.classList.remove('error-mode');
    }
}

nextButton.addEventListener('click', () => {
    validateName();
    //* Hide Step 1
    // personalInfoForm.classList.add('hidden');

    // * Show Step 2
    // steps[0].classList.remove('active');
    // steps[1].classList.add('active');

    // * Move to Step 2
    // personalInfoForm.submit();
});