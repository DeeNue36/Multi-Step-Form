// * Get DOM Elements

// * Steps
const steps = document.querySelectorAll('.step-number');

// * Step 1: Personal Info Form
const personalInfoForm = document.querySelector('.personal-info-form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const phoneField = document.querySelector('#phone');

// * Step 2: Select Plan Section
const selectPlanSection = document.querySelector('.select-plan-section');
const plans = document.querySelectorAll('.plan-card');
const planPrices = document.querySelectorAll('.price');
const pricingCycles = document.querySelectorAll('.pricing-cycle');
const yearlyDiscountDurations = document.querySelectorAll('.yearly-discount-duration');
const toggleContainer = document.querySelector('.toggle-container');
const billingToggle = document.getElementById('billing-toggle');
const toggleThumb = document.querySelector('.toggle-thumb');
const monthly = document.getElementById('monthly');
const yearly = document.getElementById('yearly');

//* Step 3: Addons Section
const addOnsSection = document.querySelector('.add-ons-section');
const addOns = document.querySelectorAll('.addon-card');
const defaultCheckbox = document.querySelectorAll('.addon-card-body input[type="checkbox"]');
const customCheckbox = document.querySelectorAll('.custom-checkbox');
const addOnPrices = document.querySelectorAll('.addon-price');
const addOnsPricingCycles = document.querySelectorAll('.addon-pricing-cycle');

// * Next Step Buttons
const nextButtons = document.querySelectorAll('.next-button');
console.log(nextButtons);

// * Previous Step Buttons
const previousButtons = document.querySelectorAll('.previous-button');
console.log(previousButtons);

//* Error Messages
const errorMessage = document.querySelectorAll('.error-message');



// * Forms array for dynamic navigation
const forms = [personalInfoForm, selectPlanSection, addOnsSection]; //? Array of all the form/sections steps
let currentStep = 0; //? Variable to keep track of the current step the user is on


// * Function to show the current step the user is on
/* 
    ?nextStepIndex: parameter used to represent the index of the form/section and step number the user is on
    ?Compares with the index of the forms and steps array to display the form step and active class of the step number to the user
*/
function showNextStep(nextStepIndex) {
    //? Remove or add the hidden class to the form step section
    forms.forEach((form, index) => {
        //? If the index of the parameter "form"(the forms array) matches nextStepIndex, display the next form/section
        if (index === nextStepIndex) {
            form.classList.remove('hidden');
        } 
        else {
            form.classList.add('hidden');
        }
    });

    //? Add or remove the active class to the step number
    steps.forEach((step, index) => {
        //? If the index of the parameter "step"(the steps array, i.e const steps) matches nextStepIndex, add the active class to the step number
        if (index === nextStepIndex) {
            step.classList.add('active');
        } 
        else {
            step.classList.remove('active');
        }
    });
}



//* Next & Previous Buttons Navigation

//* Dynamic next buttons
nextButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (currentStep === 0) {
            e.preventDefault(); //? Prevents the default(submit) action of the button
            //? Validate form input fields
            validateName();
            validateEmail();
            validatePhoneNo();
            
            //? If any of the fields are left empty(i.e they return true), do not proceed running the rest of the code
            if (!validateName() || !validateEmail() || !validatePhoneNo()) {
                return;
            }
        }
        /*
            ?If the current step is less than the last index of the forms array(i.e forms.length - 1), increase the current step by 1
            ?.length is one number higher than the last index of an array
            ? Hence why to get the last index of the array we do forms.length - 1
            ?Then call the showNextStep function with currentStep as an argument which represents the nextStepIndex parameter
            ?Run console.log(forms.length), console.log(forms.length - 1), console.log(forms.indexOf(personalInfoForm)) for better understanding
        */
        if (currentStep < forms.length - 1) {
            currentStep++;
            showNextStep(currentStep);
        }
    });
});


//* Dynamic previous buttons
previousButtons.forEach(button => {
    button.addEventListener('click', () => {
        //? If the index of the currentStep is greater than 0, decrease currentStep by 1(i.e go to the previous step)
        if (currentStep > 0) {
            currentStep--;
            showNextStep(currentStep);
        }
    });
});


// * STEP 1: Personal Info Form

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


//* STEP 2: Select Plan Section

// * Plan Cards: Selecting a Plan Card and Adding Active Class
plans.forEach(plan => {
    plan.addEventListener('click', () => {
        plans.forEach(plan => {
            plan.classList.remove('active');
        });
        plan.classList.add('active');
    });
});

// * Billing Options: Monthly and Yearly
billingToggle.addEventListener('input', () => {
    if (billingToggle.value === '1') {
        yearly.checked = true;
        toggleContainer.classList.add('active');
        bounceThumb();
        updatePrices();
    } 
    else {
        monthly.checked = true;
        toggleContainer.classList.remove('active');
        bounceThumb();
        updatePrices();
    }
});

monthly.addEventListener('change', () => {
    billingToggle.value = '0';
    toggleContainer.classList.remove('active');
    bounceThumb();
    updatePrices();
});

yearly.addEventListener('change', () => {
    billingToggle.value = '1';
    toggleContainer.classList.add('active');
    bounceThumb();
    updatePrices();
});

function bounceThumb() {
    toggleThumb.classList.add('clicked');
    setTimeout(() => {
        toggleThumb.classList.remove('clicked');
    }, 150);
}

function updatePrices() {
    planPrices.forEach((planPrice) => {    //? Using forEach to loop through the planPrices array and update the prices
        const pricesWithoutDollarSign = planPrice.innerHTML.replace('$', ''); //? Removing the '$' from the price
        
        if (billingToggle.value === '1') {
            //? Updating the plan prices for yearly billing
            planPrice.innerHTML = '$' + parseInt(pricesWithoutDollarSign * 10);
            
            //? Updating the pricing cycles for yearly billing
            pricingCycles.forEach((cycle) => {
                cycle.innerHTML = '/yr';
            });
            
            //? Displaying the yearly discount durations
            yearlyDiscountDurations.forEach((duration) => {
                duration.classList.remove('hidden');
                duration.innerHTML = '2 months free';
            });
        } 
        else {
            //? Updating the plan prices for monthly billing
            planPrice.innerHTML = '$' + parseInt(pricesWithoutDollarSign / 10);
            
            //? Updating the pricing cycles for monthly billing
            pricingCycles.forEach((cycle) => {
                cycle.innerHTML = '/mo';
            });
            
            //? Hiding the yearly discount durations
            yearlyDiscountDurations.forEach((duration) => {
                duration.classList.add('hidden');
                duration.innerHTML = '';
            });
        }
    });

    //! Populating the Plans Prices, Pricing Cycles and Yearly Discount Durations Sequentially
    // 1. Arcade Plan
    // let arcadePlan = planPrices[0].innerHTML;
    // const arcadePlanWithoutDollarSign = arcadePlan.replace('$', '');
    // if (billingToggle.value === '1') {
    //     console.log(arcadePlanWithoutDollarSign);
    //     planPrices[0].innerHTML = '$' + parseInt(arcadePlanWithoutDollarSign * 10);
    //     pricingCycles[0].innerHTML = '/yr';
    //     yearlyDiscountDurations[0].classList.remove('hidden');
    //     yearlyDiscountDurations[0].innerHTML = '2 months free';
    // } 
    // else {
    //     planPrices[0].innerHTML = '$' + parseInt(arcadePlanWithoutDollarSign / 10);
    //     pricingCycles[0].innerHTML = '/mo';
    //     yearlyDiscountDurations[0].classList.add('hidden');
    //     yearlyDiscountDurations[0].innerHTML = '';
    // }
}


//* STEP 3: Add-ons Section

// * Add-ons Cards: Selecting an Add-on Card, checking the checkbox and Adding Active Class
addOns.forEach((addOn, index) => {
    const checkbox = defaultCheckbox[index];

    // Toggle active class and checkbox checked state on card click
    addOn.addEventListener('click', () => {
        const isActive = addOn.classList.toggle('active');
        checkbox.checked = isActive;
    });

    // Toggle active class on checkbox change (e.g. keyboard interaction)
    checkbox.addEventListener('change', () => {
        addOn.classList.toggle('active', checkbox.checked);
    });
});



