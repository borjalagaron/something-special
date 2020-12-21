const newYears = "1 Jan 2021";

function countDown() {
  const newYearsDate = new Date(newYears);
  const currentDate = new Date();

  console.log(newYearsDate - currentDate);
}

countDown();