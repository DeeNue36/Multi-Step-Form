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
        errorMessage[0].innerText = 'This field is required';
        nameField.classList.add('error');
        nameField.classList.add('error-vibrate');
        setTimeout(() => {
            nameField.classList.remove('error-vibrate');
        }, 2000);
    }
    else {
        nameField.classList.remove('error');
    }

    return fullNameRegex.test(nameField.value); 
    //? Returns true or false if the name provided is valid or not
}


//! Validate Email Input Field
function validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailField.value === '' || !emailRegex.test(emailField.value)) {
        errorMessage[1].innerText = 'This field is required';
        emailField.classList.add('error');
        emailField.classList.add('error-vibrate');
        setTimeout(() => {
            emailField.classList.remove('error-vibrate');
        }, 2000);
    }
    else {
        emailField.classList.remove('error');
    }

    return emailRegex.test(emailField.value); 
    //? Returns true or false if the email provided is valid or not
}


//! Validate Phone Input Field
function validatePhoneNo() {
    const phoneNoRegex = /^\+?\d{1,3} ?\d{3} ?\d{3} ?\d{3,4}$/;
    // const phoneNoRegex = /^\+?\d{1,3} ?\d{3} ?\d{3} ?\d{3,4}$|^\d{3} ?\d{3} ?\d{4}$/; //? Alternate Regex

    if (phoneField.value === '' || !phoneNoRegex.test(phoneField.value)) {
        errorMessage[2].innerText = 'This field is required';
        phoneField.classList.add('error');
        phoneField.classList.add('error-vibrate');
        setTimeout(() => {
            phoneField.classList.remove('error-vibrate');
        }, 2000);
    }
    else {
        phoneField.classList.remove('error');
    }

    return phoneNoRegex.test(phoneField.value); 
    //? Returns true or false if the phone number provided is valid or not
}


//! Display Error Messages in Real Time

// * Name Field Error Message
nameField.addEventListener('input', () => {
    //? If the name field is invalid (i.e validateName returns false), Display error message
    if (!validateName()) { 
        errorMessage[0].innerText = 'Please enter your full name';
    }
    else {
        errorMessage[0].innerText = '';
    }

    nameField.classList.remove('error-vibrate'); 
    //? Removes the error-vibrate animation class from having any effect on the name field while the user is typing
});


// * Email Field Error Message
emailField.addEventListener('input', () => {
    // ? If the email field is invalid (i.e validateEmail returns false), Display error message
    if (!validateEmail()) {
        errorMessage[1].innerText = 'Please enter a valid email address';
    }
    else {
        errorMessage[1].innerText = '';
    }

    emailField.classList.remove('error-vibrate'); 
    //? Removes the error-vibrate animation class from having any effect on the email field while the user is typing
});


// * Phone Field Error Message
phoneField.addEventListener('input', () => {
    // ? If the phone field is invalid (i.e validatePhoneNo returns false), Display error message
    if (!validatePhoneNo()) {
        errorMessage[2].innerText = 'Please enter your phone number';
    }
    else {
        errorMessage[2].innerText = '';
    }

    phoneField.classList.remove('error-vibrate'); 
    //? Removes the error-vibrate animation class from having any effect on the phone field while the user is typing
});