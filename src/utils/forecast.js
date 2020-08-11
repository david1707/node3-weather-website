const request = require("request");

const forecast = (lat, long, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=ab4d98b2b897e9bc92c95816b32ed6cd&query=${lat},${long}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      cb("Unable to find location: Wrong coordinates", undefined);
    } else {
      const { temperature, feelslike } = body.current;
      const weatherDescription = body.current.weather_descriptions[0];
      cb(undefined, {
        temperature,
        feelslike,
        weatherDescription: weatherDescription,
      });
    }
  });
};

module.exports = forecast;
