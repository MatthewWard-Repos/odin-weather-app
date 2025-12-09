import "./styles.css";

let API_KEY = "BA3KZ8RM6CGG7T2P5MEVNX9KG";

const fetchWeather = async function (location) {
  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=${API_KEY}&contentType=json`,
    );
    const weather = await res.json();
    console.log(weather);
  } catch {
    console.log(Error);
  }
};
window.fetchWeather = fetchWeather;
