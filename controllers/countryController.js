const axios = require("axios");

const getCountries = async (req, res) => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    //console.log(response);
    const countries = response.data.map((country) => ({
      name: country.name.common,
      capital: country.capital,
      bandera: country.flags.png,
      limite: country.borders ? country.borders : 0,
    }));

    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los países");
  }
};

module.exports = { getCountries };
