const express = require("express");
const app = express();
const countryRoutes = require("./routes/countries");
const gameRoutes = require("./routes/game");
const cors = require("cors");
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/api/countries", countryRoutes);
app.use("/api/game", gameRoutes);
//app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
