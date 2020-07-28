//This array stores the questions and their associated options and the correct answer.
//We are able to easily calculate the number of quesitons, display questions and options
//validate user selection with the answer.
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

//Game starts at 0. Increase by 1 after user chooses an option. 
//Game ends when this value is greater than the length of the question array
var questionIndex = 0; 

//Game starts at 0. Increases by 1 after user chooses correct option.
//We display this in the UI and save it to local storage
var userScore = 0;

//Used to calculate the countdown clock and when to stop the timer
var totalSeconds = 20;
var secondsElapsed = 0;

//Global variables used to set and clear interval and timeOut functions
var interval;
var timeOut;

//Get references to variables

//Buttons
var start = document.getElementById("start");
var saveScoreBtn = document.getElementById("save-score-button");

//Timer
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

//Questions
var questionText = document.getElementById("question-text");

//Question Options
var optionList = document.getElementById("options");

//Display what question user is currently on
var currentQuestionElement = document.getElementById("current-question");

//Display how many questions user has gotten correct
var correctQuestions = document.getElementById("correct");

//Display total number of questions
var totalQuestions1 = document.getElementById("total-questions-1");
var totalQuestions2 = document.getElementById("total-questions-2");

//Used to show/hide the save-score form element
var saveScoreForm = document.getElementById("save-score");

//User validation for save-score and Correct/Incorrect messages
var msgDiv = document.querySelector("#msg");
var validation = document.getElementById("validation");

//Link to trigger click event to display all scores from LocalStorage
var viewScores = document.getElementById("view-scores");

//Not hooked up yet
var clearScores = document.getElementById("clear-score-button");

//Display final score at end of the game to user
var finalScore = document.getElementById("final-score");


//Helper function to get a question from the question array
function getQuestion() {
    var currentQuestion = questions[questionIndex].question;
    return currentQuestion;
}

//Helper function to get a options from the question array
function getOptions() {
    var currentOptions = questions[questionIndex].options;
    return currentOptions;
    }

//Helper function to get answer from the questin array
function getAnswer() {
    var currentAnswer = questions[questionIndex].answer;
    return currentAnswer;
}

//Helper function to get total number of questions
function getTotalQuestions() {
    var totalQuestions = questions.length;
    return totalQuestions;
}

//Helper function to display current question. We add 1 because arrays are indexed at 0 and this
//is weird to display to the user without doing so
function getCurrentQuestion() {
    var currentQuestion = questionIndex + 1;
    currentQuestionElement.textContent = currentQuestion;
    return currentQuestion;
}

//Helper function to reset user score to 0
function resetUserScore() {
    userScore = 0;
    correctQuestions.textContent = userScore;
}

//Helper function to giver user feedback if the option selected is correct and clear it after 1 second
function correctAnwerMsg() {
    validation.textContent = "Correct";

    timeOut = setTimeout(function(){
        validation.textContent = '';
    }, 1000);
}

//Helper function to giver user feedback if the option selected is incorrect and clear it after 1 second
function incorrectAnswerMsg() {
    validation.textContent = "Incorrect";
    timeOut = setTimeout(function(){
        validation.textContent = '';
    }, 1000);
}

//Helper function to clear user feedback
function clearAnswerMsg() {
    validation.textContent = "";
    clearTimeout(timeOut);
}

//Helper function to reset the QuestionIndex back to 0
function resetQuestionIndex() {
    questionIndex = 0;
}

//This begins our countdown and we increment secondsElapsed by 1 and then call renderTime to display
//the new value. This happens every second and we check to make sure time has not ran out.
//If it does, we end the game.
function startTimer() {
    if (totalSeconds > 0) {
        interval = setInterval(function() {
            secondsElapsed++;
            renderTime();
        }, 1000);
    } else {
        endGame();
    }
}

//Used to display the time remaing to the user
function renderTime() {
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();

    if (secondsElapsed >= totalSeconds) {
        stopTimer();
        endGame();
    }
}

//Calculates the minutes remaining
function getFormattedMinutes() {
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

//Calculates the secons remaining
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

//Stops the timer
function stopTimer() {
    secondsElapsed = 0;
    renderTime();
}


//Helper function to show the start button
function showStart() {
    start.classList.add("show-start");
}

//Helper function to hide the start button
function hideStart() {
    start.classList.add("hide-start");
}

//Helper function to show the form that lets the user save their score
function showSaveScoreForm() {
    saveScoreForm.classList.remove("show-start");
}

//Helper function to hide the form that lets the user save their score
function hideSaveScoreForm() {
    saveScoreForm.classList.add("hide-start"); 
}

//Helper function to display the final score to user when the game is over
function showFinalScore() {
    finalScore.textContent = "Your score: " + userScore;
}

//Helper function to clear the final score to user when the game is over
function hideFinalScore() {
    finalScore.textContent = "";
}

//Helper function to display the input field that captures users name
function showNameInput() {
    saveScoreForm.classList.remove("hide-start");
    saveScoreForm.classList.add("show-start");
}

//Helper function to hide the input field that captures users name
function hideNameInput() {
    saveScoreForm.classList.remove("show-start");
    saveScoreForm.classList.add("hide-start");
}

//Helper function that clears the FinalScore
function resetFinalScore() {
    finalScore.textContent = "";
}

//Helper function to clear most elements
function resetAllTextContent() {
    questionText.textContent = "";
    optionList.textContent = "";
    userScore.textContent = 0;
    correctQuestions.textContent = 0;
    currentQuestionElement.textContent = 0;
}

//Helper fucntion to clear current question and options
function clearCurrentQuestion() {
    questionText.textContent = "";
    optionList.textContent = "";
}

//Display current question, creates buttons for each option, addes event listener to each button
//display total number of questions and current question
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

//Validates user choice and displays messages based on validation
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

//Takes in value from input field and stores score to LocalStorage
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
      hideNameInput();
      questionText.textContent = "Score Has Been Saved. Would you like to play again?";
    }
}

//Helper function for displaying messages
function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  }

//Helper function to get all keys from LocalStorage and display them on the View High Scores Page
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
  }

//Main function that starts the game when Start Quiz or Replay Quiz is clicked
function startGame() {
    hideStart();
    hideSaveScoreForm();
    resetFinalScore();
    clearCurrentQuestion();
    resetUserScore();
    displayCurrentQuestion();
    startTimer();
}

//Main function to view High Scores - Clears most text content and gets scores from localStorage
function viewHighScores() {
    clearCurrentQuestion();
    clearAnswerMsg();
    stopTimer();
    clearInterval(interval);
    clearTimeout(timeOut);
    hideNameInput();
    resetQuestionIndex();
    showStart();
    hideFinalScore()
    resetAllTextContent();
    forEachKey(); 

    questionText.textContent = "High Scores";
}

//Main function to end the same, clear intervals, reset variables, update text accordingly
function endGame() {
    clearInterval(interval);
    clearTimeout(timeOut);
    clearCurrentQuestion();
    clearAnswerMsg();
    stopTimer();
    resetQuestionIndex();
    showFinalScore();
    showNameInput();
    showStart();

    totalSeconds = 20;
    questionText.textContent = "Game Over";
    start.textContent = "Play Again"
}

//Event handlers for triggering the game, save the user score to local storage, and viewing
//the high score page
start.addEventListener("click", startGame);
saveScoreBtn.addEventListener("click", saveUserScore);
viewScores.addEventListener("click", viewHighScores);
