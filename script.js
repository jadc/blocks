const version = "3.1.0";
let now = moment();

const timeFormat = "h:mm:ss a";
const clock = document.getElementById("clock");
let active = true;

(() => {
  document.addEventListener("mouseup", onInteract, false);
  document.addEventListener("touchend", onInteract, false);

  // Version display
  document.getElementById("version").innerHTML = "Version: " + version;
})();

// Animation handler
function onInteract(){

  active = true;
  updateClock();
  clock.className = "animation";

  if(isCCD()) clock.style.color = "#ffff77";
  document.getElementById("version").style.display = "none";

  clock.addEventListener("animationend", () => {

    active = false;
    clock.className = "";
    updateClock();

  }, false);
}

function updateClock(){
  // SET TIME
  now = moment();

  clock.innerHTML = timeUntilNextBlock();
  if(active) setTimeout(updateClock, 100);
}

// Date checkers
function isCCD() {
  let ccdDay = moment(now).endOf("month");
  while(ccdDay.day() !== 4) ccdDay.subtract(1, 'day');
  return (now.format("DD/MM/YYYY") == ccdDay.format("DD/MM/YYYY")) ? true : false;
}

function isMonday() {
  return (now.isoWeekday() == 1) ? true : false;
}

function isWeekend(){
  return (now.isoWeekday() == 6 || now.isoWeekday() == 7) ? true : false;
}

// Time Checkers
function timeUntil(date){
  let dur = moment.utc(date.diff(now));
  let format = "s";

  if(dur.minute() > 0) format = "m:ss";
  if(dur.hour() > 0) format = "h:mm:ss";

  return dur.format(format);
}

function between(before, after){
  return now.isBetween(moment(before, timeFormat), moment(after, timeFormat))
}

// Block checkers
function timeUntilNextBlock(){

  if(isWeekend()) return "No school today";

  if(isMonday()){
    if( between("9:00 am", "10:05 am")  )   return timeUntil(moment("10:05 am", timeFormat));
    if( between("10:05 am", "11:15 am") )   return timeUntil(moment("11:15 am", timeFormat));
    if( between("11:15 am", "12:28 pm") )   return timeUntil(moment("12:28 pm", timeFormat));
    if( between("12:28 pm", "1:13 pm")  )   return timeUntil(moment("1:13 pm", timeFormat));
    if( between("1:13 pm", "2:18 pm")   )   return timeUntil(moment("2:18 pm", timeFormat));
    if( between("2:18 pm", "3:30 pm")   )   return timeUntil(moment("3:30 pm", timeFormat));
  }else if(isCCD()){
    if( between("9:00 am", "9:53 am")   )   return timeUntil(moment("9:53 am", timeFormat));
    if( between("9:53 am", "10:53 am")  )   return timeUntil(moment("10:53 am", timeFormat));
    if( between("10:53 am", "11:53 am") )   return timeUntil(moment("11:53 am", timeFormat));
    if( between("11:53 am", "12:53 pm") )   return timeUntil(moment("12:53 pm", timeFormat));
  }else{
    if( between("9:00 am", "10:22 am")  )   return timeUntil(moment("10:22 am", timeFormat));
    if( between("10:22 am", "11:56 am") )   return timeUntil(moment("11:56 am", timeFormat));
    if( between("11:56 am", "12:39 pm") )   return timeUntil(moment("12:39 pm", timeFormat));
    if( between("12:39 pm", "2:01 pm")  )   return timeUntil(moment("2:01 pm", timeFormat));
    if( between("2:01 pm", "3:30 pm")   )   return timeUntil(moment("3:30 pm", timeFormat));
  }

  // Fallback
  return "School starts in " + timeUntil(moment("3:30 pm", timeFormat).add(17.5, "hours"));
}
