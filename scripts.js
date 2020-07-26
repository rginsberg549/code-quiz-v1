//Question List
var dict = {
    "q1" : {
        "question" : "This is question # 1",
        "options" : ["Dinasaur","Giuraffe", "alligatoer", "dogggy"],
        "answer" : "Dinasaur"
    },
    "q2" : {
        "question" : "question text",
        "options" : [1,2,3,4],
        "answer" : "answer"
    }
}

//Initialize Variables

var questionIndex = 0;
var answerIndex = 0;

var totalSeconds = 5;
var secondsElapsed = 0;

var interval

//Get references to variables
var start = document.getElementById("start");

var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var questionText = document.getElementById("question-text");
var optionList = document.getElementById("options");

function getQuestion() {
    var temp = Object.keys(dict)[questionIndex];
    var questionText = dict[temp].question;
    return questionText;
}

function getOptions() {
    var temp = Object.keys(dict)[questionIndex];
    questionOptions = dict[temp].options;
    return options;
    }


// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
    // setTime();
    // renderTime();

    // We only want to start the timer if totalSeconds is > 0
    if (totalSeconds > 0) {
        /* The "interval" variable here using "setInterval()" begins the recurring increment of the
           secondsElapsed variable which is used to check if the time is up */
        interval = setInterval(function() {
            secondsElapsed++;

            // So renderTime() is called here once every second.
            renderTime();
        }, 1000);
    } else {
    }
}

function renderTime() {
    // When renderTime is called it sets the textContent for the timer html...
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();

    questionText.textContent = getQuestion();
    optionList.textContent = getOptions();

    // ..and then checks to see if the time has run out
    if (secondsElapsed >= totalSeconds) {
        if (status === "Working") {
            alert("Playing");
        } else {
        }

        stopTimer();
    }
}

function getFormattedMinutes() {
    //
    var secondsLeft = totalSeconds - secondsElapsed;

    var minutesLeft = Math.floor(secondsLeft / 60);

    var formattedMinutes;

    if (minutesLeft < 10) {
        formattedMinutes = "0" + minutesLeft;
    } else {
        formattedMinutes = minutesLeft;
    }

    return formattedMinutes;
}

function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;

    var formattedSeconds;

    if (secondsLeft < 10) {
        formattedSeconds = "0" + secondsLeft;
    } else {
        formattedSeconds = secondsLeft;
    }

    return formattedSeconds;
}

/* This function stops the interval and also resets secondsElapsed
   and calls "setTime()" which effectively reset the timer
   to the input selections workMinutesInput.value and restMinutesInput.value */
   function stopTimer() {
    secondsElapsed = 0;
    setTime();
    renderTime();
}

/* This function retrieves the values from the html input elements; Sort of
   getting run in the background, it sets the totalSeconds variable which
   is used in getFormattedMinutes/Seconds() and the renderTime() function.
   It essentially resets our timer */
   function setTime() {
    var minutes;

    if (status === "Working") {
        minutes = workMinutesInput.value.trim();
    }

    clearInterval(interval);
    questionText.textContent = "Game Over";
    optionList.textContent = "";

    totalSeconds = 5;
}


start.addEventListener("click", startTimer);