async function fetchQuestions() {
    const response = await fetch('questions.json', { method: 'GET' });
    const questions = await response.json();
    return questions;
}

function renderSubmitButton() {
    const questionsDiv = document.getElementById('questions');
    const submitButton = document.createElement('button');
    submitButton.textContent = "SUBMIT";
    submitButton.setAttribute("id", "submitButton");
    submitButton.addEventListener('click', printScore);
    questionsDiv.appendChild(submitButton);
}

function nextAction(nextIndex) {
    if (nextIndex == -1) {
        //last question

    }
    else {
        let x = document.querySelector(`input[name="options${nextIndex - 1}"]:checked`).value;
        if (QUESTIONS[nextIndex - 1].answer == x) {
            SCORE += QUESTIONS[nextIndex - 1].points;
        }
        counter.resetCounter();
        displayQuestion(nextIndex);
    }
}

function renderNextButton(nextIndex) {
    const questionsDiv = document.getElementById('questions');
    const nextButton = document.createElement('button');
    nextButton.textContent = "NEXT";
    nextButton.setAttribute("id", "nextButton");
    nextButton.addEventListener('click', (e) => nextAction(nextIndex));
    if (nextIndex == QUESTIONS.length) {
        nextButton.style.display = "none";
        renderSubmitButton();
    }
    questionsDiv.appendChild(nextButton);
}

function renderPreviousButton(prevIndex) {
    const questionsDiv = document.getElementById('questions');
    const prevButton = document.createElement('button');
    prevButton.textContent = "PREV";
    prevButton.setAttribute("id", "prevButton");
    prevButton.addEventListener('click', (e) => displayQuestion(prevIndex));
    if (prevIndex < 0) {
        prevButton.disabled = true;
    }
    questionsDiv.appendChild(prevButton);
}

function printScore() {
    clearTimeout(timex);
    let x = document.querySelector(`input[name="options4"]:checked`).value;
    console.log(x)
    if (QUESTIONS[4].answer == x) {
        SCORE += QUESTIONS[4].points;
    }
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ""; //cleanup
    questionsDiv.textContent = `SCORE: ${SCORE}/10`;

    renderRestartButton();
}

function renderRestartButton() {
    const questionsDiv = document.getElementById('questions');
    const restartButton = document.createElement('button');
    restartButton.textContent = "RESTART";
    restartButton.setAttribute("id", "restartButton");
    restartButton.addEventListener('click', (e) => location.reload());
    questionsDiv.appendChild(restartButton);
}

function displayQuestion(index) {

    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ""; //cleanup

    const question = QUESTIONS[index];
    //create block
    const newBlock = document.createElement('div');
    newBlock.setAttribute("id", `question${index}`)
    newBlock.innerHTML = `<h3>${question.question}</h3><span>Points: ${question.points}</span><table><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[0].option}">${question.options[0].name}</td></tr><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[1].option}">${question.options[1].name}</td></tr><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[2].option}">${question.options[2].name}</td></tr><tr><td><input type="radio" id="${question._id}" name="options${question._id}" value="${question.options[3].option}">${question.options[3].name}</td></tr></table>`;
    questionsDiv.appendChild(newBlock);
    renderPreviousButton(index - 1);
    renderNextButton(index + 1);
    renderRestartButton();


}

function start2() {
    counter.startCounter();
    document.getElementById("start").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    fetchQuestions().then((response) => {
        QUESTIONS = response;
        displayQuestion(0);

    }
    );
}



function createCounter() {
    let counter;

    function drawTime(seconds) {
        let s = seconds;
        if (s < 10) {
            s = `0${s}`;
        }
        let output = `00 : ${s}`;
        document.getElementById("timeA").textContent = output;
    }

    function resetCounter() {
        clearInterval(counter);
        drawTime(10);
        startCountDown();
    }

    function startCountDown() {
        let timeLeft = 10;
        counter = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                document.querySelector('input').click();
                document.getElementById("nextButton").click();
                resetCounter();
            }
            drawTime(timeLeft);
        }, 1000);
    }
    return {
        startCounter: startCountDown,
        resetCounter: resetCounter,
        drawTime: drawTime
    };

}


function createTimer() {
    let timer;

    function updateTime(seconds) {
        let mins = Math.floor(seconds / 60);
        if (mins < 10) {
            mins = `0${mins}`;
        }
        let secs = Math.floor(seconds % 60);
        if (secs < 10) {
            secs = `0${secs}`;
        }
        let outputString = `${mins} : ${secs}`;
        document.getElementById("time").textContent = outputString;
    }

    function startTimer() {
        console.log("Timer started.");
        let time = 0;
        timer = setInterval(function () {
            time++;
            // console.log(time);
            updateTime(time);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function resetTimer() {
        clearInterval(timer);
        updateTime(0);

    }
    return {
        start: startTimer,
        stop: stopTimer,
        reset: resetTimer
    };
}
const timer = createTimer();
const counter = createCounter();

function start() {
    timer.start();
}
function stop() {
    timer.stop();
}
function reset() {
    timer.reset();
}

let QUESTIONS = [];
let SCORE = 0;
let answers = [];
let timex;