//declare the variables needed to access all relevant elements from the html

//butoon variables
var startButton = document.getElementById("startButton");
var nextButton = document.getElementById('next-btn');

var viewHighScores = document.getElementById("scores-btn");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var restartButton1 = document.getElementById("restar-btn");
var restartButton = document.getElementById("restart-btn");

var answersButtonElement = document.getElementById('answer-buttons');

// variables for elements to append or remove
var startInstructionsElement = document.getElementById('startInstructions');
var questionElement = document.getElementById('question');
var questionContainerElement = document.getElementById('question-container');

// Other variables
var status = document.getElementById("status");
var yourScore = document.getElementById("your-score")
var scoreElement = document.getElementById("score-container");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var timeLeft = 100;
var timerEl = document.getElementById("timer");
var right = 0;
var highScores = [];

// Identifying Elements that will need to be hidden or shown when the Next button is clicked

document.getElementById("incorrect").classList.add('hide');
document.getElementById("correct").classList.add('hide');
document.getElementById("status").classList.add('hide');

//Start Button event listener, click on button to start.
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestion++
    setNextQuestion()
});

// timer countdown time left if time is at 0 game is over
function timeTick() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft + " Secs";
    if (timeLeft <= 0) {
        timerEl.textContent = "GAME OVER !!!" 
        saveScore();
    }
}


// When start game is clicked hide the start button and high scores (changing the DOM)
function startGame() {
    right = 0;
    startButton.classList.add('hide')
    shuffledQuestion = question.sort(() => Math.random() - 0.5)   
    currentQuestion = 0
    viewHighScores.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    startInstructionsElement.classList.add('hide')
    setNextQuestion()
    timerID = setInterval(timeTick, 1000)
    timeTick()
}



// // set nxt question until no questions left
function setNextQuestion () {
    resetState();
    if (shuffledQuestion.length < currentQuestion + 1) {
        clearInterval(score);
        clearInterval(time);
        endQuiz();
    } else {
        showQuestion(shuffledQuestion[currentQuestion])
    }   
}

// append question and corresponding answers options from array
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answers => {
        const button = document.createElement('button')
        button.innerText = answers.text
        button.classList.add('btn')
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectAnswer)
        answersButtonElement.appendChild(button)
    })
}
// //stop user selecting diffrent answer button after initial answer selected
function disableChildrenButtons(button) {
    var parent = button.parentElement;
    parent.childNodes.forEach(element => {
        element.disabled = true;
    }); 
}
//clear status r or w, new question set new answer , hide next btn till user selects answer again
function resetState()  {
      nextButton.classList.add("hide")
    document.getElementById("status").classList.add('hide');
    while (answersButtonElement.firstChild) {
        answersButtonElement.removeChild(answersButtonElement.firstChild)
    }
}


// Select answer function if select show hide, diabled extra press, set staus wright ot wrong function
function selectAnswer(e) {
    var selectedButton = e.target;
    disableChildrenButtons(e.target);
    setStatusClass(selectedButton);
    if (shuffledQuestion.length > currentQuestion + 1) {
        nextButton.classList.remove("hide")
    } else {
        saveScore();
    }}


// for each question answered set class colour right or wrong, show status w or r text at bottem, add to score if correct deduct 10 sec if wrong
function setStatusClass(selectedbutton) {
    document.getElementById("status").classList.remove('hide');
    if (selectedbutton.dataset.correct) {
        document.getElementById("incorrect").classList.add('hide');
        document.getElementById("correct").classList.remove('hide');
        right += 10;
    } else {
        document.getElementById("incorrect").classList.remove('hide');
        document.getElementById("correct").classList.add('hide');
        timeLeft -= 10;
    } 
}

 // clear class right or wrong 
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
 }


// Array for questions 
var question = [
    {
        question: "When was the first Marvel comic published ?",
        answers: [
            {text: "1942", correct: false},
            {text: "1999", correct: false},
            {text: "1956", correct: false},
            {text: "1939", correct: true}]
    },
    {
        question: "Who was the first Marvel superhero?",
        answers: [
            {text: "Spiderman", correct: false},
            {text: "The Hulk", correct: false},
            {text: "Captain America", correct: false},
            {text: "Human Torch", correct: true}]
    }, 
    {
        question: "What celebrity tried to purchase Marvel in the early 90s ?",
        answers: [
            {text: "Michael Jackson", correct: true},
            {text: "Chuck Norris", correct: false},
            {text: "Brad Pitt", correct: false},
            {text: "Bill Gates", correct: false}]
    }, 
    {
        question: "Who was the first female Marvel Superhero?",
        answers: [
            {text: "Spiderwoman", correct: false},
            {text: "The Invisible Woman", correct: true},
            {text: "Captain Marvel", correct: false},
            {text: "Black Widow", correct: false}]
    }, 
    {
        question: "What year was the fantastic four no. 1 released?",
        answers: [
            {text: "1941", correct: true},
            {text: "1940", correct: false},
            {text: "1943", correct: false},
            {text: "1942", correct: false}]
    }, 
    {
        question: "In 1973 Marvel copywrote which word for use in their comic books?",
        answers: [
            {text: "Super", correct: false},
            {text: "Hero", correct: false},
            {text: "Villian", correct: false},
            {text: "Zombie", correct: true}]
    }, 
    {
    question: "As of December 2022, how many Marvel films have been released?",
        answers: [
            {text: "100", correct: false},
            {text: "26", correct: false},
            {text: "30", correct: true},
            {text: "42", correct: false}]
    },
    {
        question: "The official language of Wakanda is a variant of Xhosa, spoke in which African country ?",
        answers: [
            {text: "Zimbabwe", correct: false},   
            {text: "South Africa", correct: false},
            {text: "Ghana", correct: false},
            {text: "Both A & B", correct: true}]
    },
    {
        question: "Marvel was not allowed to use which mythological creature in their comics ?",
        answers: [
            {text: "Unicorns", correct: false},   
            {text: "Poltergeist", correct: false},
            {text: "Ghosts", correct: false},
            {text: "Werewolves", correct: true}]
    },
    {
        question: "Who is the richest Marvel character?",
        answers: [
            {text: "Iron Man", correct: false},   
            {text: "Dr. Who", correct: false},
            {text: "Thor", correct: true},
            {text: "Captain Marvel", correct: false}]
    },
] 
// will end with an array bracket


// Show Final score end quiz section and record name and score form
function saveScore() {
//stop timer
    clearInterval(timerID);

    
 //sec time out to show last question before final score shows up     
    setTimeout(function () {
        questionContainerElement.classList.add('hide')
        scoreElement.classList.remove('hide');
 //1500 seconds 
    }, 1500)
    yourScore.textContent = "Your Final Score is " + right + "/100";
}

 // Get score from local storage to display in high score display
var loadScores = function () {
    if (!savedScores) {
        return false;
     }
 // Convert scores from stringfield format into array
    let savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        initials: initials,
        userScore: right,     
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.right
    })
};
// Show high score section 
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide");
    document.getElementById("score-container").classList.add("hide");
    startInstructionsElement.classList.add("hide");
    questionContainerElement.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials: initials,
            userScore: right,          
        }
        scores.push(score)
    }

var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";

//append name and score to high score section, create div for name and div for score
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].userScore;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }
localStorage.setItem("scores", JSON.stringify(scores));
};


// Function for click on start to show Highscores
viewHighScores.addEventListener("click", showHighScores);

//get score and name to pass thru and set score, & show highscore section after initials submited
submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    right;
    showHighScores(initials);
});


// Restart or reload the page- submit score section
restartButton1.addEventListener("click", function () {
    window.location.reload();
});
// Restart or reload the page save score section -high score section
restartButton.addEventListener("click", function () {
    window.location.reload();
});
