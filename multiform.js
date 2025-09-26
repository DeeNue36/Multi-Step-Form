// * Get DOM Elements

// * Steps
const steps = document.querySelectorAll('.step-number');

// * Step 1: Personal Info Form
const personalInfoForm = document.querySelector('.personal-info-form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const phoneField = document.querySelector('#phone');
const nextButton = document.querySelector('.next-button');

//* Error Messages
const errorMessage = document.querySelectorAll('.error-message');

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
    const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if (nameField.value === '' || !fullNameRegex.test(nameField.value)) {
        nameField.style.border = '1px solid var(--bright-red)';
        nameField.classList.add('error-vibrate');
        setTimeout(() => {
            nameField.classList.remove('error-vibrate');
        }, 2000);
    }
    else {
        nameField.style.border = '1px solid var(--transparent-purple)';
    }

    return fullNameRegex.test(nameField.value); // Returns true or false if the name provided is valid or not
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

    return emailRegex.test(emailField.value); // Returns true or false if the email provided is valid or not
}


//! Validate Phone Input Field
function validatePhoneNo() {
    // const phoneNoRegex = /^\+?\d{1,3} ?\d{3} ?\d{3} ?\d{3,4}$/;
    const phoneNoRegex = /^\+?\d{1,3} ?\d{3} ?\d{3} ?\d{3,4}$|^\d{3} ?\d{3} ?\d{4}$/;

    if (phoneField.value === '' || !phoneNoRegex.test(phoneField.value)) {
        phoneField.style.border = '1px solid var(--bright-red)';
        phoneField.classList.add('error-vibrate');
        setTimeout(() => {
            phoneField.classList.remove('error-vibrate');
        }, 2000);
    }
    else {
        phoneField.style.border = '1px solid var(--transparent-purple)';
    }

    return phoneNoRegex.test(phoneField.value); // Returns true or false if the phone number provided is valid or not
}


//! Display Error Messages

// * Name Field Error Message
nameField.addEventListener('input', () => {
    if (!validateName()) {
        errorMessage[0].innerText = 'Please enter your full name';
    }
    else {
        errorMessage[0].innerText = '';
    }
});


// * Email Field Error Message
emailField.addEventListener('input', () => {
    if (!validateEmail()) {
        errorMessage[1].innerText = 'Please enter a valid email address';
    }
    else {
        errorMessage[1].innerText = '';
    }
});


// * Phone Field Error Message
phoneField.addEventListener('input', () => {
    if (!validatePhoneNo()) {
        errorMessage[2].innerText = 'Please enter your phone number';
    }
    else {
        errorMessage[2].innerText = '';
    }
});