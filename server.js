const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const countryRoutes = require("./routes/countries");
const gameRoutes = require("./routes/game");
//const rankingRoutes = require("./routes/ranking");
//const partidaRoutes = require("./routes/partida");

const scoreRoutes = require("./routes/score");
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/", countryRoutes);

app.use("/api", scoreRoutes);
app.use("/api/game", gameRoutes);
//app.use("/api", rankingRoutes);
//app.use("/api", partidaRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
