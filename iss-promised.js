const needle = require('needle');

const fetchMyIP = function () {
  return needle('get', 'https://api.ipify.org?format=json')
    .then(response => response.body.ip);
};

const fetchCoordsByIP = function (ip) {
  const url = `https://ipwho.is/${ip}`;
  return needle('get', url)
    .then(response => {
      if (!response.body.success) {
        throw new Error(`Failed to get coordinates. Reason: ${response.body.message}`);
      }
      const { latitude, longitude } = response.body;
      return { latitude, longitude };
    });
};

const fetchISSFlyOverTimes = function (coords) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return needle('get', url)
    .then(response => response.body.response);
};

// ✅ DEFINE THIS BEFORE EXPORTING
const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes);
};

// ✅ EXPORT AFTER THE FUNCTION EXISTS
module.exports = { nextISSTimesForMyLocation };