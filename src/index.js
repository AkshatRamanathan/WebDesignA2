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

function start() {
    timer.start();
}
function stop() {
    timer.stop();
}
function reset() {
    timer.reset();
}
