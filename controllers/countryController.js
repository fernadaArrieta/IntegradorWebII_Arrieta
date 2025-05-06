const axios = require("axios");

const getCountries = async (req, res) => {
  try {
    console.log("Petición a /countries recibida");
    const response = await axios.get("https://restcountries.com/v3.1/all");
    console.log("Respuesta de la API externa recibida:", response.status);

    /*   // Loguea la estructura del primer país (ya lo hiciste, puedes mantenerlo)
    if (response.data && response.data.length > 0) {
      console.log("Estructura del primer país:", response.data[0]);
    }
 */
    const countries = response.data.map((country, index) => {
      console.log(`Procesando país ${index}:`, country.name.common); // Verifica que se esté iterando
      return {
        name: country.name.common,
        capital: country.capital?.[0] || "Sin capital",
        bandera: country.flags?.png || "",
        limite: country.borders ? country.borders.length : 0,
      };
    });
    //console.log("Datos de países formateados:", countries.length);
    res.setHeader("Content-Type", "application/json");
    res.json(countries);
    console.log("Respuesta JSON enviada:", JSON.stringify(countries));
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Error al obtener los países" });
  }
};

module.exports = { getCountries };
