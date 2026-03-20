export {
  createResultDivs,
  listenTempType,
  setUnitGroup,
  unitGroup,
  setUnits,
  createElement,
};

const celsius = "°C";
const farenheit = "°F";
const millimetres = "mm";
const inches = "in";
let tempType = celsius;
let rainType = millimetres;

let unitGroup = "uk";
const US = "us";
const UK = "uk";
// const metric = "metric";

const keys = [
  "location",
  "description",
  "conditions",
  "temperature",
  "feels-like",
  "precipitation",
];

const createElement = function (className, content) {
  const newDiv = document.createElement("div");
  className ? newDiv.classList.add(className) : "";
  newDiv.textContent = content;
  return newDiv;
};

const createResultDivs = function (parent) {
  keys.forEach((key) => {
    parent.appendChild(createElement(`${key}-div`, ""));
  });
};
const listenTempType = function () {
  const tempCheckbox = document.querySelector(".temp-checkbox");

  tempCheckbox.addEventListener("change", () => {
    if (tempCheckbox.checked) {
      tempType = farenheit;
      rainType = inches;
    } else {
      tempType = celsius;
      rainType = millimetres;
    }
  });
};

const setUnitGroup = function () {
  if (tempType === celsius) {
    unitGroup = UK;
  } else {
    unitGroup = US;
  }
  return unitGroup;
};

const setUnits = function () {
  const location = document.querySelector(".location-div");
  const description = document.querySelector(".description-div");
  const conditions = document.querySelector(".conditions-div");
  const temperature = document.querySelector(".temperature-div");
  const feelsLike = document.querySelector(".feels-like-div");
  const precipitation = document.querySelector(".precipitation-div");

  location.appendChild(createElement("unit-div", "Location:"));
  description.appendChild(createElement("unit-div", "Description:"));
  conditions.appendChild(createElement("unit-div", "Conditions:"));
  temperature.appendChild(
    createElement("unit-div", `Temperature (${tempType}):`),
  );
  feelsLike.appendChild(createElement("unit-div", `Feels Like (${tempType}):`));
  precipitation.appendChild(
    createElement("unit-div", `Precipitation (${rainType}):`),
  );
};
