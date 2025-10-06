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
const toggleContainer = document.querySelector('.toggle-container'); //? Container for range input and custom toggle thumb
const billingRange = document.getElementById('billing-toggle'); //? Input type range element, contains values 0(monthly) or 1(yearly)
const toggleThumb = document.querySelector('.toggle-thumb'); //? Custom toggle thumb
const monthly = document.getElementById('monthly');
const yearly = document.getElementById('yearly');

//* Step 3: Addons Section
const addOnsSection = document.querySelector('.add-ons-section');
const addOns = document.querySelectorAll('.addon-card');
const defaultCheckboxes = document.querySelectorAll('.addon-card-body input[type="checkbox"]');
const customCheckbox = document.querySelectorAll('.custom-checkbox');
const addOnPrices = document.querySelectorAll('.addon-price');
const addOnPricingCycles = document.querySelectorAll('.addon-pricing-cycle');

// * Step 4: Summary Section
const summarySection = document.querySelector('.summary-section');
const summaryCard = document.querySelector('.summary-card');
const changePlanBtn = document.querySelector('.change-plan-btn');
const userPlanSelected = document.querySelector('.user-plan-selected');
const selectedPlanPrice = document.querySelector('.selected-plan-price span');
const totalCost = document.querySelector('.total-cost');
const totalCostValue = document.querySelector('.total-cost-value');
const selectedAddOnContainer = document.querySelector('.selected-addon-and-price-container');

// * Next Step Buttons
const nextButtons = document.querySelectorAll('.next-button');
console.log(nextButtons);

// * Previous Step Buttons
const previousButtons = document.querySelectorAll('.previous-button');
console.log(previousButtons);

//* Error Messages
const errorMessage = document.querySelectorAll('.error-message');



// * Forms array for dynamic navigation
const forms = [personalInfoForm, selectPlanSection, addOnsSection, summarySection]; //? Array of all the form/sections steps
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

//? Tracks and stores the current billing range value, the default value is 0(monthly) as defined in the HTML
let lastRangeValue = billingRange.value; 

//* Dynamic next buttons
nextButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (currentStep === 0) {
            e.preventDefault(); //? Prevents the default(submit) action of the button
            //? Validate form input fields
            validateName();
            validateEmail();
            validatePhoneNo();
            
            //? If any of the fields are not validated i.e left empty(i.e they return true), do not proceed running the rest of the code
            if (!validateName() || !validateEmail() || !validatePhoneNo()) {
                return;
            }
        }
        /*
            ?If the current step is less than the last index of the forms array(i.e forms.length - 1), increase the current step by 1
            ?.length is one number higher than the last/highest index of an array, hence why to get the last index we do forms.length - 1
            ?Then call the showNextStep function with currentStep as an argument which represents the nextStepIndex parameter
            ?Run console.log(forms.length), console.log(forms.length - 1), console.log(forms.indexOf(personalInfoForm)) for better understanding
        */
        if (currentStep < forms.length - 1) {
            //? Only update addon prices when moving from step 2 to step 3 and if billing range value changes
            //? i.e if "billingRange.value" does not match the value stored in "lastRangeValue"
            //? billingRange.value is dynamic and updates every time the range input is clicked
            if (currentStep === 1 && billingRange.value !== lastRangeValue) {
                updateAddOnPrices(); 
                lastRangeValue = billingRange.value; //? Update the last range value
            }
            currentStep++;
            showNextStep(currentStep);

            //? Call displaySummary when reaching the summary step (index 3)
            if (currentStep === 3) {
                displaySummary();
            }
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

    //? Returns true or false if the name provided is valid or not
    return fullNameRegex.test(nameField.value); 
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

    //? Returns true or false if the email provided is valid or not
    return emailRegex.test(emailField.value); 
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

    //? Returns true or false if the phone number provided is valid or not
    return phoneNoRegex.test(phoneField.value); 
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

    //? Removes the error-vibrate animation class from having any effect on the name field while the user is typing
    nameField.classList.remove('error-vibrate'); 
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

    //? Removes the error-vibrate animation class from having any effect on the email field while the user is typing
    emailField.classList.remove('error-vibrate'); 
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

    //? Removes the error-vibrate animation class from having any effect on the phone field while the user is typing
    phoneField.classList.remove('error-vibrate'); 
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

// * Clicking the Range Input to toggle switching
billingRange.addEventListener('input', () => {
    if (billingRange.value === '1') {
        yearly.checked = true;
        toggleContainer.classList.add('active');
        bounceThumb();
        updatePlanPrices();
    } 
    else {
        monthly.checked = true;
        toggleContainer.classList.remove('active');
        bounceThumb();
        updatePlanPrices();
    }
});

// * Clicking the "Monthly" and "Yearly" Labels to toggle switching
monthly.addEventListener('change', () => {
    billingRange.value = '0';
    toggleContainer.classList.remove('active');
    bounceThumb();
    updatePlanPrices();
});

yearly.addEventListener('change', () => {
    billingRange.value = '1';
    toggleContainer.classList.add('active');
    bounceThumb();
    updatePlanPrices();
});

function bounceThumb() {
    toggleThumb.classList.add('clicked');
    setTimeout(() => {
        toggleThumb.classList.remove('clicked');
    }, 150);
}

function updatePlanPrices() {
    planPrices.forEach((planPrice) => {    //? Using forEach to loop through the planPrices array and update the prices
        const pricesWithoutDollarSign = planPrice.innerHTML.replace('$', ''); //? Removing the '$' from the price
        
        if (billingRange.value === '1') {
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
    // if (billingRange.value === '1') {
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
    const checkbox = defaultCheckboxes[index];  //? Use the index to access the corresponding checkbox

    //? Toggle active class and checkbox checked state on card click
    addOn.addEventListener('click', () => {
        const isActive = addOn.classList.toggle('active');
        checkbox.checked = isActive; 
        //? isActive returns true if the active class is present and false vice versa
        //? .check is a boolean value the input type checkbox has by default, it takes the isActive value and checks or unchecks the checkbox  
    });

    //? Toggle active class on checkbox change (e.g. keyboard interaction)
    checkbox.addEventListener('change', () => {
        addOn.classList.toggle('active', checkbox.checked);
    });
});

//* Checking if monthly or yearly billing is selected and updating the prices accordingly in step 3
function updateAddOnPrices() {
    addOnPrices.forEach((addOnPrice) => {
        const pricesWithoutSymbols = addOnPrice.innerHTML.replace(/[+$]/g, '');

        if (billingRange.value === '1') {
            addOnPrice.innerHTML = '+$' + parseInt(pricesWithoutSymbols * 10);

            //? Updating the pricing cycles for yearly billing
            addOnPricingCycles.forEach((addOnCycle) => {
                addOnCycle.innerHTML = '/yr';
            });
        } 
        else {
            addOnPrice.innerHTML = '+$' + parseInt(pricesWithoutSymbols / 10);

            //? Updating the pricing cycles for yearly billing
            addOnPricingCycles.forEach((addOnCycle) => {
                addOnCycle.innerHTML = '/mo';
            });
        }
    });
}



// * STEP 4: Summary Section

//* Dynamically Create and Populate the Summary Section
function displaySummary() {
    let totalPrice = 0;
    let compactBillingCycle = billingRange.value === '1' ? '/yr' : '/mo';
    let planBillingCycle = billingRange.value === '1' ? '(Yearly)' : '(Monthly)';
    let totalPerBillingCycle = billingRange.value === '1' ? 'year' : 'month';

    //? Get the plan the user has selected
    plans.forEach((selectedPlan) => {
        if (selectedPlan.classList.contains('active')) {
            //? Get and display the chosen/selected plan name
            const chosenPlanName = selectedPlan.querySelector('.plan-card-header').textContent;
            userPlanSelected.textContent = chosenPlanName + planBillingCycle;

            //? Get and display the chosen plan's price and then convert to a pure number for calculation
            const chosenPlanPrice = selectedPlan.querySelector('.price').textContent;
            selectedPlanPrice.textContent = chosenPlanPrice + compactBillingCycle;

            //? Extract numeric value from price string (e.g. "$10" -> 10)
            const planPriceWithoutSymbol = parseInt(chosenPlanPrice.replace(/[^0-9]/g, ''));
            totalPrice += planPriceWithoutSymbol; //? Adds and then saves the extracted price to variable totalPrice
        }
    });

    //? Clear previous add-ons summary if any
    selectedAddOnContainer.innerHTML = '';

    //? Get add-ons that are checked by the user
    addOns.forEach((selectedAddOn, index) => {
        const checkbox = defaultCheckboxes[index]; //? Use the index to access the corresponding checkbox

        if (checkbox.checked) {
            const chosenAddOn = selectedAddOn.querySelector('.addon-card-header').textContent;
            const chosenAddOnPrice = selectedAddOn.querySelector('.addon-price').textContent;
            const addOnPriceWithoutSymbol = parseInt(chosenAddOnPrice.replace(/[^0-9]/g, ''));

            const selectedAddOns = `
                <div class="selected-addon-and-price">
                    <span class="selected-addon">${chosenAddOn}</span>
                    <span class="selected-addon-price">${chosenAddOnPrice + compactBillingCycle}</span>
                </div>
            `;
            selectedAddOnContainer.innerHTML += selectedAddOns;

            //? Adds and then saves the extracted price to variable totalPrice
            totalPrice += addOnPriceWithoutSymbol;

            // ! OR this:
            //? Create elements for add-on name and price
            // const addOnDiv = document.createElement('div');
            // addOnDiv.classList.add('selected-addon-and-price');

            // const addOnNameSpan = document.createElement('span');
            // addOnNameSpan.classList.add('selected-addon');
            // addOnNameSpan.textContent = chosenAddOn;

            // const addOnPriceSpan = document.createElement('span');
            // addOnPriceSpan.classList.add('selected-addon-price');
            // addOnPriceSpan.textContent = chosenAddOnPrice;

            // addOnDiv.appendChild(addOnNameSpan);
            // addOnDiv.appendChild(addOnPriceSpan);

            // selectedAddOnContainer.appendChild(addOnDiv);
        }
    });

    //? Display the total per billing cycle
    //? Ternary/conditional operator to display either 'year' or 'month' based on the value of billingRange
    //? "year" is the expression if the condition is true and "month" if it is false
    totalCost.textContent = 'Total (per ' + totalPerBillingCycle + ')';

    //? Display the total price
    if (billingRange.value === '0') { //monthly billing price display
        totalCostValue.textContent = '+$' + totalPrice + compactBillingCycle;
    } 
    else { //yearly billing price display
        totalCostValue.textContent = '$' + totalPrice + compactBillingCycle;
    }
}



// * Change Plan Button

//? Navigates back to step two (plan selection) by updating currentStep to 1.
function handleChangePlanClick() {
    //? Set current step to 1 (select plan section)
    currentStep = 1;
    
    //? Use the centralized function to continue to the next step once the user has selected a plan
    showNextStep(currentStep);
}

// Attach the event listener
changePlanBtn.addEventListener('click', handleChangePlanClick);