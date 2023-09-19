// Defined Questions and Answers.
var questions = [
    {
        question: "What is HTML?",
        choices: ["Hyper Text Markup Language", "High-Level Marketing Language", "Hyperlink and Text Makeup", "Hyper Tough Makeup Language"],
        correctAnswer: 0
    },
    
    {
            question: "What does CSS stand for?",
            choices: ["Copper Silk Socks", "Cool Stripes Sally", "Custom Style Sheets", "Cascading Style Sheets"],
            correctAnswer: 3
    },
        
    {
            question: "JavaScript is used for?",
            choices: ["Styling", "Adding fun colors", "Making you look really cool if you know how to use it", "Creating dynamic content for websites"],
            correctAnswer: 3
    },

    {
            question: "CDN stands for Content Delivery Network",
            choices: ["true", "false"],
            correctAnswer: 0
    },

    {
            question: "What is an API?",
            choices: ["A Playground Interaction", "Application Programming Interface", "Application Professionals Instruction", "Apparent Parents International"],
            correctAnswer: 1
    }
    
];

//Defined quiz variables and API's
var startButton = document.getElementById('start-button');
var quizContainer = document.getElementById('quiz-container');
var questionElement = document.getElementById('question');
var choicesElement = document.getElementById('choices');
var timerElement = document.getElementById('timer');
var timeRemainingElement = document.getElementById('time-remaining');
var initialsInput = document.getElementById('initials');
var submitScoreButton = document.getElementById('submit-score');

let currentQuestionIndex = 0;
let timeRemaining = 60;
let score = 0;
let timerInterval;

//Begin Quiz Function
function startQuiz() {
    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion(currentQuestionIndex);
    startTimer();
}

function loadQuestion(index) {
    if (index < questions.length) {
        const question = questions[index];
        questionElement.textContent = question.question;
        choicesElement.innerHTML = '';

        question.choices.forEach((choice, i) => {
            const choiceElement = document.createElement('li');
            choiceElement.textContent = choice;
            choiceElement.addEventListener('click', () => checkAnswer(i));
            choicesElement.appendChild(choiceElement);
        });
    } else {
        endQuiz();
    }
}
//Answer submition and time deduction function.
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
    } else {
        timeRemaining -= 10;
        if (timeRemaining < 0) {
            timeRemaining = 0;
        }
    }
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
}

//Timer function displayed on webpage.
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        timeRemainingElement.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = 'none';
    initialsInput.style.display = 'block';
    submitScoreButton.style.display = 'block';
}
//Event listener upon a click to change HTML elements on the page to display quiz questions. 
startButton.addEventListener('click', startQuiz);
submitScoreButton.addEventListener('click', () => {
//Enter Initials and Display Score.    
    var initials = initialsInput.value;
    var showScores = JSON.parse(localStorage.getItem('showScores')) || [];
    scores.push({ initials, score });
    localStorage.setItem('showScores', JSON.stringify(showScores));

    initialsInput.value = "";
});

