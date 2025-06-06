export function mostrarVista(id) {
  document
    .querySelectorAll(".vista")
    .forEach((sec) => (sec.style.display = "none"));
  document.getElementById(id).style.display = "";
}
