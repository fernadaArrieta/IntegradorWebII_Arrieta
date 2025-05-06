//const API_URL = "http://localhost:3000"; // Ajusta si tu backend corre en otro puerto

let currentQuestion = null;
let questionIndex = 0;
const totalQuestions = 10;
let score = 0;
let correctCount = 0;
let incorrectCount = 0;
let startTime = 0;
let endTime = 0;
let questionStartTime = 0;
let questionEndTime = 0;
let questionTimes = [];
let playerName = "";

// Elementos del DOM
const questionText = document.getElementById("question-text");
const flagContainer = document.getElementById("flag-container");
const flagImage = document.getElementById("flag-image");
const scoreDisplay = document.getElementById("score");
const scoreValueDisplay = document.getElementById("score-value");
const optionsContainer = document.getElementById("options-container");
const answerFeedback = document.getElementById("answer-feedback");
const nextButton = document.getElementById("next-button");
const resultsSection = document.getElementById("results-section");
const gameSection = document.getElementById("game-section");
const correctAnswersDisplay = document.getElementById("correct-answers");
const incorrectAnswersDisplay = document.getElementById("incorrect-answers");
const totalTimeDisplay = document.getElementById("total-time");
const averageTimeDisplay = document.getElementById("average-time");
const restartButton = document.getElementById("restart-button");
const rankingList = document.getElementById("ranking-list");
const nameModal = new bootstrap.Modal(document.getElementById("nameModal"));
const startGameButton = document.getElementById("start-game-button");
const playerNameInput = document.getElementById("player-name-input");

async function fetchQuestion() {
  try {
    const response = await fetch("/api/game"); // Cambia '/countries' a '/api/game'
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pregunta recibida:", data);
    currentQuestion = {
      pregunta: data.preguntas,
      opciones: data.options,
      respuestaCorrecta: data.respuestaCorrecta,
      puntos: data.puntaje,
      imagen: data.flagUrl, // Usa flagUrl en lugar de flag
    };
    loadQuestion();
  } catch (error) {
    console.error("Error al obtener la pregunta:", error);
    questionText.textContent =
      "Error al cargar la pregunta. Por favor, intenta de nuevo más tarde.";
    optionsContainer.innerHTML = "";
  }
}

function loadQuestion() {
  questionStartTime = Date.now();
  questionText.textContent = currentQuestion.pregunta;
  scoreValueDisplay.textContent = currentQuestion.puntos;
  flagContainer.style.display = currentQuestion.imagen ? "block" : "none";
  if (currentQuestion.imagen) {
    flagImage.src = currentQuestion.imagen;
  } else {
    flagImage.src = "";
  }

  optionsContainer.innerHTML = "";
  currentQuestion.opciones.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("btn", "btn-outline-primary", "option-button");
    button.dataset.option = index;
    button.addEventListener("click", () => checkAnswer(option));
    optionsContainer.appendChild(button);
  });

  answerFeedback.textContent = "";
  nextButton.disabled = true;
}

async function checkAnswer(selectedOption) {
  questionEndTime = Date.now();
  const timeTaken = (questionEndTime - questionStartTime) / 1000;
  questionTimes.push(timeTaken);

  const isCorrect = selectedOption === currentQuestion.respuestaCorrecta;
  const buttons = optionsContainer.querySelectorAll(".option-button");

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === currentQuestion.respuestaCorrecta) {
      button.classList.add("correct");
    }
    if (button.textContent === selectedOption && !isCorrect) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    answerFeedback.textContent = "¡Correcto!";
    score += currentQuestion.puntos;
    correctCount++;
  } else {
    answerFeedback.textContent = `Incorrecto. La respuesta correcta era: ${currentQuestion.respuestaCorrecta}`;
    incorrectCount++;
  }
  scoreDisplay.textContent = score;
  nextButton.disabled = false;

  // Guardar la respuesta en el servidor (asumiendo una ruta /api/answers)
  try {
    const response = await fetch("/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pregunta: currentQuestion.pregunta,
        respuestaSeleccionada: selectedOption,
        respuestaCorrecta: currentQuestion.respuestaCorrecta,
        esCorrecta: isCorrect,
        puntosObtenidos: isCorrect ? currentQuestion.puntos : 0,
        tiempoRespuesta: timeTaken,
        jugador: playerName, // Asegúrate de tener el nombre del jugador
      }),
    });
    if (!response.ok) {
      console.error("Error al guardar la respuesta:", response.status);
    }
  } catch (error) {
    console.error("Error al enviar la respuesta:", error);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex < totalQuestions) {
    fetchQuestion();
  } else {
    endGame();
  }
}

async function endGame() {
  endTime = Date.now();
  const totalTime = (endTime - startTime) / 1000;
  const averageTime = totalTime / totalQuestions || 0;

  gameSection.style.display = "none";
  resultsSection.style.display = "block";

  correctAnswersDisplay.textContent = correctCount;
  incorrectAnswersDisplay.textContent = incorrectCount;
  totalTimeDisplay.textContent = totalTime.toFixed(2);
  averageTimeDisplay.textContent = averageTime.toFixed(2);

  try {
    const response = await fetch("/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_name: playerName,
        score: correctCount,
        time: totalTime,
      }),
    });
    if (!response.ok) {
      console.error("Error al guardar la puntuación final:", response.status);
    }
    loadRanking();
  } catch (error) {
    console.error("Error al enviar la puntuación final:", error);
  }
}

async function loadRanking() {
  try {
    const response = await fetch("/api/scores/top");
    const rankingData = await response.json();
    rankingList.innerHTML = "";
    rankingData.forEach((entry) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${entry.player_name} - Puntuación: ${
        entry.score
      }, Tiempo: ${entry.time.toFixed(2)}s`;
      rankingList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error al cargar el ranking:", error);
  }
}

function startGame() {
  gameSection.style.display = "block";
  resultsSection.style.display = "none";
  questionIndex = 0;
  score = 0;
  correctCount = 0;
  incorrectCount = 0;
  questionTimes = [];
  startTime = Date.now();
  scoreDisplay.textContent = score;
  fetchQuestion();
  loadRanking();
}

restartButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion);

startGameButton.addEventListener("click", () => {
  playerName = playerNameInput.value.trim();
  if (playerName) {
    nameModal.hide();
    startGame();
  } else {
    alert("Por favor, ingresa tu nombre.");
  }
});

// Mostrar el modal al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  nameModal.show();
});
