const clock = document.getElementById('realtime-clock');

function createRealtimeClock() {
  let time = new Date();

  let timeHours =
    time.getHours() > 12
      ? `0${time.getHours() - 12}`.slice(-2)
      : `${time.getHours()}`;
  let timeMinutes = `0${time.getMinutes()}`.slice(-2);
  let timeSeconds = `0${time.getSeconds()}`.slice(-2);
  let amPm = time.getHours() >= 12 ? 'PM' : 'AM';

  let liveTime = `${timeHours} : ${timeMinutes} : ${timeSeconds} ${amPm}`;

  document.getElementById('realtime-clock').firstElementChild.textContent =
    liveTime;
}

setInterval(createRealtimeClock, 1000);
