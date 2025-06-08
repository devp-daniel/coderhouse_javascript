// Función que inicia el juego de preguntas
export function iniciarJuego() {
  // Función para obtener preguntas personalizadas guardadas en localStorage
  function obtenerPreguntasPersonalizadas() {
    const guardadas = localStorage.getItem("preguntasGuardadas");
    if (guardadas) {
      // Si existen preguntas guardadas, se convierten de JSON a objeto JavaScript
      return JSON.parse(guardadas);
    } else {
      // Si no hay preguntas guardadas, retorna un array vacío
      return [];
    }
  }

  // Array de preguntas fijas para que el juego no inicie vacío
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

  // Se combinan las preguntas fijas con las personalizadas para crear el array global de preguntas
  let preguntas = preguntasFijas.concat(obtenerPreguntasPersonalizadas()); // preguntas = array global

  // Mezcla aleatoriamente el orden de las preguntas
  preguntas = preguntas.sort(() => Math.random() - 0.5);

  // Variables globales para el juego
  let preguntaActual = 0;
  let puntaje = 0;

  // Manipulación del DOM
  const contenedorPregunta = document.getElementById("pregunta"); // Muestra la pregunta
  const opciones = document.querySelectorAll(".opcion"); // Opciones
  const puntajeFinalElemento = document.getElementById("puntajeFinal"); // Muestra el puntaje final

  // Función que muestra la pregunta actual y sus opciones
  function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    contenedorPregunta.textContent = pregunta.pregunta; // Se muestra el texto de la pregunta
    opciones.forEach((opcion, index) => {
      opcion.textContent = pregunta.opciones[index]; // Se asigna el texto de cada opción
      opcion.style.display = "inline-block"; // Asegura que los botones estén visibles
      opcion.addEventListener("click", () =>
        verificarRespuesta(pregunta.opciones[index])
      );
    });
  }

  // Función que verifica si la respuesta seleccionada es correcta y actualiza el puntaje
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

  // Función que muestra el resultado final y guarda el puntaje en localStorage
  function mostrarResultadoFinal() {
    document.getElementById("juego").style.display = "none"; // Oculta la sección del juego
    document.getElementById("resultado").style.display = "block"; // Muestra la sección de resultado
    puntajeFinalElemento.textContent = `Tu puntaje final es: ${puntaje}/${preguntas.length}`;

    // Se crea un objeto con la fecha y el puntaje obtenido
    const nuevoPuntaje = {
      fecha: new Date().toLocaleString(), // .toLocaleString para mostrar mas ordenada la fecha y la hora
      puntaje: puntaje,
      total: preguntas.length,
    };
    // Se recuperan los puntajes anteriores del localStorage (o un array vacío si no hay)
    const puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
    puntajes.push(nuevoPuntaje); // Se agrega el nuevo puntaje al array
    localStorage.setItem("puntajes", JSON.stringify(puntajes)); // Se guarda el array actualizado en localStorage
  }

  mostrarPregunta();
}
