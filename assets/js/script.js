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
var questionContainer = document.querySelector ("#questionContainer")
var answerContainer = document.querySelector ("#answerContainer")
var endPage = document.querySelector ("#end");
var timerElement = document.querySelector ("#secondsLeft");
var startButton = document.querySelector("#startQuiz");
var highScoresButton = document.querySelector("#highscores")


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
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            return;
        }
    }, 1000);
}


function buildQuiz () {
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

        // appends buttons to container
        answerContainer.appendChild(answerChoices);
    }
}



// Listen for start game and run
startButton.addEventListener("click", startGame)




