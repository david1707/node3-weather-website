const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const location = search.value;

  fetch(`/weather?address=${location}`)
    .then((response) =>
      response.json().then((data) => {
        if (data.error) console.log(data.error);
        else {
          const forecast = data.forecast;
          messageOne.textContent = `At ${
            data.location.split(", ")[0]
          } the current temperature is ${
            forecast.temperature
          }º, but it feels like ${forecast.feelslike}º\nThe chance of rain is ${
            forecast.precip
          }% and the wind speed is ${forecast.wind_speed} km/h. The sky is ${
            forecast.weatherDescription
          }.`;
          messageTwo.textContent = data.location;
        }
      })
    )
    .catch((err) => console.log(err));
});
