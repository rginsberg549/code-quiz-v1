//Question List
var questions = [
    {
        "question" : "Question #1",
        "options" : ["Option 1", "Option 2", "Option 3", "Option 4"],
        "answer" : "Option 1"
    },{
        "question" : "Question #2",
        "options" : ["Option 1", "Option 2", "Option 3", "Option 4"],
        "answer" : "Option 2"
    },{
        "question" : "Question #3",
        "options" : ["Option 1", "Option 2", "Option 3", "Option 4"],
        "answer" : "Option 3"
    },{
        "question" : "Question #4",
        "options" : ["Option 1", "Option 2", "Option 3", "Option 4"],
        "answer" : "Option 4"
    }
]

//Initialize Variables

var questionIndex = 0;

var totalSeconds = 20;
var secondsElapsed = 0;

var userScore = 0;

var interval;
var timeOut;

//Get references to variables
var start = document.getElementById("start");

var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var questionText = document.getElementById("question-text");
var optionList = document.getElementById("options");
var totalQuestions1 = document.getElementById("total-questions-1");
var totalQuestions2 = document.getElementById("total-questions-2");
var currentQuestionElement = document.getElementById("current-question");
var correctQuestions = document.getElementById("correct");

var saveScoreForm = document.getElementById("save-score");
var saveScoreBtn = document.getElementById("save-score-button");
var msgDiv = document.querySelector("#msg");

var viewScores = document.getElementById("view-scores");
var clearScores = document.getElementById("clear-score-button");

var validation = document.getElementById("validation");

function getQuestion() {
    var currentQuestion = questions[questionIndex].question;
    return currentQuestion;
}

function getOptions() {
    var currentOptions = questions[questionIndex].options;
    return currentOptions;
    }

function getAnswer() {
    var currentAnswer = questions[questionIndex].answer;
    return currentAnswer;
}

function getTotalQuestions() {
    var totalQuestions = questions.length;
    return totalQuestions;
}

function getCurrentQuestion() {
    var currentQuestion = questionIndex + 1;
    currentQuestionElement.textContent = currentQuestion;
    return currentQuestion;
}

function resetUserScore() {
    userScore = 0;
    correctQuestions.textContent = userScore;
}

function correctAnwerMsg() {
    validation.textContent = "Correct";

    timeOut = setTimeout(function(){
        validation.textContent = '';
    }, 1000);
}

function incorrectAnswerMsg() {
    validation.textContent = "Incorrect";
    timeOut = setTimeout(function(){
        validation.textContent = '';
    }, 1000);
}

function clearAnswerMsg() {
    validation.textContent = "";
    clearTimeout(timeOut);
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
        endGame();
    }
}

function renderTime() {
    // When renderTime is called it sets the textContent for the timer html...
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();

    // ..and then checks to see if the time has run out
    if (secondsElapsed >= totalSeconds) {
        stopTimer();
        endGame();
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

function startGame() {
    start.classList.add("hide-start");
    saveScoreForm.classList.add("hide-start");
    saveScoreForm.classList.remove("show-start");

    clearCurrentQuestion();
    resetUserScore();
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
    
    var countQuestions = getTotalQuestions();
    totalQuestions1.textContent = countQuestions;
    totalQuestions2.textContent = countQuestions;

    currentQuestionElement.textContent = getCurrentQuestion();
}

function checkUserChoice(event) {
    event.preventDefault();
    var userChoice = event.target.textContent;
    var correctAnswer = getAnswer();

    if (userChoice === correctAnswer) {
        questionIndex++;
        userScore++;
        correctQuestions.textContent = userScore;
        correctAnwerMsg();
 
        if (questionIndex >= questions.length){
            return endGame();
        }
        clearCurrentQuestion();
        displayCurrentQuestion();

    } else {
        questionIndex++;
        incorrectAnswerMsg();
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

function displayResults() {
    clearTimeout(timeOut);
    validation.textContent = "Your score: " + userScore;
    getUserEmail();
    hideClearScore();
}

function getUserEmail() {
    saveScoreForm.classList.remove("hide-start");
    saveScoreForm.classList.add("show-start");
}

function hideUserEmail() {
    saveScoreForm.classList.remove("show-start");
    saveScoreForm.classList.add("hide-start");
}

function hideClearScore() {
    clearScores.classList.remove("show-start");
    clearScores.classList.add("hide-start");
}

function showClearScore() {
    clearScores.classList.remove("hide-start");
    clearScores.classList.add("show-start");
}

function saveUserScore(event) {
    event.preventDefault();
    clearAnswerMsg();
    
    var email = document.getElementById("user-name").value;

    var user = {
        email: email,
        score: userScore
    }
  
    if (email === "") {
      displayMessage("error", "Email cannot be blank");
    } else {
      localStorage.setItem(email, JSON.stringify(user));
      hideUserEmail();
      questionText.textContent = "Score Has Been Saved. Would you like to play again?";
    }
}

function displayScores() {
    clearCurrentQuestion();
    clearAnswerMsg();
    stopTimer();
    clearInterval(interval);
    clearTimeout(timeOut);
    hideUserEmail();
    showClearScore();
    questionIndex = 0;
    userScore.textContent = 0;
    correctQuestions.textContent = 0;
    currentQuestionElement.textContent = 0;
    questionText.textContent = "High Scores";
    start.classList.remove("hide-start");
    forEachKey();
    
}

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  }

function endGame() {
    clearCurrentQuestion();
    clearAnswerMsg();
    stopTimer();
    questionIndex = 0;
    totalSeconds = 20;
    questionText.textContent = "Game Over";
    clearInterval(interval);
    start.classList.remove("hide-start");
    start.textContent = "Play Again"
    displayResults();
    clearTimeout(timeOut);
}

function forEachKey() {
    var storageKeys = []
    for (var i = 0; i < localStorage.length; i++) {
      storageKeys.push(localStorage.key(i));
    }

    for (let index = 0; index < storageKeys.length; index++) {
        var liElement = document.createElement("li");
        var allUsers = JSON.parse(localStorage.getItem(storageKeys[index]));
        liElement.textContent = allUsers.email + "-" + allUsers.score;
        options.appendChild(liElement); 
    }
    console.log(storageKeys);
  }


start.addEventListener("click", startGame);
saveScoreBtn.addEventListener("click", saveUserScore);
viewScores.addEventListener("click", displayScores);
