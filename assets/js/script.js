

// Set a timer on start button

let secondsLeft = 100

let startTimer = document.querySelector("#seconds")
let startQuiz = document.querySelector("#start-quiz")

function startGame() {
    startTimer.textContent = secondsLeft
}

startQuiz.addEventListener("click", function() {
   
    //Access #intro CSS tag
    let hideScreen = document.querySelector("#intro")
   
    // Hide intro screen when the quiz start
    hideScreen.setAttribute("class", "hide")

    // Show first question of the quiz
    let question1 = document.querySelector("#question1")
    question1.setAttribute("style", "display:block;")
   
    //Start timer function
    let timerInterval = setInterval(function () {
        secondsLeft--
        startTimer.textContent = `${secondsLeft}`
    
        if (secondsLeft === 0) {
         
            // Stops execution of action at set interval
          clearInterval(timerInterval)
         
          // ?Calls function for the Highscore Form Submission
        }
    
      }, 1000)

      function nextQuestion() {
        let button = document.querySelector("button")
        question1.setAttribute("class", "hide")
    }
    
    button.addEventListener("click", nextQuestion())
    
      
})












