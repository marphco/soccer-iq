// Variables for time and timer
let secondsLeft = 100;
let timerInterval;

// Variable for the score
let score = 0;

// Variable to store the index of the current showing question
let currentQuestionIndex = 0;

// Set variables to select elements on the HTML
const introEl = $('#intro');
const startBtn = $('#start-quiz');
const timeEl = $('#time');
let questions = $('#questions');
let answers = $('#answers');
let highscoreTable = $('#highscore tbody');
let endGameSection = $('#end-game');

// Object storing questions, answers, and correct answer
let questionsList = [
    // ... (questions array)
];

// Function generating HTML buttons for the answer at the questions
function createAnswersButton(question) {
    answers.empty();
    for (let i = 0; i < question.answers.length; i++) {
        let btn = $('<button>').text(question.answers[i]);
        answers.append(btn);
        btn.on('click', function () {
            handleAnswerSelection($(this).text(), question);
        });
    }
}

// Function assigning score for correct answers or taking off seconds for wrong answers
function handleAnswerSelection(selectedAnswer, question) {
    if (selectedAnswer === question.rightAnswer) {
        score++;
    } else {
        secondsLeft -= 10;

        // Avoid the time to go negative
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questionsList.length) {
        loadNextQuestion();
    } else {
        endGame();
    }
}

function loadNextQuestion() {
    let nextQuestion = questionsList[currentQuestionIndex];
    questions.find('h2').text(nextQuestion.questionMark);
    createAnswersButton(nextQuestion);
}

function updateHighScoreDisplay() {
    let storedHighScores = localStorage.getItem('highScores') ? localStorage.getItem('highScores').split(';') : [];
    storedHighScores = storedHighScores
        .filter(entry => entry.trim() !== '')
        .sort((a, b) => parseInt(b.split(':')[1]) - parseInt(a.split(':')[1]));

    let lastTwoScores = storedHighScores.slice(0, 2);
    highscoreTable.empty();
    lastTwoScores.forEach((entry, index) => {
        let [user, userScore] = entry.split(':');
        highscoreTable.append(`<tr><th scope="row">${index + 1}</th><td>${user}</td><td>${userScore}</td></tr>`);
    });
}

function endGame() {
    clearInterval(timerInterval);

    // Hide the questions section when the game is over
    questions.hide();

    // Display the end-game section
    endGameSection.removeClass('hide');

    let finalScoreElement = $('#final-score');
    finalScoreElement.text(score);

    $('#score-form').on('submit', function (event) {
        event.preventDefault();
        let userInitials = $('#initials').val();
        let storedHighScores = localStorage.getItem('highScores') ? localStorage.getItem('highScores').split(';') : [];
        storedHighScores.push(`${userInitials}:${score}`);
        storedHighScores = storedHighScores
            .filter(entry => entry.trim() !== '')
            .sort((a, b) => parseInt(b.split(':')[1]) - parseInt(a.split(':')[1]));

        storedHighScores = storedHighScores.slice(0, 2);
        localStorage.setItem('highScores', storedHighScores.join(';'));
        updateHighScoreDisplay();

        location.reload();
    });
}

$(document).ready(function () {
    updateHighScoreDisplay();

    startBtn.on('click', function () {
        introEl.attr('class', 'hide');

        timerInterval = setInterval(function () {
            secondsLeft--;

            // Display 0 if secondsLeft is negative
            timeEl.text(Math.max(0, secondsLeft));

            if (secondsLeft <= 0) {
                endGame();
            }
        }, 1000);

        loadNextQuestion();
        questions.css('display', 'block');
    });
});
