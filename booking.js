/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

let cost_per_day = 35; 
let total_cost = 0;

var calculatedCostElement = document.getElementById('calculated-cost');
var clear_button = document.getElementById('clear-button'); 
var half_day_button = document.getElementById('half');
var full_day_button = document.getElementById('full');

// Get all day buttons
var monday_button = document.getElementById('monday');
var tuesday_button = document.getElementById('tuesday');
var wednesday_button = document.getElementById('wednesday');
var thursday_button = document.getElementById('thursday');
var friday_button = document.getElementById('friday');

// Initialize days selected for each day
var days_selected = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0
};

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

function handleDayButtonClick(day) {
    return function() {
        var button = document.getElementById(day);
        if (!button.classList.contains('clicked')) {
            button.classList.add('clicked');
            days_selected[day]++;
        } else {
            button.classList.remove('clicked');
            days_selected[day]--;
        }
        calculateTotalCost();
    };
}

// Add event listeners to each day button
monday_button.addEventListener('click', handleDayButtonClick('monday'));
tuesday_button.addEventListener('click', handleDayButtonClick('tuesday'));
wednesday_button.addEventListener('click', handleDayButtonClick('wednesday'));
thursday_button.addEventListener('click', handleDayButtonClick('thursday'));
friday_button.addEventListener('click', handleDayButtonClick('friday'));

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

clear_button.addEventListener('click', function() {
    [monday_button, tuesday_button, wednesday_button, thursday_button, friday_button].forEach(function(button) {
        button.classList.remove('clicked');
        days_selected[button.id] = 0; // Reset days_selected for each day
    });
    total_cost = 0; // Reset total cost to 0
    calculateTotalCost();
});


/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

half_day_button.addEventListener('click', function() {
    cost_per_day = 20;
    half_day_button.classList.add('clicked');
    full_day_button.classList.remove('clicked');
    calculateTotalCost();
});


// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

full_day_button.addEventListener('click', function() {
    cost_per_day = 35;
    full_day_button.classList.add('clicked');
    half_day_button.classList.remove('clicked');
    calculateTotalCost();
});


/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateTotalCost() {
    let totaldays_selected = 0;
    for (var day in days_selected) {
        if (days_selected.hasOwnProperty(day)) {
            totaldays_selected += days_selected[day];
        }
    }
    total_cost = totaldays_selected * cost_per_day;
    calculatedCostElement.innerHTML = total_cost; // Assuming calculatedCostElement is your HTML element
}