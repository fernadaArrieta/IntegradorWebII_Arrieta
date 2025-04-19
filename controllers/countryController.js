const axios = require("axios");

const getCountries = async (req, res) => {
  const response = await axios.get("https://restcountries.com/");
};

module.exports = { getCountries };
