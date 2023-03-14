// Define the quiz questions and answers
const quizQuestions = [
    {
        question: "In which year was the first Batman comic book published?",
        answers: {
            a: "1939",
            b: "1949",
            c: "1959",
            d: "1969"
        },
        correctAnswer: "a"
    },
    {
        question: "Which actor played Batman in the 1995 movie 'Batman Forever?'",
        answers: {
            a: "Michael Keaton",
            b: "George Clooney",
            c: "Val Kilmer",
            d: "Danny DeVito"
        },
        correctAnswer: "c"
    },
    {
        question: "Who is the villain in 2008 Batman movie 'The Dark Knight'",
        answers: {
            a: "The Joker",
            b: "The Riddler",
            c: "The Penguin",
            d: "Superman"
        },
        correctAnswer: "a"
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
    var numberOfAnswers = currentQuestion.length
    answerContainer.textContent = "";

    for (var i = 0; i < numberOfAnswers; i++) {
        var choiceButton = document.createElement ("button");
        choiceButton.textcontent = currentQuestion.answers[i];
    }
}



// Listen for start game and run
startButton.addEventListener("click", startGame)




