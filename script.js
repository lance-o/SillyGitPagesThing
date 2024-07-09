const timerHeader = document.getElementById("TimerText");
const timerStartButton = document.getElementById("StartTimer");
const timerAdd5 = document.getElementById("Add5");
const timerSub1 = document.getElementById("Sub1");

let defaultTimer = 10;
let timeChosen = 0;
let timeRemaining = 0;
let timeCaptured = 0;
let timeTarget = 0;
let isTicking = false;

function checkTimerStop(){
    if(timeRemaining <= 0){
        isTicking = false;
        timeRemaining = 0;
    }
}

function addTimer(amount){
    if(!isTicking){
        amount *= 60000;
        timeRemaining+= amount;
    }
}

function decrementTimer(){
    let timeCurrent = Date.now();
    timeRemaining = timeTarget - timeCurrent;
}

function startTimer(){
    timeCaptured = Date.now();
    timeTarget = timeRemaining + timeCaptured;
    isTicking = true;
}

function handleStartTimer(){
    if(isTicking){
        resetTimer();
    }
    startTimer();
}

function intToMilliseconds(int){
    int *= 60;
    int *= 1000;
    return int;
}

function makeTimeString(minutes,seconds){
    let timeString =  `${minutes}` + ":" + `${seconds}`;
    if(seconds < 10){
        timeString = timeString.substring(0, timeString.length-1) + "0" + timeString.substring(timeString.length-1);
    }
    return timeString;
}

function millisecondsToTime(milliseconds){
    let minutes;
    let timeString = "";
    milliseconds = milliseconds / 1000;
    for(minutes = 0; milliseconds >= 60; minutes++){
        milliseconds -= 60;
    }
    milliseconds = Math.floor(milliseconds);
    return makeTimeString(minutes,milliseconds);
}

function initTimer(){
    timeRemaining = intToMilliseconds(defaultTimer);
}

initTimer();

function resetTimer(){
    initTimer();
}

timerStartButton.addEventListener("click", handleStartTimer);

timerAdd5.addEventListener("click", function add5(){
    addTimer(5);
});

timerSub1.addEventListener("click", function sub1(){
    addTimer(-1);
});

window.requestAnimationFrame(
    function updatey(){
        checkTimerStop();
        if(isTicking){
            decrementTimer();
        }
        timerHeader.textContent=`${millisecondsToTime(timeRemaining)}`;
        window.requestAnimationFrame(updatey);
    }
);