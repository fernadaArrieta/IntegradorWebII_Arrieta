const db = require("../db/db");

const obtenerRanking = (req, res) => {
  const sql = `
    SELECT nombre_usuario, puntaje, correctas, incorrectas, duracion_total, tiempo_promedio, fecha
    FROM partidas
    ORDER BY puntaje DESC, tiempo_promedio ASC
    LIMIT 10
  `;

  db.query(sql, (err, resultados) => {
    if (err) {
      console.error("❌ Error al obtener el ranking:", err);
      return res.status(500).json({ error: "Error al obtener el ranking" });
    }

    res.json(resultados);
  });
};

module.exports = { obtenerRanking };
