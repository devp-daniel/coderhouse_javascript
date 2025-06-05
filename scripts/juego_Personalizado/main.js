import { iniciarJuego } from "./juego.js";
import { mostrarPreguntas } from "./preguntas.js";
import { mostrarPuntajes } from "./puntajes.js";
import { mostrarVista } from "./ui.js";

document.getElementById("btn-jugar").addEventListener("click", () => {
  iniciarJuego();
  mostrarVista("juego");
});

document.getElementById("btn-preguntas").addEventListener("click", () => {
  mostrarPreguntas();
  mostrarVista("preguntas");
});

document.getElementById("btn-puntajes").addEventListener("click", () => {
  mostrarPuntajes();
  mostrarVista("puntajes");
});

document.querySelectorAll(".btn-volver-menu").forEach((btn) => {
  btn.addEventListener("click", () => mostrarVista("menu"));
});
