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
var scoreContainer = document.querySelector("#scoreContainer")
var topBar =  document.querySelector("#topbar")

var finalScore = document.querySelector("#final-score");

var form = document.querySelector("#enterScore")

var initials = document.querySelector("#initials")

// answer correct or not
 var result ;

// footer for result prompt
var footer = document.querySelector("footer")

var answerButtons = document.querySelector(".answers")


var score;
var storedScores =[];
var timer;
var timerCount;
var currentQuestionIndex = 0;

// function to clear page and start quiz
function startGame () {
    startPage.setAttribute ("style", "display:none;");
    answerContainer.setAttribute ("style", "display:flex;");
    highScoresButton.setAttribute("style", "visibility:hidden;");
    topBar.setAttribute("style", "display:flex;")
    // SET TIMER
    timerCount = 31;
    currentQuestionIndex = 0;
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
    score = timerCount;
    timerElement.textContent = score
    console.log(score);

    quizContainer.innerHTML = "All Done."

    endPage.setAttribute("style", "display:contents;")
    finalScore.textContent = score

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        enterScore();
        scoresTable()
    })
}

function enterScore () {
    console.log(score)

    var inputInitials = initials.value.toUpperCase();

    var playerScores = JSON.parse(localStorage.getItem("highScores")) || [];

    var highScores = {
        initials: inputInitials,
        score: score
    };

    playerScores.push(highScores);
    console.log(highScores);

    localStorage.setItem("highScores", JSON.stringify(playerScores));

    scoresTable();
}

function scoresTable () {
    startPage.setAttribute ("style", "display:none;");
    quizContainer.setAttribute ("style", "display:none;");
    endPage.setAttribute("style", "display:none;")
    scoreContainer.setAttribute ("style", "display:flex;");
    topBar.setAttribute("style", "display:none;")

    var playerHighScores = JSON.parse(localStorage.getItem("highScores")) || [];
    scoreContainer.innerHTML="";
    for (i=0; i<playerHighScores.length; i++) {
        var listItemEl = document.createElement("li");
        listItemEl.textContent = playerHighScores[i].initials + "  -  " + playerHighScores[i].score
        scoreContainer.appendChild(listItemEl)
    }


    var tryAgainbtn = document.createElement("button")
    tryAgainbtn.textContent = "Start Quiz"


    tryAgainbtn.addEventListener("click", function(){
        tryAgainbtn.remove();
        scoreContainer.setAttribute ("style", "display:none;");
        startGame()
    }),

    scoreContainer.appendChild(tryAgainbtn)
}

// TODO: lose game, bring back high score and TRY AGAIN button

function loseGame () {
    clearInterval(timerInterval)
    answerContainer.setAttribute("style", "display:none;")
    questionContainer.innerHTML = "Time's Up!"
    var tryAgainbtn = document.createElement("button")
    tryAgainbtn.textContent = "Try Again?"

    tryAgainbtn.addEventListener("click", startGame)


    questionContainer.appendChild(tryAgainbtn)



}

// Listen for start game and run
startButton.addEventListener("click", startGame)

// view high scores
highScoresButton.addEventListener("click", scoresTable)



