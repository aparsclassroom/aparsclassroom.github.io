var mainApp = {};
(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.isAnonymous === true) {
                alert("It is a premium feature");
                location.replace("/BioDictionary/index.html");
                return;
            } else {
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

                var as = window.location.pathname.toString();
                const ID = as.split('/')[3] + "/" + as.split('/')[4] + "/video-" + as.split('/')[7].substring(1, 16);

                fetch('https://script.google.com/macros/s/AKfycbx2dj1PI7ROIp_8swqHiquG7ZeBriFNIMudGMvPBTy9o72F2cc07QUAJkDUAtOTxxcK/exec' + "?q=Exam&ID=" + ID)
                    .then((res) => {
                        return res.json();
                    })
                    .then((loadedQuestions) => {
                        if (loadedQuestions.code === 200) {
                            questions = JSON.parse(loadedQuestions.Exam);
                            startGame();
                        } else {
                            alert(loadedQuestions.code + "  " + loadedQuestions.message);
                            return close();
                        }
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
                    strt();
                };

                function strt() {
                    game.classList.remove('hidden');
                    loader.classList.add('hidden');
                    ntimer();
                }
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
                        clearInterval(mytime);
                        document.getElementById('timer').classList.remove('quiz_timer');
                        document.getElementById('timer').classList.add('finish');
                        document.getElementById('st').classList.remove('time');
                        document.getElementById('st').classList.add('ftime');
                        document.getElementById('st').innerHTML = "Times Up!";
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
            }
        } else {
            location.replace("/BioDictionary/login.html");
        }
    });
})()