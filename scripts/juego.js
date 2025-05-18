// Obtener preguntas guardadas desde localStorage
function obtenerPreguntasPersonalizadas() {
  const guardadas = localStorage.getItem("preguntasGuardadas");
  if (guardadas) {
    return JSON.parse(guardadas);
  } else {
    return [];
  }
}

// Preguntas fijas para que el juego no cargue vacío
const preguntasFijas = [
  {
    pregunta: "¿Cuál es la capital de Francia?",
    opciones: ["París", "Londres", "Madrid"],
    respuestaCorrecta: "París",
  },
  {
    pregunta: "¿Qué lenguaje se utiliza principalmente en la web?",
    opciones: ["Java", "Python", "JavaScript"],
    respuestaCorrecta: "JavaScript",
  },
  {
    pregunta: "¿Cuál es la capital de Argentina?",
    opciones: ["Rosario", "Montevideo", "Buenos Aires"],
    respuestaCorrecta: "Buenos Aires",
  },
];

// Se combinan las preguntas fijas con las personalizadas mediante un concat para conseguir un array global

let preguntas = preguntasFijas.concat(obtenerPreguntasPersonalizadas()); // preguntas = array global

// Mezclador de orden de las preguntas para hacerlo más dinamico
preguntas = preguntas.sort(() => Math.random() - 0.5);

// Variables iniciales
let preguntaActual = 0;
let puntaje = 0;

// Manipulación del DOM
const contenedorPregunta = document.getElementById("pregunta");
const opciones = document.querySelectorAll(".opcion");
const puntajeFinalElemento = document.getElementById("puntajeFinal");

// Funcion para mostrar las preguntas con la opciones
function mostrarPregunta() {
  const pregunta = preguntas[preguntaActual];
  contenedorPregunta.textContent = pregunta.pregunta;
  opciones.forEach((opcion, index) => {
    opcion.textContent = pregunta.opciones[index];
    opcion.style.display = "inline-block"; // Por si se vuelven a ocultar los botones
    opcion.onclick = () => verificarRespuesta(pregunta.opciones[index]);
  });
}

// Funcion para verificar la respuesta seleccionada y acumular el puntaje
function verificarRespuesta(respuestaSeleccionada) {
  const pregunta = preguntas[preguntaActual];
  if (respuestaSeleccionada === pregunta.respuestaCorrecta) {
    puntaje++;
  }

  preguntaActual++;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultadoFinal();
  }
}

// Funcion para mostrar el puntaje final y guardar en localStorage
function mostrarResultadoFinal() {
  document.getElementById("juego").style.display = "none"; //Oculta la pregunta
  document.getElementById("resultado").style.display = "block"; // Hace que se muestre el resultado
  puntajeFinalElemento.textContent = `Tu puntaje final es: ${puntaje}/${preguntas.length}`;

  // Se crea un objeto con la fecha y el puntaje
  const nuevoPuntaje = {
    fecha: new Date().toLocaleString(), // .toLocaleString para mostrar mas ordenada la fecha y la hora
    puntaje: puntaje, // Guardar como number
    total: preguntas.length,
  };
  // Guardar el puntaje en localStorage
  const puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
  puntajes.push(nuevoPuntaje);
  localStorage.setItem("puntajes", JSON.stringify(puntajes));
}

// Iniciar el juego
mostrarPregunta();
