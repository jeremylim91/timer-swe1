// Please declare functions and variables above where they are used.


//===================Global variables===================
const interval = 1;
let timeInMS = 0;
let timer = null;
let canClick = true;
let secondsCounter = 0;
let minsCounter = 0;
let hoursCounter = 0;
let storeTime = [];
let numTimesResetButtonClicked = 1;

//=================Helper functions======================
const output = (message) => {
    ElapsedTimeDisplayArea.innerText = message;
};

//----------------click start---------------------------
//use setInterval to display counting-up

const clickStart = () => {
    canClick = false;

    //declare the secondsCounter to keep track of seconds
    let secondsCounter = 0;

    //use set interval to increase time every second
    timer = setInterval(() => {
        timeInMS += 1;
        msToHours(timeInMS)
    }, interval);
}

//--------------translate ms to seconds to mins to hrs--------------
const msToHours = (time) => {

    output(timeInMS);

    if (timeInMS >= 1000) {
        console.log(`time is less than 1 sec`)
        secondsCounter += 1;
        timeInMS = 0;
        console.log(`secondsCounter is ${secondsCounter}`)
    }
    if (secondsCounter >= 60) {
        console.log(`time is less than 1 min`)
        minsCounter += 1;
        secondsCounter = 0;
        console.log()
    }

    if (minsCounter >= 60) {
        console.log(`time is less than 1 hr`)
        hoursCounter += 1;
        minsCounter = 0;
    }

    output(`${hoursCounter}: ${minsCounter}: ${secondsCounter}: ${timeInMS}`)
}

// -----------------click Stop-----------------------------
const clickStop = () => {
    console.log(`stop has been clicked`);
    clearInterval(timer);
    canClick = true;
}

// -----------------click Reset -----------------------------
const clickReset = () => {

    //reset time to 0
    timeInMS = 0;
    secondsCounter = 0;
    //reset laps
    storeTime = [];

    //empty the elements displaying timing
    ElapsedTimeDisplayArea.innerText = '';
    lapDataDisplayArea.innerText = '';

    //re-enable clicking
    canClick = true;
}

// -----------------click Lap -----------------------------
const clickLapTime = () => {

    //this is for split timing 
    //capture the current  timing and store it in an object
    let consolidatedTimings = {
        timeInMS,
        secondsCounter,
        minsCounter,
        hoursCounter,
    }
    console.log(`consolidated timings is `)
    console.log(consolidatedTimings);

    //store the object in an array
    storeTime.push(consolidatedTimings)

    //display the stored number in the lapDataDisplayArea
    let i = numTimesResetButtonClicked;
    // lapDataDisplayArea.innerHTML = `${storeTime[i].hoursCounter}:${storeTime[i].minsCounter}: ${storeTime[i].secondsCounter}: ${storeTime[i].timeInMS} <br>`

    let splitTimes = '';
    for (let i = 0; i < numTimesResetButtonClicked; i += 1) {
        // storeTime.push(consolidatedTimings)
        splitTimes = `${storeTime[i].hoursCounter}:${storeTime[i].minsCounter}: ${storeTime[i].secondsCounter}: ${storeTime[i].timeInMS} <br>` + splitTimes;
    }
    lapDataDisplayArea.innerHTML = splitTimes
    numTimesResetButtonClicked += 1;

    // this is for lap timing
    //xxx

};

// ===============SETUP THE PAGE==========================

console.log(`game initialising...`)
const mainDisplayArea = document.createElement('div');
mainDisplayArea.classList.add('mainDisplayArea');
const lapDataDisplayArea = document.createElement('div');
lapDataDisplayArea.classList.add('LapDataDisplayArea');

const ElapsedTimeDisplayArea = document.createElement('div');
ElapsedTimeDisplayArea.classList.add('ElapsedTimeDisplayArea');

const startTimeDisplayArea = document.createElement('button');
startTimeDisplayArea.innerText = 'START';
startTimeDisplayArea.classList.add('startTimeDisplayArea');

const stopTimeDisplayArea = document.createElement('button');
stopTimeDisplayArea.innerText = 'STOP'
stopTimeDisplayArea.classList.add('stopTimeDisplayArea');

const resetTimeDisplayArea = document.createElement('button');
resetTimeDisplayArea.innerText = 'RESET'
resetTimeDisplayArea.classList.add('resetTimeDisplayArea');

const lapTimeDisplayArea = document.createElement('button');
lapTimeDisplayArea.innerText = 'LAP'
lapTimeDisplayArea.classList.add('lapTimeDisplayArea');

mainDisplayArea.appendChild(lapDataDisplayArea);
mainDisplayArea.appendChild(ElapsedTimeDisplayArea);
mainDisplayArea.appendChild(startTimeDisplayArea)
mainDisplayArea.appendChild(stopTimeDisplayArea)
mainDisplayArea.appendChild(resetTimeDisplayArea)
mainDisplayArea.appendChild(lapTimeDisplayArea);
document.body.appendChild(mainDisplayArea);

// ===============GAME FLOW==========================
const gameInit = () => {
    startTimeDisplayArea.addEventListener('click', () => {
        if (canClick === true) {
            clickStart()
        }
    });
    stopTimeDisplayArea.addEventListener('click', clickStop);
    resetTimeDisplayArea.addEventListener('click', clickReset);
    lapTimeDisplayArea.addEventListener('click', clickLapTime)

}
gameInit()
