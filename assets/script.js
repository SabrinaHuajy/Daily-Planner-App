function currentDate() {
    var currentdate = moment().format('dddd' + ', ' + 'MMMM Do');
    $('#currentDay').text(currentdate);
}

var tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};

var saveButton = $('saveBtn');

function handleFormSubmit() {

    var text = $(this).siblings('textarea').val();
    var timeId = $(this).parent().attr('id');
    saveData(timeId, text);

}

function savetasks(locationId, locationData) {
    eventinfo[locationId] = locationData;
    localStorage.setItem("events", JSON.stringify(eventinfo));
}

function loadtasks() {

    var storedEventData = JSON.parse(localStorage.getItem("events"));
    if (storedEventData !== null) {
        eventinfo = storedEventData;
    }
    applytasks();
}

function applytasks() {
    $('div').each(function () {
        var id = $(this);
        var idValue = $(this).attr('id');

        if (idValue !== undefined) {
            if (eventinfo[idValue] !== null) {

                id.children('textarea').val(eventinfo[idValue]);
            }
        }
    }
    );
}

saveButton.on('click', handleFormSubmit);

var refresh = setInterval(function () {
    currentDate();

    removeColor();

    getTime();

    giveColor();

}, 1000);

getTime();

function getTime() {
    var time = moment().format('H');
    return parseInt(time);
}

function giveColor() {
    var time = getTime();

    $('div').each(function () {
        var id = $(this);
        var idValue = parseInt($(this).attr('id'));

        if (idValue < time) {
            id.children('textarea').addClass('past');
        }
        if (idValue === time) {
            id.children('textarea').addClass('present');
        }
        if (idValue > time) {
            id.children('textarea').addClass('future');
        }
    });
}

function removeColor() {
    $('div textarea').each(function () {
        if ($(this).hasClass('past')) {
            $(this).removeClass('past')
        }
        if ($(this).hasClass('present')) {
            $(this).removeClass('present')
        }
        if ($(this).hasClass('future')) {
            $(this).removeClass('future')
        }
    });
}

function init() {
    currentDate();
    loadData();
    giveColor();
}
init();