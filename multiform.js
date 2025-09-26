// * Get DOM Elements

// * Steps
const steps = document.querySelectorAll('.step-number');

// * Step 1: Personal Info Form
const personalInfoForm = document.querySelector('.personal-info-form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const phoneField = document.querySelector('#phone');
const nextButton = document.querySelector('.next-button');



nextButton.addEventListener('click', () => {
    validateName();
    validateEmail();
    validatePhoneNo();
    //* Hide Step 1
    // personalInfoForm.classList.add('hidden');
    
    // * Show Step 2
    // steps[0].classList.remove('active');
    // steps[1].classList.add('active');
    
    // * Move to Step 2
    // personalInfoForm.submit();
});



//* Validate Form Input Fields

//! Validate Name Input Field
function validateName() {
    if (nameField.value === '') {
        nameField.style.border = '1px solid var(--bright-red)';
        nameField.classList.add('error-vibrate');
        setTimeout(() => {
            nameField.classList.remove('error-vibrate');
        }, 2000);
    }
    else {
        nameField.style.border = '1px solid var(--transparent-purple)';
    }
}


//! Validate Email Input Field
function validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailField.value === '' || !emailRegex.test(emailField.value)) {
        emailField.style.border = '1px solid var(--bright-red)';
        emailField.classList.add('error-vibrate');
        setTimeout(() => {
            emailField.classList.remove('error-vibrate');
        }, 2000);
    }
    else {
        emailField.style.border = '1px solid var(--transparent-purple)';
    }
}


//! Validate Phone Input Field
function validatePhoneNo() {
    if (phoneField.value === '') {
        phoneField.style.border = '1px solid var(--bright-red)';
        phoneField.classList.add('error-vibrate');
        setTimeout(() => {
            phoneField.classList.remove('error-vibrate');
        }, 2000);
    }
    else {
        phoneField.style.border = '1px solid var(--transparent-purple)';
    }
}