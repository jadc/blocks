(() => {
  updateClock();
})();

function updateClock(){
  let now = new Date().toLocaleTimeString().slice(0,-3);

  document.getElementById("clock").innerHTML = now;
  setTimeout(updateClock, 1000);
}
