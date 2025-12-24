import "./styles.css";

let API_KEY = "BA3KZ8RM6CGG7T2P5MEVNX9KG";

const form = document.querySelector("form");
const searchBar = document.querySelector("#search");

const fetchWeather = async function (location) {
  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&elements=remove%3Acloudcover%2Cremove%3Adatetime%2Cremove%3AdatetimeEpoch%2Cremove%3Adew%2Cremove%3Afeelslikemax%2Cremove%3Afeelslikemin%2Cremove%3Aprecipcover%2Cremove%3Apressure%2Cremove%3Asolarenergy%2Cremove%3Asolarradiation%2Cremove%3Avisibility&key=${API_KEY}&contentType=json`,
    );
    const json = await res.json();
    returnWeather(json);
  } catch {
    console.log(Error);
  }
};

const returnWeather = async function (data) {
  const {
    resolvedAddress,
    description,
    currentConditions: { conditions, temp, feelslike, precip },
  } = data;
  const locationWeather = {
    resolvedAddress,
    description,
    conditions,
    temp,
    feelslike,
    precip,
  };
  console.log(locationWeather);
  return locationWeather;
};

console.log(searchBar);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(searchBar.value);
  fetchWeather(searchBar.value);
});
window.fetchWeather = fetchWeather;
