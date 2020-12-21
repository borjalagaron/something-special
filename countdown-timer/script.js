const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secsEl = document.getElementById("secs");

function countdown() {
  const currentDate = new Date();
  const newYearsDate = new Date("1 Jan " + (currentDate.getFullYear()+1));

  const diffDate = newYearsDate - currentDate;

  const months = Math.floor((diffDate / (1000 * 60 * 60 * 24 * 365)) % 12);
  const days = Math.floor((diffDate / (1000 * 60 * 60 * 24)) % 365);
  const hours = Math.floor((diffDate / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diffDate / (1000 * 60)) % 60);
  const secs = Math.floor((diffDate / 1000) % 60);

  monthsEl.innerHTML = months;
  daysEl.innerHTML = days;
  hoursEl.innerHTML = hours;
  minsEl.innerHTML = mins;
  secsEl.innerHTML = secs;
}

// initial call
countdown();

setInterval(countdown, 1000);
