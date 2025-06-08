// Función para mostrar una vista específica y ocultar las demás secciones de la aplicación
export function mostrarVista(id) {
  document
    .querySelectorAll(".vista")
    // Recorre cada sección y la oculta estableciendo su display en 'none'
    .forEach((sec) => (sec.style.display = "none"));
  // Muestra la sección cuyo id coincide con el parámetro recibido, restableciendo su display
  document.getElementById(id).style.display = "";
}
