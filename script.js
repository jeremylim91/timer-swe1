// Please declare functions and variables above where they are used.

//= ==================Global variables===================
const interval = 1;
let timeInMS = 0;
let timer = null;
let canClick = true;
let secondsCounter = 0;
let minsCounter = 0;
let hoursCounter = 0;
let storeTime = [];
let numTimesResetButtonClicked = 0;
let lapTiming = null;
let previousLapTime = null;
let cumulativeMS = 0;

//= ================Helper functions======================
const output = (message) => {
  ElapsedTimeDisplayArea.innerText = message;
};

// ----------------click start---------------------------
// use setInterval to display counting-up

const clickStart = () => {
  canClick = false;

  // use set interval to increase time every second
  timer = setInterval(() => {
    cumulativeMS += 1;

    msToHours(cumulativeMS);
  }, interval);
};

// --------------translate ms to seconds to mins to hrs--------------
const msToHours = (time) => {
  if (time % 1000 === 0) {
    console.log('time is less than 1 sec');
    secondsCounter += 1;
    console.log(`secondsCounter is ${secondsCounter}`);
  }
  if (secondsCounter >= 60) {
    console.log('time is less than 1 min');
    minsCounter += 1;
    secondsCounter = 0;
    console.log();
  }

  if (minsCounter >= 60) {
    console.log('time is less than 1 hr');
    hoursCounter += 1;
    minsCounter = 0;
  }

  output(`${hoursCounter}: ${minsCounter}: ${secondsCounter}: ${cumulativeMS}`);
};

// -----------------click Stop-----------------------------
const clickStop = () => {
  console.log('stop has been clicked');
  clearInterval(timer);
  canClick = true;
};

// -----------------click Reset -----------------------------
const clickReset = () => {
  // reset time to 0
  timeInMS = 0;
  secondsCounter = 0;
  hoursCounter = 0;
  // reset laps
  storeTime = [];

  // empty the elements displaying timing
  ElapsedTimeDisplayArea.innerText = '';
  lapDataDisplayArea.innerText = '';

  // re-enable clicking
  canClick = true;
};

// ---------------MS to (readable) time--------------------
const msToTime = (timeData) => {
  const MSInASec = 1000;
  const SecsInAMin = 60;
  const MinsInAnHr = 60;
  let MSToDisplayableTime = timeData;

  // identify the num of MS to be shown
  const ms = MSToDisplayableTime % MSInASec;
  // remove the MS from MSToDisplayableTime, then use remaining time to identify the seconds to be shown;
  MSToDisplayableTime = (MSToDisplayableTime - ms) / MSInASec;
  const secs = MSToDisplayableTime % SecsInAMin;
  // remove the seconds from the remaining time, then identify the mins to be shown in mins
  MSToDisplayableTime = (MSToDisplayableTime - secs) / SecsInAMin;
  const mins = MSToDisplayableTime % SecsInAMin;
  // remove the mins, then identify the hours to be shown
  const hrs = (MSToDisplayableTime - mins) / MinsInAnHr;

  return hrs + ':' + mins + ':' + secs + ':' + ms;
};

// -----------------click Lap -----------------------------
const clickLapTime = () => {
// store the time (in ms) in an array
  storeTime.push(cumulativeMS);

  // Get the lap time:
  // if this is the first lap, lap time=  current time -0;
  if (previousLapTime === null) {
    lapTiming = storeTime[numTimesResetButtonClicked];
    previousLapTime = storeTime[numTimesResetButtonClicked];
  }
  // from the second lap onwards, the lap time is curent time - previous lap time
  else if (previousLapTime !== null) {
    lapTiming = storeTime[numTimesResetButtonClicked] - previousLapTime;
    previousLapTime = storeTime[numTimesResetButtonClicked];
    // the current time now becomes the previous lap time;
    previousLapTime = storeTime[numTimesResetButtonClicked];
  }
  // convert lap time from MS to Hrs:Mins:Secs:MS
  const displayableLapTime = msToTime(lapTiming);
  // Get the split time:
  // record the split time:
  const splitTime = msToTime(cumulativeMS);
  // convert the split time from MS to Hrs: Mins: Secs:MS

  const dataBox1 = document.createElement('div');
  dataBox1.innerText = `Lap time: ${displayableLapTime}`;
  const dataBox2 = document.createElement('div');
  dataBox2.innerText = `Split time: ${splitTime}`;
  const lineBreak = document.createElement('BR');

  lapDataDisplayArea.appendChild(dataBox1);
  lapDataDisplayArea.appendChild(dataBox2);
  lapDataDisplayArea.appendChild(lineBreak);

  numTimesResetButtonClicked += 1;
};

// ===============SETUP THE PAGE==========================

console.log('game initialising...');
const mainDisplayArea = document.createElement('div');
mainDisplayArea.classList.add('mainDisplayArea');
const lapDataDisplayArea = document.createElement('div');
lapDataDisplayArea.classList.add('LapDataDisplayArea');

const ElapsedTimeDisplayArea = document.createElement('div');
ElapsedTimeDisplayArea.classList.add('ElapsedTimeDisplayArea');
// ElapsedTimeDisplayArea.setAttribute('id', 'id\'s name');

const startTimeDisplayArea = document.createElement('button');
startTimeDisplayArea.innerText = 'START';
startTimeDisplayArea.classList.add('startTimeDisplayArea');

const stopTimeDisplayArea = document.createElement('button');
stopTimeDisplayArea.innerText = 'STOP';
stopTimeDisplayArea.classList.add('stopTimeDisplayArea');

const resetTimeDisplayArea = document.createElement('button');
resetTimeDisplayArea.innerText = 'RESET';
resetTimeDisplayArea.classList.add('resetTimeDisplayArea');

const lapTimeDisplayArea = document.createElement('button');
lapTimeDisplayArea.innerText = 'LAP';
lapTimeDisplayArea.classList.add('lapTimeDisplayArea');

mainDisplayArea.appendChild(lapDataDisplayArea);
mainDisplayArea.appendChild(ElapsedTimeDisplayArea);
mainDisplayArea.appendChild(startTimeDisplayArea);
mainDisplayArea.appendChild(stopTimeDisplayArea);
mainDisplayArea.appendChild(resetTimeDisplayArea);
mainDisplayArea.appendChild(lapTimeDisplayArea);
document.body.appendChild(mainDisplayArea);

// ===============GAME FLOW==========================
const gameInit = () => {
  startTimeDisplayArea.addEventListener('click', () => {
    if (canClick === true) {
      clickStart();
    }
  });
  stopTimeDisplayArea.addEventListener('click', clickStop);
  resetTimeDisplayArea.addEventListener('click', clickReset);
  lapTimeDisplayArea.addEventListener('click', clickLapTime);
};
gameInit();
