// Función para mostrar la tabla de puntajes del juego de trivia API y permitir su eliminación
export function mostrarPuntajesApi() {
  const listaPuntajesApi = document.getElementById("lista-puntajesApi"); // Contenedor donde se mostrará la tabla de puntajes
  listaPuntajesApi.innerHTML = ""; // Limpia el contenedor antes de mostrar la tabla

  // Recupera los puntajes guardados en localStorage (o un array vacío si no hay)
  let puntajesGuardadosApi =
    JSON.parse(localStorage.getItem("puntajesTriviaApi")) || [];

  // Estructura de la tabla para mostrar los puntajes
  const table = document.createElement("table");
  table.classList.add("tabla-puntajes"); // Clase para estilos CSS
  table.innerHTML = `
    <thead>
      <tr>
        <th>Puesto</th> 
        <th>Fecha</th> 
        <th>Puntaje</th> 
        <th>Eliminar</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector("tbody"); // Obtiene el cuerpo de la tabla

  // Si no hay puntajes guardados, muestra un mensaje en la tabla
  if (puntajesGuardadosApi.length === 0) {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = "No hay puntajes guardados.";
    row.appendChild(td);
    tbody.appendChild(row);
  } else {
    // Si hay puntajes, los ordena de mayor a menor antes de mostrarlos
    const puntajesOrdenados = puntajesGuardadosApi
      .concat()
      .sort((a, b) => b.puntaje - a.puntaje); // Ordena por puntaje descendente
    puntajesOrdenados.forEach((puntajeObj, index) => {
      const row = document.createElement("tr");
      // Columna de puesto (ranking)
      const tdPuesto = document.createElement("td");
      tdPuesto.textContent = index + 1;
      row.appendChild(tdPuesto);
      // Columna de fecha y hora del puntaje
      const tdFecha = document.createElement("td");
      tdFecha.textContent = puntajeObj.fecha;
      row.appendChild(tdFecha);
      // Columna de puntaje obtenido
      const tdPuntaje = document.createElement("td");
      tdPuntaje.textContent = puntajeObj.puntaje;
      row.appendChild(tdPuntaje);
      // Columna de botón para eliminar el puntaje
      const tdEliminar = document.createElement("td");
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add(
        "btn-eliminar",
        "items-center",
        "border",
        "border-black",
        "h-7",
        "w-7"
      );
      const imgEliminar = document.createElement("img");
      imgEliminar.src = "/assets/images/eliminar_icon.jpg"; // Icono de eliminar
      imgEliminar.alt = "Boton de eliminar";
      btnEliminar.appendChild(imgEliminar);
      // Evento para eliminar el puntaje seleccionado
      btnEliminar.addEventListener("click", () => {
        // Busca el índice del puntaje a eliminar en el array original (por fecha y puntaje)
        const busquedaPuntaje = puntajesGuardadosApi.findIndex(
          (p) =>
            p.fecha === puntajeObj.fecha && p.puntaje === puntajeObj.puntaje
        );
        if (busquedaPuntaje !== -1) {
          puntajesGuardadosApi.splice(busquedaPuntaje, 1); // Elimina el puntaje del array
          // Si ya no quedan puntajes, elimina la clave del localStorage
          if (puntajesGuardadosApi.length === 0) {
            localStorage.removeItem("puntajesTriviaApi");
          } else {
            // Si quedan puntajes, actualiza el array en localStorage
            localStorage.setItem(
              "puntajesTriviaApi",
              JSON.stringify(puntajesGuardadosApi)
            );
          }
          // Notificación de Toastify para confirmar la eliminación
          Toastify({
            text: "¡Puntaje eliminado exitosamente!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ff9800",
            stopOnFocus: true,
          }).showToast();
          mostrarPuntajesApi(); // Actualiza la tabla tras eliminar
        }
      });
      tdEliminar.appendChild(btnEliminar);
      row.appendChild(tdEliminar);
      tbody.appendChild(row);
    });
  }
  listaPuntajesApi.appendChild(table); // Inserta la tabla en el contenedor
}
