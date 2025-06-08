// Importa las funciones de los otros JavaScripts
import { iniciarJuego } from "./juego.js";
import { mostrarPreguntas } from "./preguntas.js";
import { mostrarPuntajes } from "./puntajes.js";
import { mostrarVista } from "./vista.js";

// Evento para el botón Jugar
document.getElementById("btn-jugar").addEventListener("click", () => {
  iniciarJuego();
  mostrarVista("juego");
});

// Evento para el botón Preguntas
document.getElementById("btn-preguntas").addEventListener("click", () => {
  mostrarPreguntas();
  mostrarVista("preguntas");
});

// Evento para el botón Puntajes
document.getElementById("btn-puntajes").addEventListener("click", () => {
  mostrarPuntajes();
  mostrarVista("puntajes");
});

// Evento los botones que permiten volver al menú principal
document.querySelectorAll(".btn-volver-menu").forEach((btn) => {
  btn.addEventListener("click", () => mostrarVista("menu"));
});
