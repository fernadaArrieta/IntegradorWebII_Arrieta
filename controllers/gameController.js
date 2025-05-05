const axios = require("axios");

let cachedCountries = [];

async function getCountriesData() {
  if (cachedCountries.length === 0) {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    cachedCountries = response.data.map((country) => ({
      name: country.name.common,
      capital: country.capital?.[0] || "Sin capital",
      flag: country.flags?.png || "",
      borders: country.borders?.length || 0,
    }));
  }
  return cachedCountries;
}

function getRandomElements(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const getQuestion = async (req, res) => {
  try {
    const countries = await getCountriesData();
    const questionTypes = ["capital", "flag", "borders"];
    const selectedType =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    const correct = countries[Math.floor(Math.random() * countries.length)];
    let pregunta, respuestaCorrecta;

    switch (selectedType) {
      case "capital":
        pregunta = `¿Cuál es el país de la siguiente ciudad capital: ${correct.capital}?`;
        respuestaCorrecta = correct.name;
        break;
      case "flag":
        pregunta = `¿Qué país está representado por esta bandera?`;
        respuestaCorrecta = correct.name;
        break;
      case "borders":
        pregunta = `¿Cuántos países limítrofes tiene ${correct.name}?`;
        respuestaCorrecta = correct.borders.toString();
        break;
    }

    let options = [respuestaCorrecta];
    while (options.length < 4) {
      const option =
        selectedType === "borders"
          ? countries[
              Math.floor(Math.random() * countries.length)
            ].borders.toString()
          : countries[Math.floor(Math.random() * countries.length)].name;

      if (!options.includes(option)) {
        options.push(option);
      }
    }

    res.json({
      tipoDePregunta: selectedType,
      preguntas: pregunta,
      respuestaCorrecta,
      options: options.sort(() => 0.5 - Math.random()),
      flagUrl: selectedType === "flag" ? correct.flag : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generando la pregunta");
  }
};

module.exports = { getQuestion };
