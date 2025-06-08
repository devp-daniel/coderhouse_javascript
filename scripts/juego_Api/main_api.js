// Importa las funciones para el juego de trivia con API
import { iniciarJuegoApi } from "./juego_api.js"; // Juego
import { mostrarPuntajesApi } from "./puntajes_api.js"; // Puntajes
import { mostrarVista } from "../juego_Personalizado/vista.js"; // Control de la vista

// Botón para jugar la trivia con API
document.getElementById("jugarApi").addEventListener("click", () => {
  iniciarJuegoApi();
  mostrarVista("juegoApi");
});

// Botón para ver los puntajes
document.getElementById("btn-puntajesApi").addEventListener("click", () => {
  mostrarPuntajesApi();
  mostrarVista("puntajes");
});

// Botón para volver al menú principal
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-volver-menu")) {
    mostrarVista("menu");
  }
});
