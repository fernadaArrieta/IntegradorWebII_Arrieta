const db = require("../db/db");

const submitScore = (req, res) => {
  const { username, score, duration_seconds } = req.body;

  if (!username || score == null || duration_seconds == null) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const query = `
    INSERT INTO scores (username, score, duration_seconds)
    VALUES (?, ?, ?)
  `;

  db.query(query, [username, score, duration_seconds], (err, result) => {
    if (err) {
      console.error("Error guardando el puntaje:", err);
      return res.status(500).json({ error: "Error interno" });
    }

    res.status(201).json({ message: "Puntaje guardado exitosamente" });
  });
};
const getTopScores = async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT player_name, score, time, created_at
        FROM scores
        ORDER BY score DESC, time ASC
        LIMIT 20
      `);
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo el ranking:", error);
    res.status(500).json({ message: "Error al obtener el ranking" });
  }
};

module.exports = { submitScore, getTopScores };
