$(document).ready(function () {
    // Display the current day and time
    var currentDate = moment().format('dddd, MMMM Do YYYY');
    $("#currentDay").text(currentDate);

    // Get the current hour in 24-hour format
    var currentHour = moment().hour();

    // Loop through each hour block
    $(".row").each(function () {
        var blockHour = parseInt($(this).attr("id"));

        // Check if we've moved past this time
        if (blockHour < currentHour) {
            $(this).addClass("past");
        }
        // Check if we're currently in this time
        else if (blockHour === currentHour) {
            $(this).addClass("present");
        }
        // Otherwise, this is a future time
        else {
            $(this).addClass("future");
        }
    });

    // Save button click listener
    $(".save-btn").on("click", function () {
        // Get nearby values
        var value = $(this).siblings(".event-input").val();
        var time = $(this).parent().attr("id");

        // Save the value in localStorage as an object
        localStorage.setItem(time, JSON.stringify({ time: time, value: value }));
    });

    // Load saved data from localStorage
    $(".event-input").each(function () {
        var time = $(this).parent().attr("id");
        var savedData = JSON.parse(localStorage.getItem(time));

        if (savedData !== null) {
            $(this).val(savedData.value);
        }
    });
});