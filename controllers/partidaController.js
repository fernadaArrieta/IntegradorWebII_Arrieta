const db = require("../db/db"); // Ruta a tu conexión MySQL

const guardarPartida = (req, res) => {
  const {
    nombre_usuario,
    puntaje,
    correctas,
    incorrectas,
    duracion_total,
    tiempo_promedio,
  } = req.body;

  if (
    !nombre_usuario ||
    puntaje == null ||
    correctas == null ||
    incorrectas == null ||
    duracion_total == null ||
    tiempo_promedio == null
  ) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const sql = `
    INSERT INTO partidas 
    (nombre_usuario, puntaje, correctas, incorrectas, duracion_total, tiempo_promedio)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    nombre_usuario,
    puntaje,
    correctas,
    incorrectas,
    duracion_total,
    tiempo_promedio,
  ];

  db.query(sql, valores, (err, resultado) => {
    if (err) {
      console.error("❌ Error al guardar la partida:", err);
      return res.status(500).json({ error: "Error al guardar la partida" });
    }

    res.status(201).json({ mensaje: "Partida guardada con éxito" });
  });
};

module.exports = { guardarPartida };
