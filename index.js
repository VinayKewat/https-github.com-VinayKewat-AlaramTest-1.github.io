console.log("app is online");
// make an element variable of seconds


// country name for setting offset 
cities = [
  { name: "manila", offset: 8 },
  { name: "paris", offset: 2 },
  { name: "new-york", offset: -4 }
];


// this is declare for current time 
function computeCurrentTime(offset) {
  let now = new Date();
  let localOffset = now.getTimezoneOffset() * 60000;
  let currentUTC = now.getTime() + localOffset;
  let currentTime = currentUTC + offset * 3600000;
  return new Date(currentTime);
}

// getInititalTime();
timers = [];

// here is liitle bit JSON is use for query selector 
function activateClock(city, offset) {
  let longhand = document.querySelector(`#longhand__${city}`);
  let minuteHand = document.querySelector(`#minuteHand__${city}`);
  let hourHand = document.querySelector(`#hourHand__${city}`);

  //  set the current time
  let dateTime_elem = document.querySelector(`.dateTimeText__${city}`);
  let intitalTime = computeCurrentTime(offset);
  rotateHand(intitalTime.getSeconds(), longhand, 6);
  rotateHand(intitalTime.getMinutes(), minuteHand, 6);
  rotateHand(intitalTime.getHours(), hourHand, 30);

  // update the time every seconds
  console.log(city);
  let interval = setInterval(updateTime, 1000);
  function updateTime() {
    let now = computeCurrentTime(offset);
    let dateTime_text = now.toLocaleTimeString();
    let sec = now.getSeconds();
    dateTime_elem.textContent = dateTime_text;

    if (sec == 0) rotateHand(now.getMinutes(), minuteHand, 6);

    let min = now.getMinutes();
    if (min == 0) rotateHand(now.getHours(), hourHand, 30);

    rotateHand(sec, longhand, 6);
  }
  timers.push(interval);
}

activateClock(cities[2].name, cities[2].offset);
activateClock(cities[0].name, cities[0].offset);
activateClock(cities[1].name, cities[1].offset);



function rotateHand(time, element, multiplier) {
  console.log(multiplier);
  if (time == 0) {
    element.setAttribute("style", `transform:rotate(0deg)`);
  } else {
    element.setAttribute("style", `transform:rotate(${time * multiplier}deg)`);
  }
}


// step two 2 here is currectime is declare 

const currentTime = document.querySelector("#current-time");
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const setAlarmButton = document.querySelector("#submitButton");
const alarmContainer = document.querySelector("#alarms-container");



// Adding Hours, Minutes, Seconds in DropDown Menu
window.addEventListener("DOMContentLoaded", (event) => {
  
  dropDownMenu(1, 12, setHours);
 
  dropDownMenu(0, 59, setMinutes);

  dropDownMenu(0, 59, setSeconds);

  setInterval(getCurrentTime, 1000);
  fetchAlarm();
});



// Event Listener added to Set Alarm Button
setAlarmButton.addEventListener("click", getInput);


function dropDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}

// fetch our time as numeric form 
function getCurrentTime() {
  let time = new Date();
  time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  currentTime.innerHTML = time;

  return time;
}


// here getting out input 
function getInput(e) {
  e.preventDefault();
  const hourValue = setHours.value;
  const minuteValue = setMinutes.value;
  const secondValue = setSeconds.value;
  const amPmValue = setAmPm.value;

  const alarmTime = convertToTime(
    hourValue,
    minuteValue,
    secondValue,
    amPmValue
  );
  setAlarm(alarmTime);
}


// Converting time to 24 hour format
function convertToTime(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}


// setting our alarm 
function setAlarm(time, fetching = false) {
  const alarm = setInterval(() => {
    if (time === getCurrentTime()) {
      alert("Alarm Ringing");
    }
    console.log("running");
  }, 500);

  addAlaramToDom(time, alarm);
  if (!fetching) {
    saveAlarm(time);
  }
}

// Alarms set by user Dislayed in HTML
function addAlaramToDom(time, intervalId) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.innerHTML = `
              <div class="time">${time}</div>
              <button class="btn delete-alarm" data-id=${intervalId}>Delete</button>
              `;
  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));

  alarmContainer.prepend(alarm);
}

// Is alarms saved in Local Storage?
function checkAlarams() {
  let alarms = [];
  const isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);

  return alarms;
}

// save alarm is declare here 
function saveAlarm(time) {
  const alarms = checkAlarams();

  alarms.push(time);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

// Fetching alarms from storage
function fetchAlarm() {
  const alarms = checkAlarams();

  alarms.forEach((time) => {
    setAlarm(time, true);
  });
}

// deleting alaram is declare here 
function deleteAlarm(event, time, intervalId) {
  const self = event.target;

  clearInterval(intervalId);

  const alarm = self.parentElement;
  console.log(time);

  deleteAlarmFromLocal(time);
  alarm.remove();
}

// this is use for deleting our alarm from our container box

function deleteAlarmFromLocal(time) {
  const alarms = checkAlarams();

  const index = alarms.indexOf(time);
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}


// calender code 


// setting the format of calender 
var Calendar = function(t) {
  this.divId = t.RenderID ? t.RenderID : '[data-render="calendar"]', this.DaysOfWeek = t.DaysOfWeek ? t.DaysOfWeek : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], this.Months = t.Months ? t.Months : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var e = new Date;
  this.CurrentMonth = e.getMonth(), this.CurrentYear = e.getFullYear();
  var r = t.Format;
  this.f = "string" == typeof r ? r.charAt(0).toUpperCase() : "M"
};



// all thing for calender iss declare here  this declare by a name 


// define anchor for if u click > next butten it reach u next month 
Calendar.prototype.nextMonth = function() {
  11 == this.CurrentMonth ? (this.CurrentMonth = 0, this.CurrentYear = this.CurrentYear + 1) : this.CurrentMonth = this.CurrentMonth + 1, this.divId = '[data-active="false"] .render', this.showCurrent()
}, //  define anchor for if u click < previous button then it reach u previous section 
Calendar.prototype.prevMonth = function() {
  0 == this.CurrentMonth ? (this.CurrentMonth = 11, this.CurrentYear = this.CurrentYear - 1) : this.CurrentMonth = this.CurrentMonth - 1, this.divId = '[data-active="false"] .render', this.showCurrent()
}, Calendar.prototype.previousYear = function() {
  this.CurrentYear = this.CurrentYear - 1, this.showCurrent()
}, Calendar.prototype.nextYear = function() {
  this.CurrentYear = this.CurrentYear + 1, this.showCurrent()
}, Calendar.prototype.showCurrent = function() {
  this.Calendar(this.CurrentYear, this.CurrentMonth)
}, Calendar.prototype.checkActive = function() {
  1 == document.querySelector(".months").getAttribute("class").includes("active") ? document.querySelector(".months").setAttribute("class", "months") : document.querySelector(".months").setAttribute("class", "months active"), "true" == document.querySelector(".month-a").getAttribute("data-active") ? (document.querySelector(".month-a").setAttribute("data-active", !1), document.querySelector(".month-b").setAttribute("data-active", !0)) : (document.querySelector(".month-a").setAttribute("data-active", !0), document.querySelector(".month-b").setAttribute("data-active", !1)), setTimeout(function() {
      document.querySelector(".calendar .header").setAttribute("class", "header active")
  }, 200), document.querySelector("body").setAttribute("data-theme", this.Months[document.querySelector('[data-active="true"] .render').getAttribute("data-month")].toLowerCase())
}, Calendar.prototype.Calendar = function(t, e) {
  "number" == typeof t && (this.CurrentYear = t), "number" == typeof t && (this.CurrentMonth = e);
  var r = (new Date).getDate(),
      n = (new Date).getMonth(),
      a = (new Date).getFullYear(),
      o = new Date(t, e, 1).getDay(),
      i = new Date(t, e + 1, 0).getDate(),
      u = 0 == e ? new Date(t - 1, 11, 0).getDate() : new Date(t, e, 0).getDate(),
      s = "<span>" + this.Months[e] + " &nbsp; " + t + "</span>",
      d = '<div class="table">';
  d += '<div class="row head">';
  for (var c = 0; c < 7; c++) d += '<div class="cell">' + this.DaysOfWeek[c] + "</div>";
  d += "</div>";
  for (var h, l = dm = "M" == this.f ? 1 : 0 == o ? -5 : 2, v = (c = 0, 0); v < 6; v++) {
      d += '<div class="row">';
      for (var m = 0; m < 7; m++) {
          if ((h = c + dm - o) < 1) d += '<div class="cell disable">' + (u - o + l++) + "</div>";
          else if (h > i) d += '<div class="cell disable">' + l++ + "</div>";
          else {
              d += '<div class="cell' + (r == h && this.CurrentMonth == n && this.CurrentYear == a ? " active" : "") + '"><span>' + h + "</span></div>", l = 1
          }
          c % 7 == 6 && h >= i && (v = 10), c++
      }
      d += "</div>"
  }
  d += "</div>", document.querySelector('[data-render="month-year"]').innerHTML = s, document.querySelector(this.divId).innerHTML = d, document.querySelector(this.divId).setAttribute("data-date", this.Months[e] + " - " + t), document.querySelector(this.divId).setAttribute("data-month", e)
}, window.onload = function() {
  var t = new Calendar({
      RenderID: ".render-a",
      Format: "M"
  });
  t.showCurrent(), t.checkActive();
  var e = document.querySelectorAll(".header [data-action]");
  for (i = 0; i < e.length; i++) e[i].onclick = function() {
      if (document.querySelector(".calendar .header").setAttribute("class", "header"), "true" == document.querySelector(".months").getAttribute("data-loading")) return document.querySelector(".calendar .header").setAttribute("class", "header active"), !1;
      var e;
      document.querySelector(".months").setAttribute("data-loading", "true"), this.getAttribute("data-action").includes("prev") ? (t.prevMonth(), e = "left") : (t.nextMonth(), e = "right"), t.checkActive(), document.querySelector(".months").setAttribute("data-flow", e), document.querySelector('.month[data-active="true"]').addEventListener("webkitTransitionEnd", function() {
          document.querySelector(".months").removeAttribute("data-loading")
      }), document.querySelector('.month[data-active="true"]').addEventListener("transitionend", function() {
          document.querySelector(".months").removeAttribute("data-loading")
      })
  }
};



// this all is decla
