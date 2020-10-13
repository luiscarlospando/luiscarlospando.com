(function() {
  // Splitting();

  /* COUNTER */
  // function pad(val) {
  //   var valString = val + "";
  //   if (valString.length < 2) {
  //     return "0" + valString;
  //   } else {
  //     return valString;
  //   }
  // }

  // var totalSeconds = 0;

  // function setTime() {
  //   ++totalSeconds;
  //   document.getElementById("seconds").innerHTML = pad(totalSeconds % 60);
  //   document.getElementById("minutes").innerHTML = pad(parseInt(totalSeconds / 60));
  // }

  // setTimeout(function () {
  //   setInterval(setTime, 1000);
  // }, 10000);

  /* TIME IN FORMAT HH:MM:SS */
  // function checkTime(i) {
  //   if (i < 10) {
  //     i = "0" + i;
  //   }
  //   return i;
  // }

  // setInterval(getTime, 1000);

  // function getTime() {
  //   var today = new Date();
  //   var h = today.getHours();
  //   var m = today.getMinutes();
  //   var s = today.getSeconds();
  //   // add a zero in front of numbers < 10
  //   m = checkTime(m);
  //   s = checkTime(s);
  //   document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
  //   t = setTimeout(function () {
  //     getTime()
  //   }, 500);
  // }
})();