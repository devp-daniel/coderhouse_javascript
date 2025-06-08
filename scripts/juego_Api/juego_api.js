// Importa la función para obtener preguntas de trivia desde la API
import { obtenerPreguntasTrivia } from "./api.js";

// Función para iniciar el juego de trivia usando preguntas de la API
export function iniciarJuegoApi() {
  // Manipulación del DOM
  const seccionMenu = document.getElementById("menu"); // Menú principal
  const seccionJuego = document.getElementById("juegoApi"); // Sección donde se juega la trivia
  const seccionResultado = document.getElementById("resultado"); // Sección de resultado final
  const contenedorPreguntaApi = document.getElementById("preguntaApi"); // Contenedor para la pregunta actual
  const contenedorOpciones = document.getElementById("opcionesApi"); // Contenedor para los botones de opciones
  const puntajeFinal = document.getElementById("puntajeFinal"); // Muestra el puntaje final

  // Spinner de carga
  let spinner = document.createElement("div");
  spinner.id = "spinnerApi";
  spinner.innerHTML = `
    <div class="flex justify-center items-center my-8">
      <svg class="animate-spin h-11 w-11 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>
  `;

  // Variables del juego
  let preguntasApi = []; // Array de preguntas obtenidas de la API
  let indiceActual = 0; // Índice de la pregunta actual
  let puntajeApi = 0; // Puntaje

  // Función para iniciar el juego y cargar preguntas
  (async function iniciar() {
    seccionMenu.style.display = "none"; // Oculta el menú principal
    seccionJuego.style.display = "block"; // Muestra el juego
    seccionResultado.style.display = "none"; // Oculta la sección de resultados
    contenedorPreguntaApi.innerHTML = ""; // Limpia la pregunta
    contenedorOpciones.innerHTML = ""; // Limpia la seccion de opciones
    contenedorPreguntaApi.appendChild(spinner); // Muestra el spinner de carga
    preguntasApi = await obtenerPreguntasTrivia(5); // Obtiene 5 preguntas de la API
    contenedorPreguntaApi.removeChild(spinner); // Quita el spinner una vez cargadas las preguntas
    indiceActual = 0;
    puntajeApi = 0;
    mostrarPreguntaApi();
  })();

  // Función para guardar el puntaje final en localStorage
  function guardarPuntajeApiEnLocalStorage(puntaje) {
    const puntajesApiGuardados =
      JSON.parse(localStorage.getItem("puntajesTriviaApi")) || [];
    const fecha = new Date().toLocaleString();
    puntajesApiGuardados.push({ puntaje, fecha });
    localStorage.setItem(
      "puntajesTriviaApi",
      JSON.stringify(puntajesApiGuardados)
    );
  }

  // Función para mostrar la pregunta y sus opciones
  function mostrarPreguntaApi() {
    const pregunta = preguntasApi[indiceActual];
    contenedorPreguntaApi.innerHTML = pregunta.question;

    // Opciones de la API
    const opcionesApi = [
      ...pregunta.incorrect_answers,
      pregunta.correct_answer,
    ];

    contenedorOpciones.innerHTML = ""; // Limpia las opciones de una pregunta anterior
    opcionesApi.forEach((resp) => {
      // Crea un botón para cada opción de respuesta
      const btn = document.createElement("button");
      btn.className =
        "opcion sombreado bg-white hover:bg-cyan-300 border border-black rounded-xl w-64 md:w-90 lg:w-120 my-1";
      btn.textContent = resp; // Texto de la opción
      // Evento click para verificar si la respuesta es correcta
      btn.addEventListener("click", () => {
        const esCorrecta = resp === pregunta.correct_answer;
        if (esCorrecta) {
          // Notificacion de Toastify mostrando si la respuesta es correcta
          Toastify({
            text: "¡Correcto!",
            duration: 1000,
            gravity: "top",
            position: "center",
            backgroundColor: "#4caf50",
            stopOnFocus: true,
          }).showToast();
          puntajeApi++;
        } else {
          // Notificacion de Toastify mostrando si la respuesta es incorrecta
          Toastify({
            text: "Incorrecto",
            duration: 1000,
            gravity: "top",
            position: "center",
            backgroundColor: "#f87171",
            stopOnFocus: true,
          }).showToast();
        }

        // Espera 0.5 segundos antes de pasar a la siguiente pregunta o mostrar el resultado final
        setTimeout(() => {
          indiceActual++;
          if (indiceActual < preguntasApi.length) {
            mostrarPreguntaApi();
          } else {
            guardarPuntajeApiEnLocalStorage(puntajeApi); // Guarda el puntaje final
            // Muestra la pantalla de resultado final
            seccionJuego.style.display = "none";
            seccionMenu.style.display = "none";
            seccionResultado.style.display = "block";
            puntajeFinal.textContent = `¡Juego terminado! Puntaje final: ${puntajeApi}/${preguntasApi.length}`;
          }
        }, 500);
      });
      contenedorOpciones.appendChild(btn);
    });
  }
}
