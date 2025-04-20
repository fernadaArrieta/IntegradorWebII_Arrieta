fetch("/api/countries")
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // Acá podrías mostrar una pregunta aleatoria
  });
