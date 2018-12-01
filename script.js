const timeFormat = "h:mm:ss a";
const dateFormat = "MM-DD";

const clock = document.getElementById("clock");
let visible = false;

let target;

(() => {
  blockHandler();
  setClock();
})();

function setClock(){

  // Touch detection
  document.addEventListener("mouseup", addAnimation, false);
  document.addEventListener("touchend", addAnimation, false);

  // Animation listener
  clock.addEventListener("animationend", () => { clock.className = ""; visible = false; },false);

  // Styling
  if(isCCD()) clock.style.color = "#ffff77";
  updateClock();
}

function updateClock(){

  if(visible){
    // Setting time
    clock.innerHTML = target;

    // Set correct target time
    blockHandler();
  }

  // Loop on interval
  setTimeout(updateClock, 1000);
}

function addAnimation(e){
  e.preventDefault();

  if(!visible){
    visible = true;
    clock.className += " animation";
  }

  return false;
}

function isCCD() {
  let today = moment().format(dateFormat);
  let ccdDay = moment().endOf("month").day("Thursday").format(dateFormat);
  return (today == ccdDay) ? true : false;
}

function isMonday() {
  return (moment().isoWeekday() == 1) ? true : false;
}

function isWeekend(){
  return (moment().isoWeekday() == 6 || moment().isoWeekday() == 7) ? true : false;
}

// stackoverflow
function pad(string) {
  var sign = Math.sign(string) === -1 ? '-' : '';
  return sign + new Array(2).concat([Math.abs(string)]).join('0').slice(-2);
}

function timeUntil(date){
  const timeLeft = date.unix() - moment().unix();
  const duration = moment.duration(timeLeft * 1000, 'milliseconds');

  let h = pad(moment.duration(duration).hours());
  let m = pad(moment.duration(duration).minutes());
  let s = pad(moment.duration(duration).seconds());

  console.log(`${h}:${m}:${s} => ${date.format(timeFormat)}`);
  return `${h}:${m}:${s}`;
}

/*

  Monday
  --
  Block 1:    9:00 - 10:05
  MEL Time:   10:09 - 11:15
  Block 2:    11:19 - 12:28
  Lunch:      12:28 - 1:13
  Block 3:    1:13 - 2:18
  Block 4:    2:25 - 3:30

  Not Monday
  --
  Block 1:    9:00 - 10:22
  Block 2:    10:29 - 11:56
  Lunch:      11:56 - 12:39
  Block 3:    12:39 - 2:01
  Block 4:    2:08 - 3:30

  CCD
  --
  Block 1:    9:00 - 9:53
  Block 2:    10:00 - 10:53
  Block 3:    11:01 - 11:53
  Block 4:    12:01 - 12:53
*/

function between(before, after){
  return moment().isBetween(moment(before, timeFormat), moment(after, timeFormat))
}

function blockHandler(){
  target = undefined;

  if(isWeekend()){
    target = "No school today";
    return;
  }

  if(isMonday()){
    if(between("9:00 am", "10:05 am")) target = timeUntil(moment("10:05 am", timeFormat));
    if(between("10:05 am", "11:15 am")) target = timeUntil(moment("11:15 am", timeFormat));
    if(between("11:15 am", "12:28 pm")) target = timeUntil(moment("12:28 pm", timeFormat));
    if(between("12:28 pm", "1:13 pm")) target = timeUntil(moment("1:13 pm", timeFormat));
    if(between("1:13 pm", "2:18 pm")) target = timeUntil(moment("2:18 pm", timeFormat));
    if(between("2:18 pm", "3:30 pm")) target = timeUntil(moment("3:30 pm", timeFormat));
  }else if(isCCD()){
    if(between("9:00 am", "9:53 am")) target = timeUntil(moment("9:53 am", timeFormat));
    if(between("9:53 am", "10:53 am")) target = timeUntil(moment("10:53 am", timeFormat));
    if(between("10:53 am", "11:53 am")) target = timeUntil(moment("11:53 am", timeFormat));
    if(between("11:53 am", "12:53 pm")) target = timeUntil(moment("12:53 pm", timeFormat));
  }else{
    if(between("9:00 am", "10:22 am")) target = timeUntil(moment("10:22 am", timeFormat));
    if(between("10:22 am", "11:56 am")) target = timeUntil(moment("11:56 am", timeFormat));
    if(between("11:56 am", "12:39 pm")) target = timeUntil(moment("12:39 pm", timeFormat));
    if(between("12:39 pm", "2:01 pm")) target = timeUntil(moment("2:01 pm", timeFormat));
    if(between("2:01 pm", "3:30 pm")) target = timeUntil(moment("3:30 pm", timeFormat));
  }

  // Fallback
  if(target == undefined) target = "After school";
}
