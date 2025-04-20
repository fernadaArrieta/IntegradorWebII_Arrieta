const express = require("express");
const app = express();
const countryRoutes = require("./routes/countries");
const PORT = 3000;

app.use(express.json());
app.use("/api/countries", countryRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
