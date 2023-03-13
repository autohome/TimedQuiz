// Define the quiz questions and answers
const quizQuestions = [
    {
        question: "In which year was the first Batman comic book published?",
        answers: {
            a: "1939",
            b: "1949",
            c: "1959"
        },
        correctAnswer: "a"
    },
    {
        question: "Which actor played Batman in the 1995 movie 'Batman Forever?'",
        answers: {
            a: "Michael Keaton",
            b: "George Clooney",
            c: "Val Kilmer"
        },
        correctAnswer: "c"
    },
    {
        question: "Who is the villain in 2008 Batman movie 'The Dark Knight'",
        answers: {
            a: "The Joker",
            b: "The Riddler",
            c: "The Penguin"
        },
        correctAnswer: "a"
    }
  ];
  
// ELement selectors
var startPage = document.querySelector('#startpage');
var quizPage = document.querySelector ('#quiz');
var endPage = document.querySelector ("end");
var timerElement = document.querySelector ('#secondsleft');

var scores =[];
var timer;
var timerCount;

function startGame () {
    startPage.getElementsByClassName.display = "none";

}


