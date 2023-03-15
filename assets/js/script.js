// Define the quiz questions and answers
const quizQuestions = [
    {
        question: "In which year was the first Batman comic book published?",
        answers: ["1939", "1949", "1959", "1969"],
        correctAnswer: 0
    },
    {
        question: "Which actor played Batman in the 1995 movie 'Batman Forever?'",
        answers: ["Michael Keaton", "George Clooney", "Val Kilmer", "Danny DeVito"],
        correctAnswer: 2
    },
    {
        question: "Who is the villain in 2008 Batman movie 'The Dark Knight'",
        answers: ["The Joker", "The Riddler", "The Penguin", "Superman"],
        correctAnswer: 0
    }
  ];
  
// ELement selectors
var startPage = document.querySelector('#startpage');
var quizContainer = document.querySelector ('#quizContainer');
var questionContainer = document.querySelector ("#questionContainer");
var answerContainer = document.querySelector ("#answerContainer");
var endPage = document.querySelector ("#end");
var timerElement = document.querySelector ("#secondsLeft");
var startButton = document.querySelector("#startQuiz");
var highScoresButton = document.querySelector("#highscores");

// answer correct or not
 var result ;

// footer for result prompt
var footer = document.querySelector("footer")

var answerButtons = document.querySelector(".answers")


var Score
var storedScores =[];
var timer;
var timerCount;
var currentQuestionIndex = 0;

// function to clear page and start quiz
function startGame () {
    startPage.setAttribute ("style", "display:none;");
    highScoresButton.setAttribute("style", "visibility:hidden;");
    // SET TIMER
    timerCount = 30;
    startTimer()
    buildQuiz()
}



function startTimer () {
    // run countdown
    timerInterval = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        // if timer reaches 0, game lost
        if (timerCount === 0) {
            loseGame();
        }
    }, 1000);
}


function buildQuiz () {
    if (currentQuestionIndex < quizQuestions.length) {
         // display quiz container
        quizContainer.setAttribute("style", "display:contents;");

        // get question from array and send to HTML
        var currentQuestion = quizQuestions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;

        //  add answer buttons as buttons
        var numberOfAnswers = currentQuestion.answers.length
        answerContainer.textContent = "";

        // for loop top pull all answers
        for (var i = 0; i < numberOfAnswers; i++) {
            var choice = currentQuestion.answers[i];
        
            // creates buttons
            var answerChoices = document.createElement("button");

            // adds answers text to buttons
            answerChoices.textContent = choice;
            answerChoices.setAttribute("class", "answers");

            // adds index number to element for listening function
            answerChoices.setAttribute("data-index", i);

            answerChoices.addEventListener("click", answerResult);

            // appends buttons to container
            answerContainer.appendChild(answerChoices);
        }
    } else {
        endGame();
    }
}

// run function for 5 second of result
function resultPrompt () {
    if (result) {
        footer.setAttribute("display", "contents");
        footer.innerHTML = "Correct!";
        setTimeout(function() {
            footer.innerHTML = "";
        },4000);
    } else  {
                footer.setAttribute("display", "contents");
        footer.innerHTML = "Wrong!";
        setTimeout(function() {
            footer.innerHTML = "";
        },4000);
    }

}




// check if answer result
function answerResult (event) {
    var chosenAnswer = event.target.dataset.index;
    if (chosenAnswer == quizQuestions[currentQuestionIndex].correctAnswer) {
        result = true;
        console.log(result)
        resultPrompt();


    } else {
        result = false
        timerCount -= 10;
        console.log(result)
        resultPrompt();
    }

    
    
    currentQuestionIndex++;
    buildQuiz()

}

// TODO: endgame, tally up score and ask to be high score list

function endGame () {

    // stop timer and record the timee left
    clearInterval(timerInterval);
    var score = timerCount;
    console.log(score);

    quizContainer.textContent = "All Done!";
    answerContainer.innerHTML = "Your final score is " ;

}

// TODO: lose game, bring back high score and TRY AGAIN button

function loseGame () {
    clearInterval(timerInterval)
    
}

// Listen for start game and run
startButton.addEventListener("click", startGame)

// add event listener for answer click
// answerButtons.addEventListener("click", answerResult(event))


