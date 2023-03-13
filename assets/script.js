// Get the current date and time using Moment.js
var currentDate = moment().format('dddd, MMMM Do YYYY');
var currentHour = moment().format('H');

// Display the current date and time on the page
$('#current-date').text(currentDate);

// Loop through each row in the calendar and set the background color based on the time
$('.row').each(function() {
  // Get the hour for this row
  var rowHour = parseInt($(this).find('.hour').text());
  // Set the background color based on the time
  if (rowHour < currentHour) {
    $(this).find('.event-input').addClass('past');
  } else if (rowHour > currentHour) {
    $(this).find('.event-input').addClass('present');
  } else {
    $(this).find('.event-input').addClass('future');
  }
});

// When the save button is clicked, save the event in local storage
$('.save-btn').on('click', function() {
  // Get the hour and event text for this row
  var hour = $(this).siblings('.hour').text();
  var eventText = $(this).siblings('.event-input').val();
  // Save the event in local storage
  localStorage.setItem(hour, eventText);
});

// Load the saved events from local storage and display them on the page
$('.event-input').each(function() {
  // Get the hour for this row
  var hour = $(this).siblings('.hour').text();
  // Load the event from local storage
  var eventText = localStorage.getItem(hour);
  if (eventText !== null) {
    $(this).val(eventText);
  }
});
