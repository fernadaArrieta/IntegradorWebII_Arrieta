const fs = require("fs");
const path = require("path");

const scoresFile = path.join(__dirname, "../data/scores.json");

// Leer los puntajes
const readScores = () => {
  try {
    const data = fs.readFileSync(scoresFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error leyendo scores:", err);
    return [];
  }
};

// Guardar los puntajes
const writeScores = (scores) => {
  fs.writeFileSync(scoresFile, JSON.stringify(scores, null, 2), "utf-8");
};

const saveScore = (req, res) => {
  const { player_name, score, time } = req.body;

  if (!player_name || score == null || time == null) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  const scores = readScores();

  const newScore = {
    player_name,
    score,
    time,
    created_at: new Date().toISOString(),
  };

  scores.push(newScore);
  writeScores(scores);

  res.status(201).json({ message: "Puntaje guardado con éxito" });
};

const getTopScores = (req, res) => {
  const scores = readScores();

  const top = scores
    .sort((a, b) => b.score - a.score || a.time - b.time)
    .slice(0, 10);

  res.json(top);
};

module.exports = {
  saveScore,
  getTopScores,
};
