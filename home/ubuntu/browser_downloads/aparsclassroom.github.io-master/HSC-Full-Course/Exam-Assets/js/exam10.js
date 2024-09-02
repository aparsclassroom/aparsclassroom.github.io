const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    ntimer();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem("minutes", minutes);
        localStorage.setItem("seconds", seconds);
        clearInterval(mytime);
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});
const oneMinute = (1000 * 60);

function ntimer() {
    setTimeout(function timer() {
        document.getElementById('timer').classList.remove('quiz_timer');
        document.getElementById('timer').classList.add('finish');
        document.getElementById('st').classList.remove('time');
        document.getElementById('st').classList.add('ftime');
        document.getElementById('st').innerHTML = "Times Up!";
        clearInterval(mytime);
        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem("minutes", minutes);
        localStorage.setItem("seconds", seconds);
        setTimeout(() => {
            window.location.assign('end.html');
        }, 1000);

    }, (MAX_QUESTIONS * oneMinute))
}


let dt = new Date(new Date().setTime(0));
let ctime = dt.getTime();
let seconds = Math.floor((ctime % (1000 * 60)) / 1000);
let minutes = Math.floor((ctime % (1000 * 60 * 60)) / (1000 * 60));
let time = 0;
let mytime = setInterval(function() {
    time++;

    if (seconds < 59) {
        seconds++;
    } else {
        seconds = 0;
        minutes++;
    }
    let formatted_sec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let formatted_min = minutes < 10 ? `0${minutes}` : `${minutes}`
    document.querySelector("span.time").innerHTML = `${formatted_min} : ${formatted_sec}`;
}, 1000);





incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};