/*jshint maxerr: 1000 */
/*global isPLC dater formatDate setText isUnusual getNextTime*/

function start(endDate) {
  if (window.stopID) {
    clearTimeout(window.stopID);
  }

  var today = dater();
  window.PLC = isPLC(today);

  window.delay = 0;
  if (window.location.hostname == 'www.countdownlhs.ga') {
    if (localStorage.getItem('delay')) {
      window.delay = parseInt(localStorage.getItem('delay'));
    }
  }

  dayMessage = 'Today is ' + formatDate(dater()) + ', ';

  if (endDate) {
    alert('Custom countdown set!');
    var dayMessage = dayMessage + 'and you are running a custom countdown.';
    setText(dayMessage, 'date');
    window.stopID = setTimeout(loop, 1000, endDate, ' until date');
    return;
  }

  var normalSchedule = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [[45, 'until warning bell'], [50, 'until period 1']],
    [[40, 'left in period 1'], [44, 'until period 2']],
    [[34, 'left in period 2'], [38, 'until period 3']],
    [[28, 'left in period 3'], [32, 'until period 4']],
    [[22, 'left in period 4'], [26, 'until lunch A'], [51, 'left in lunch A'], [55, 'until lunch B']],
    [[20, 'left in lunch B'], [24, 'until lunch C'], [49, 'left in lunch C'], [53, 'until period 6']],
    [[43, 'left in period 6'], [47, 'until period 7']],
    [[37, 'left in period 7']],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  var plcSchedule = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [[45, 'until warning bell'], [50, 'until period 1']],
    [[33, 'left in period 1'], [37, 'until period 2']],
    [[20, 'left in period 2'], [24, 'until period 3']],
    [[7, 'left in period 3'], [11, 'until period 4'], [54, 'left in period 4'], [58, 'until lunch A']],
    [[23, 'left in lunch A'], [27, 'until lunch B'], [52, 'left in lunch B'], [56, 'until lunch C']],
    [[21, 'left in lunch C'], [25, 'until period 6']],
    [[7, 'left in period 6'], [11, 'until period 7'], [53, 'left in period 7']],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  // var exampleSchedule = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

  var schedule = window.PLC ? plcSchedule : normalSchedule;

  if (today.getDay() === 6 || today.getDay() === 0) {
    alert('It\'s the weekend. Why are you here?');
    dayMessage = dayMessage + 'and it is the weekend.';
    setText(dayMessage, 'date');
    return;
  } else if (isUnusual(today)) {
    alert('Today is an unusual day. Countdown won\'t work today. Sorry!');
    dayMessage = dayMessage + 'and it is a unusual day.';
    setText(dayMessage, 'date');
    return;
  } else if (window.PLC) {
    alert('Today is a PLC day. Hurray!');
    dayMessage = dayMessage + 'and it is a PLC day.';
    setText(dayMessage, 'date');
    schedule = window.plcSchedule;
    startTimer(schedule);
    return;
  } else {
    dayMessage = dayMessage + 'and it is a regular weekday.';
    setText(dayMessage, 'date');
    startTimer(schedule);
  }
}

function startTimer(schedule) {
  var now = dater();
  var scheduleArray = getNextTime(schedule, now.getHours(), now.getMinutes());
  var endTime = createDate(scheduleArray[0], scheduleArray[1], scheduleArray[3]);
  window.stopID = setTimeout(loop, 1000, endTime, scheduleArray[2]);
}

function createDate(hour, minute, nextDay) {
  var createdDate = dater();
  createdDate.setSeconds(0);
  createdDate.setHours(hour);
  createdDate.setMinutes(minute);
  if (nextDay) createdDate.setDate(createdDate.getDate() + 1);
  return createdDate;
}

function loop(endDate, message) {
  var now = dater();
  var diff = endDate - now;

  var days = Math.floor(diff / (1000 * 3600 * 24));
  var hours = Math.floor(diff / 3.6e6 - days * 24);
  var minutes = Math.floor((diff % 3.6e6) / 6e4);
  var seconds = Math.floor((diff % 6e4) / 1000);
  if (seconds < 0) {
    start();
    return;
  }
  var timeLeft = days + ':' + ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
  if (days === 0) {
    timeLeft = timeLeft.substring(2);
    if (hours === 0) timeLeft = timeLeft.substring(3);
  }

  setText(timeLeft + ' ' + message, 'title');
  setText(timeLeft, 'clock');
  window.stopID = setTimeout(loop, 1000, endDate, message);
}

start();
