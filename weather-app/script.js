const apikey = "3265874a2c77ae404bb96236a642d2f";

const url = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

async function getWeatherByLocation(location) {
  const resp = await fetch(url(location), { origin: "cors" });
  const respData = await resp.json();
  console.log(respData);
}

getWeatherByLocation("Stuttgart");
