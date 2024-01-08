// Set a timer on start button
let secondsLeft = 100

let score = 0

let startTimer = document.querySelector("#seconds")
let startQuiz = document.querySelector("#start-quiz")
let questions = document.querySelectorAll(".question")
let answerLists = document.querySelectorAll(".question ul")



function startGame() {
  startTimer.textContent = secondsLeft
}

startQuiz.addEventListener("click", function () {
  // Access #intro CSS tag
  let hideScreen = document.querySelector("#intro")

  // Hide intro screen when the quiz starts
  hideScreen.setAttribute("class", "hide")

  // Show first question of the quiz
  questions[0].setAttribute("style", "display:block;")

  // Start timer function
  let timerInterval = setInterval(function () {
    secondsLeft--
    startTimer.textContent = `${secondsLeft}`

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval)
      // Calls function for the Highscore Form Submission
    }
  }, 1000)
})


for (let index = 0; index < answerLists.length; index++) {
  answerLists[index].addEventListener("click", function (event) {
    let selectedAnswer = event.target
    let currentQuestion = questions[index]
    let nextQuestion = questions[index + 1]

    if (selectedAnswer.tagName === "BUTTON") {
      currentQuestion.style.display = "none"
      nextQuestion.style.display = "block"
    }
  })
}




let submitButton = document.querySelector("#submit-button")
let initials = document.querySelector("#initials")



