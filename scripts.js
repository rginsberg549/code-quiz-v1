//Question List
var questions = [
    {
        "question" : "This is question # 1",
        "options" : ["Dinasaur","Giuraffe", "alligatoer", "dogggy"],
        "answer" : "Dinasaur"
    },{
        "question" : "question text",
        "options" : [1,2,3,4],
        "answer" : "answer"
    }
]

//Initialize Variables

var questionIndex = 0;

var totalSeconds = 5;
var secondsElapsed = 0;

var userScore = 0;

var interval

//Get references to variables
var start = document.getElementById("start");

var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var questionText = document.getElementById("question-text");
var optionList = document.getElementById("options");

function getQuestion() {
    var currentQuestion = questions[questionIndex].question;
    return currentQuestion;
}

function getOptions() {
    var currentOptions = questions[questionIndex].options;
    return currentOptions;
    }

function getAnswer() {
    var currentAnswer = questions[questionIndex.answer]
    return currentAnswer;
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
    clearInterval(interval);
    clearCurrentQuestion();
    totalSeconds = 5;
}

var currentIndex = 0;

function startGame() {
    clearCurrentQuestion();
    displayCurrentQuestion();
    startTimer();
}

function displayCurrentQuestion(){
    var question = getQuestion();
    var questionElement = document.createElement("p");
    questionElement.textContent = question;
    questionText.appendChild(questionElement);

    var options = getOptions()
    for (let index = 0; index < options.length; index++) {
        var optionElement = document.createElement("button");
        optionElement.setAttribute("class", "btn btn-info")
        optionElement.textContent = options[index];
        optionList.appendChild(optionElement);
        optionElement.addEventListener("click", checkUserChoice);
        
    }
 }

function checkUserChoice(event) {
    event.preventDefault();
    var userChoice = event.target.textContent;
    var correctAnswer = getAnswer();

    if (userChoice === correctAnswer) {
        questionIndex++;
        if (questionIndex >= questions.length){
            return endGame();
        }
        clearCurrentQuestion();
        displayCurrentQuestion();
    } else {
        questionIndex++;
        if (questionIndex >= questions.length){
            return endGame();
        }
        clearCurrentQuestion();
        displayCurrentQuestion();
        }
}

function clearCurrentQuestion() {
    questionText.textContent = "";
    optionList.textContent = "";
}

function endGame() {
    clearCurrentQuestion();
    clearInterval(interval);
    questionIndex = 0;
    totalSeconds = 5;
    start.textContent = "Replay Quiz";
}




start.addEventListener("click", startGame);