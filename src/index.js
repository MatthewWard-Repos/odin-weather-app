import "./styles.css";
import {
  createResultDivs,
  listenTempType,
  setUnitGroup,
  unitGroup,
  setUnits,
  createElement,
} from "./template.js";

let API_KEY = "BA3KZ8RM6CGG7T2P5MEVNX9KG";

const form = document.querySelector("#form-weather");
const searchBar = document.querySelector("#search");
const resetDiv = document.querySelector(".reset");
const resultsBox = document.getElementById("results-box");
const tempToggle = document.querySelector(".temp-toggle");

const fetchWeather = async function (location) {
  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&elements=remove%3Acloudcover%2Cremove%3Adatetime%2Cremove%3AdatetimeEpoch%2Cremove%3Adew%2Cremove%3Afeelslikemax%2Cremove%3Afeelslikemin%2Cremove%3Aprecipcover%2Cremove%3Apressure%2Cremove%3Asolarenergy%2Cremove%3Asolarradiation%2Cremove%3Avisibility&key=${API_KEY}&contentType=json`,
    );
    const json = await res.json();
    return returnWeather(json);
  } catch {
    console.log(Error);
    return null;
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
const displayWeather = function (weatherObj) {
  resultsBox.innerHTML = "";
  resultsBox.style.display = "flex";
  createResultDivs(resultsBox);
  setUnits();
  form.style.display = "none";
  tempToggle.style.display = "none";
  resetDiv.classList.remove("hidden");
  Object.entries(weatherObj).forEach(([key, val], index) => {
    const child = resultsBox.childNodes[index];
    if (!child) return;
    let valCapitalised =
      val.toString().slice(0, 1).toUpperCase() + val.toString().slice(1);
    child.appendChild(createElement(key, valCapitalised));
  });
};

const listenSearch = function () {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setUnitGroup();
    const weather = await fetchWeather(searchBar.value);
    displayWeather(weather);
  });
};
const listenReset = function () {
  resetDiv.addEventListener("click", () => {
    resetSearch();
  });
};

const resetSearch = function () {
  resetDiv.classList.add("hidden");
  resultsBox.style.display = "none";
  form.style.display = "block";
  tempToggle.style.display = "flex";
  searchBar.value = "";
};

listenSearch();
listenTempType();
listenReset();
window.fetchWeather = fetchWeather;
