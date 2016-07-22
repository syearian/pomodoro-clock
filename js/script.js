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
}
function increaseSessionTime() {
  sessionTime++;
}

function decreaseBreakTime() {
  breakTime--;
}
function increaseBreakTime() {
  breakTime++;
}

function startSession() {

}

function startBreak() {
  
}

function play() {
  
}

function pause() {
  
}

function stop() {
  
}