// variables for time and timer
let secondsLeft = 100
let timerInterval
// variable for the score
let score = 0
// variable to store the index of the current showing question
let currentQuestionIndex = 0

// set variables to select elements on the HTML
const introEl = $('#intro')
const startBtn = $('#start-quiz')
const timeEl = $('#time')
let questions = $('#questions')
let answers = $('#answers')
let highscoreTable = $('#highscore tbody')
let endGameSection = $('#end-game')

// Object storing questions, answers and correct answer
let questionsList = [
    {
        questionMark: 'Which European team won the treble in the season 2023?',
        answers: ['Real Madrid', 'Napoli', 'Manchester City', 'Bayern Monaco'],
        rightAnswer: 'Manchester City'
    },
    {
        questionMark: 'Which player has won the FIFA Ballon d\'Or the most times?',
        answers: ['Lionel Messi', 'Cristiano Ronaldo', 'Zinedine Zidane', 'George Best'],
        rightAnswer: 'Lionel Messi'
    },
    {
        questionMark: 'Which country won the FIFA World Cup in 2006?',
        answers: ['Brazil', 'Italy', 'Germany', 'Argentina'],
        rightAnswer: 'Italy'
    },
    {
        questionMark: 'What player scored the "Hand of God" goal during the 1986 World Cup?',
        answers: ['Pelé', 'Cristiano Ronaldo', 'Diego Milito', 'Diego Armando Maradona'],
        rightAnswer: 'Diego Armando Maradona'
    },
    {
        questionMark: 'Who is the all-time top scorer of the UEFA Champions League?',
        answers: ['Lionel Messi', 'Cristiano Ronaldo', 'Raul', 'Robert Lewandowski'],
        rightAnswer: 'Cristiano Ronaldo'
    }
];

// function generating HTML buttons for the answer at the questions
function createAnswersButton(question) {
    answers.empty()
    for (let i = 0; i < question.answers.length; i++) {
        let btn = $('<button>').text(question.answers[i])
        answers.append(btn)
        btn.on('click', function() {
            handleAnswerSelection($(this).text(), question)
        })
    }
}

// function assigning score for correct answers or taking off seconds for wrong answers
function handleAnswerSelection(selectedAnswer, question) {
    if (selectedAnswer === question.rightAnswer) {
        score++
    } else {
        secondsLeft -= 10
        if (secondsLeft < 0) {
            // avoid the time to go negative
            secondsLeft = 0
        }
    }


    currentQuestionIndex++
    if (currentQuestionIndex < questionsList.length) {
        loadNextQuestion()
    } else {
        endGame()
    }
}

function loadNextQuestion() {
    let nextQuestion = questionsList[currentQuestionIndex]
    questions.find('h2').text(nextQuestion.questionMark)
    createAnswersButton(nextQuestion)
}

function updateHighScoreDisplay() {
    let storedHighScores = localStorage.getItem('highScores') ? localStorage.getItem('highScores').split(';') : []
    storedHighScores = storedHighScores
        .filter(entry => entry.trim() !== '')
        .sort((a, b) => parseInt(b.split(':')[1]) - parseInt(a.split(':')[1]))

    let lastTwoScores = storedHighScores.slice(0, 2)
    highscoreTable.empty()
    lastTwoScores.forEach((entry, index) => {
        let [user, userScore] = entry.split(':')
        highscoreTable.append(`<tr><th scope="row">${index + 1}</th><td>${user}</td><td>${userScore}</td></tr>`)
    });
}

function endGame() {
    clearInterval(timerInterval)

    // hide the questions section when the game is over
    questions.hide()

    // display the end-game section
    endGameSection.removeClass('hide')

    let finalScoreElement = $('#final-score')
    finalScoreElement.text(score)

    $('#score-form').on('submit', function(event) {
        event.preventDefault()
        let userInitials = $('#initials').val()
        let storedHighScores = localStorage.getItem('highScores') ? localStorage.getItem('highScores').split(';') : []
        storedHighScores.push(`${userInitials}:${score}`)
        storedHighScores = storedHighScores
            .filter(entry => entry.trim() !== '')
            .sort((a, b) => parseInt(b.split(':')[1]) - parseInt(a.split(':')[1]))

        storedHighScores = storedHighScores.slice(0, 2)
        localStorage.setItem('highScores', storedHighScores.join(';'))
        updateHighScoreDisplay()

        location.reload()
    })
}

$(document).ready(function() {
    updateHighScoreDisplay()

    startBtn.on('click', function() {
        introEl.attr('class', 'hide')

        timerInterval = setInterval(function() {
            secondsLeft--

            // display 0 if secondsLeft is negative
            timeEl.text(Math.max(0, secondsLeft))
        
            if (secondsLeft <= 0) {
                endGame()
            }
        }, 1000)

        loadNextQuestion()
        questions.css('display', 'block')
    })
})
