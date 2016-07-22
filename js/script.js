// var ProgressBar = require('progressbar.js');

var sessionTime = 25;
var sessionTimeSec = sessionTime * 60;
var sessionTimeMil = sessionTime * 60000;
var breakTime = 5;
var breakTimeSec = breakTime * 60;
var breakTimeMil = breakTime * 60000;
var time = sessionTime + ':00';
var interval;

var sessionCircle = new ProgressBar.Circle(timerProgress, {
  strokeWidth: 6,
  duration: sessionTimeMil,
  from: { color: '#FFB300 '},
  to: { color: '#43A047 '},
  step: function(state, bar, attachment) {
    bar.path.setAttribute('stroke', state.color);
  },
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
}); 

function decreaseSessionTime() {
  if (sessionTime > 1) {
    sessionTime = --sessionTime;
    sessionTimeSec = sessionTime * 60;
    sessionTimeMil = sessionTime * 60000;
    time = sessionTime + ':00';
    document.getElementById('sessionTime').textContent = sessionTime;
    document.getElementById('timer').textContent = time;
  } else if (sessionTime === 1) {
    sessionTime = 50;
    sessionTimeSec = sessionTime * 60;
    sessionTimeMil = sessionTime * 60000;
    time = sessionTime + ':00';
    document.getElementById('sessionTime').textContent = sessionTime;
    document.getElementById('timer').textContent = time;
  }
}
function increaseSessionTime() {
  if (sessionTime < 50) {
    sessionTime = ++sessionTime;
    sessionTimeSec = sessionTime * 60;
    sessionTimeMil = sessionTime * 60000;
    time = sessionTime + ':00';
    document.getElementById('sessionTime').textContent = sessionTime;
    document.getElementById('timer').textContent = time;
  } else if (sessionTime === 50) {
    sessionTime = 1;
    sessionTimeSec = sessionTime * 60;
    sessionTimeMil = sessionTime * 60000;
    time = sessionTime + ':00';
    document.getElementById('sessionTime').textContent = sessionTime;
    document.getElementById('timer').textContent = time;
  }
}

function decreaseBreakTime() {
  breakTime = --breakTime;
  breakTimeSec = breakTime * 60;
  breakTimeMil = breakTime * 60000;
  document.getElementById('breakTime').textContent = breakTime;
}
function increaseBreakTime() {
  breakTime = ++breakTime;
  breakTimeSec = breakTime * 60;
  breakTimeMil = breakTime * 60000;
  document.getElementById('breakTime').textContent = breakTime;
}

function startSession() {
  var timer = sessionTimeSec, minutes, seconds;
  var timeDisplay = document.getElementById('timer');
  interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeDisplay.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      startBreak();
    }
  }, 1000);
}

function startBreak() {
  var timer = breakTimeSec, minutes, seconds;
  var timeDisplay = document.getElementById('timer');
  interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeDisplay.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      startSession();
    }
  }, 1000);
}

function start() {
  startSession();
}

function pause() {
  
}

function stop() {
  clearInterval(interval);
}

function ready() {
  var dSessionElem = document.getElementById('decreaseSession');
  dSessionElem.addEventListener("click", function(event) {
      decreaseSessionTime();
  });
  
  var iSessionElem = document.getElementById('increaseSession');
  iSessionElem.addEventListener("click", function(event) {
      increaseSessionTime();
  });
  
  var startElem = document.getElementById('start');
  startElem.addEventListener("click", function(event) {
      start();
  });
  
  var pauseElem = document.getElementById('pause');
  pauseElem.addEventListener("click", function(event) {
      pause();
  });
  
  var stopElem = document.getElementById('stop');
  stopElem.addEventListener("click", function(event) {
      stop();
  });
  
  var dBreakElem = document.getElementById('decreaseBreak');
  dBreakElem.addEventListener("click", function(event) {
      decreaseBreakTime();
  });
  
  var iBreakElem = document.getElementById('increaseBreak');
  iBreakElem.addEventListener("click", function(event) {
      increaseBreakTime();
  });
}

var everythingLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(everythingLoaded);
    ready(); // this is the function that gets called when everything is loaded
  }
}, 10);