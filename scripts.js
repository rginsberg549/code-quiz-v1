//Start Quiz
//Start Timer
//Initialize User Score
//Display Question/Answers from List of Q/A Array
//Receive User Selection
//Determine if Answer is Correct/Incorrect - Display to User
//If correct - give user a point
//If incorrect - subtract time from timer
//End Game - If time = 0 or looped through entire list of questions

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

var questionIndex = 0;
var answerIndex = 0;
var quizTime = 3;
var quizTimeRemaining = 0;
var isPlaying = false;
var score = 0;

var start = document.getElementById("start");
var timeLeft = document.getElementById("timer");
var questionText = document.getElementById("question-text");
var optionList = document.getElementById("options");



function startTimer() {
    isPlaying = true;
    start.setAttribute("class", "hide-start");
    var interval = setInterval(function () {
        quizTimeRemaining = quizTime--;
        timeLeft.textContent = quizTimeRemaining;
        if (quizTimeRemaining == 0) {
            stopTimer(interval);
            isPlaying = false;
            console.log(isPlaying);
        };
    }, 1000);
}

function stopTimer(interval) {
    clearInterval(interval);

}

function playGame() {
    var isPlaying = true;
    startTimer();
    var numQuestions = Object.keys(dict).length

    while (isPlaying) {
        var totalQuestions = Object.keys(dict).length
        var questionIndex = 0

        getQuestion();
        getOptions();
        
    }
}


function getQuestion() {
    questionText.textContent = "";
    var temp = Object.keys(dict)[questionIndex];
    questionText.textContent = dict[temp].question;
}

function getOptions() {
    var temp = Object.keys(dict)[questionIndex];
    options = dict[temp].options;
    
    for (let index = 0; index < options.length; index++) {
        var btnElement = document.createElement("button");
        btnElement.setAttribute("type", "button" );
        btnElement.setAttribute("class", "btn btn-warning");
        btnElement.setAttribute("value", options[index]);
        btnElement.textContent = options[index];
        optionList.append(btnElement);
        }

}

function validateOption(event) {
    var temp = Object.keys(dict)[questionIndex];
    var correctAnswer = dict[temp].answer;
    
    var userChoice = event.target.value;

    if (userChoice != correctAnswer) {
        console.log(questionIndex++)

    } else {
        score ++
        console.log(questionIndex++);
    }

}

start.addEventListener("click", playGame);
options.addEventListener("click", validateOption);





