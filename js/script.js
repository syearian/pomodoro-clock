var ProgressBar = require('progressbar.js');

var sessionTime = 25;
var sessionMil = sessionTime * 60000;
var breakTime = 5;
var breakMil = breakTime * 60000;
var timer = sessionTime + ':00';

var sessionCircle = new ProgressBar.Circle(timerProgress, {
  strokeWidth: 6,
  duration: sessionMil,
  from: { color: '#FFB300 '},
  to: { color: '#43A047 '},
  step: function(state, bar, attachment) {
    bar.path.setAttribute('stroke', state.color);
  },
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});
var breakCircle = new ProgressBar.Circle(timerProgress, {
  strokeWidth: 6,
  duration: breakMil,
  from: { color: '#43A047 '},
  to: { color: '#FFB300 '},
  step: function(state, bar, attachment) {
    bar.path.setAttribute('stroke', state.color);
  },
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});

function decreaseSessionTime() {
  sessionTime--;
  document.getElementById('breakTime').innerText(sessionTime);
}
function increaseSessionTime() {
  sessionTime++;
  document.getElementById('breakTime').innerText(sessionTime);
}

function decreaseBreakTime() {
  breakTime--;
  document.getElementById('breakTime').innerText(breakTime);
}
function increaseBreakTime() {
  breakTime++;
  document.getElementById('breakTime').innerText(breakTime);
}

function startSession() {

}

function startBreak() {
  
}

function start() {
  
}

function pause() {
  
}

function stop() {
  
}

function ready() {
  document.getElementById('decreaseSession').addEventListener("click", function(event) {
      decreaseSessionTime();
  });
  
  document.getElementById('increaseSession').addEventListener("click", function(event) {
      increaseSessionTime();
  });
  
  document.getElementById('start').addEventListener("click", function(event) {
      decreaseBreakTime();
  });
  
  document.getElementById('pause').addEventListener("click", function(event) {
      increaseBreakTime();
  });
  
  document.getElementById('stop').addEventListener("click", function(event) {
      start();
  });
  
  document.getElementById('decreaseBreak').addEventListener("click", function(event) {
      pause()
  });
  
  document.getElementById('increaseBreak').addEventListener("click", function(event) {
      stop();
  });
}

var everythingLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(everythingLoaded);
    ready(); // this is the function that gets called when everything is loaded
  }
}, 10);