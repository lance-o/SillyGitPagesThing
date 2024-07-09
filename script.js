const timerHeader = document.getElementById("TimerText");
const timerStartButton = document.getElementById("StartTimer");
const timerAdd5 = document.getElementById("Add5");
const timerSub1 = document.getElementById("Sub1");

const soundArray = ["Sound1", "Sound2", "Sound3"];
const defaultTimer = 10;

let timeChosen = 0;
let timeRemaining = 0;
let timeCaptured = 0;
let timeTarget = 0;
let randomSoundIndex = 0;
let isTicking = false;
let soundFired = false;


//Would play a sound if I had one
function playSound(){
    if(!soundFired){
        console.log("Would have played " + `${soundArray[randomSoundIndex]}`);
        soundFired = true;
    }
}

//Calls playSound(), and would do other things assumedly.
function stopTimer(){
    if(isTicking){
        playSound();
        isTicking = false;
    }
}

//Runs every update - check if timer is finished
function checkTimerStop(){
    if(timeRemaining <= 0){
        stopTimer();
        timeRemaining = 0;
    }
}

//Used for buttons.
function addTimer(amount){
    if(!isTicking){
        amount *= 60000;
        timeRemaining+= amount;
    }
}

//Decrement timer every update. Reliant on Date.now()
function decrementTimer(){
    let timeCurrent = Date.now();
    timeRemaining = timeTarget - timeCurrent;
}

//Change sound index randomly
function randomizeSound(){
    randomSoundIndex = Math.floor(Math.random()*10) % 3;
}

//Target time is used to prevent any weird desyncs due to lag, etc
function startTimer(){
    timeCaptured = Date.now();
    timeTarget = timeRemaining + timeCaptured;
    isTicking = true;
    randomizeSound();
}

//If pressed while is ticking down resets. NOTE: temporary behaviour.
function handleStartTimer(){
    if(isTicking){
        resetTimer();
    }
    else{
        startTimer();
    }
}

//Convert integer time to ms.
function intToMilliseconds(int){
    int *= 60;
    int *= 1000;
    return int;
}

//Create string to write into header here
function makeTimeString(minutes,seconds){
    let timeString =  `${minutes}` + ":" + `${seconds}`;
    if(seconds < 10){
        timeString = timeString.substring(0, timeString.length-1) + "0" + timeString.substring(timeString.length-1);
    }
    return timeString;
}

//Add minute for every 60 seconds.
//For loop isn't the best way to do this, but I don't have to do
//decimal place stuff this way.
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

//Called immediately to set a value to the timer.
function initTimer(){
    timeRemaining = intToMilliseconds(defaultTimer);
    isTicking = false;
    soundFired = false;
}

initTimer();

//Unfinished behaviour.
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

//Runs roughly 60 times a second. Doesn't need to, should have something to
//make the page wait about one second.
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