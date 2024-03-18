const request = require("request");

const getWeather = (Latitude, Longitude, callback) => {
  const url1 = `http://api.weatherapi.com/v1/current.json?key=4b8d5f39496548efa16153924242602&q=${Latitude},${Longitude}`;

  request({ url: url1, json: true }, (error, response) => {
    if (error) callback("server is disable", undefined);
    else if (response.body.error)
      callback(response.body.error.message, undefined);
    else {
      callback(
        undefined,
        `The Wether: ${response.body.current.condition.text},   The Country Name: ${response.body.location.name},   The temp is: ${response.body.current.temp_c}`
      );
    }
  });
};
module.exports = getWeather;
