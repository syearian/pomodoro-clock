var sessionTime = 25;
var sessionTimeSec = sessionTime * 60;
var sessionTimeMil = sessionTime * 60000;
var breakTime = 5;
var breakTimeSec = breakTime * 60;
var breakTimeMil = breakTime * 60000;
var interval;
var sessionEndSound = new Audio('assets/Store_Door_Chime-Mike_Koenig-570742973.mp3');
var breakEndSound = new Audio('assets/Car Door Open And Alarm-SoundBible.com-1790760048.mp3');

var circle = new ProgressBar.Circle(timerProgress, {
  strokeWidth: 6,
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
    document.getElementById('sessionTime').textContent = sessionTime;
    document.getElementById('timer').textContent = sessionTime + ':00';
  } else if (sessionTime === 1) {
    sessionTime = 50;
    sessionTimeSec = sessionTime * 60;
    sessionTimeMil = sessionTime * 60000;
    document.getElementById('sessionTime').textContent = sessionTime;
    document.getElementById('timer').textContent = sessionTime + ':00';
  }
}
function increaseSessionTime() {
  if (sessionTime < 50) {
    sessionTime = ++sessionTime;
    sessionTimeSec = sessionTime * 60;
    sessionTimeMil = sessionTime * 60000;
    document.getElementById('sessionTime').textContent = sessionTime;
    document.getElementById('timer').textContent = sessionTime + ':00';
  } else if (sessionTime === 50) {
    sessionTime = 1;
    sessionTimeSec = sessionTime * 60;
    sessionTimeMil = sessionTime * 60000;
    document.getElementById('sessionTime').textContent = sessionTime;
    document.getElementById('timer').textContent = sessionTime + ':00';
  }
}

function decreaseBreakTime() {
  if (breakTime > 1) {    
    breakTime = --breakTime;
    breakTimeSec = breakTime * 60;
    breakTimeMil = breakTime * 60000;
    document.getElementById('breakTime').textContent = breakTime;
  } else if (breakTime === 1) {
    breakTime = 10;
    breakTimeSec = breakTime * 60;
    breakTimeMil = breakTime * 60000;
    document.getElementById('breakTime').textContent = breakTime;
  }
}
function increaseBreakTime() {
  if (breakTime < 10) {
    breakTime = ++breakTime;
    breakTimeSec = breakTime * 60;
    breakTimeMil = breakTime * 60000;
    document.getElementById('breakTime').textContent = breakTime;
  } else if (breakTime === 10) {
    breakTime = 1;
    breakTimeSec = breakTime * 60;
    breakTimeMil = breakTime * 60000;
    document.getElementById('breakTime').textContent = breakTime;
  }
}

function startSession() {
  var timer = sessionTimeSec, minutes, seconds;
  var timeDisplay = document.getElementById('timer');
  var opts = {
    duration: sessionTimeMil,
    from: { color: '#FFB300 '},
    to: { color: '#43A047 '}
  }
  interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timeDisplay.textContent = minutes + ":" + seconds;
    if (--timer < 0) {
      sessionEndSound.play();
      circle.set(0);
      clearInterval(interval);
      startBreak();
    }
  }, 1000);
  circle.animate(1, opts);
}

function startBreak() {
  var timer = breakTimeSec, minutes, seconds;
  var timeDisplay = document.getElementById('timer');
  var opts = {
    duration: breakTimeMil,
    from: { color: '#43A047'},
    to: { color: '#FFB300'}
  }
  interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeDisplay.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      breakEndSound.play();
      circle.set(0);
      clearInterval(interval);
      startSession();
    }
  }, 1000);
  circle.animate(1, opts);
}

function start() {
  startSession();
}

function stop() {
  clearInterval(interval);
  circle.set(0);
  document.getElementById('timer').textContent = sessionTime + ':00';
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