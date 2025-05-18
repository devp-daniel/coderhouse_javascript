const listaPuntajes = document.getElementById("lista-puntajes");

// Función para mostrar los puntajes guardados en localStorage
function mostrarPuntajes() {
  // Obtener los puntajes del localStorage
  const puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
  listaPuntajes.innerHTML = "";

  // Crear tabla de puntajes
  const table = document.createElement("table");
  table.classList.add("tabla-puntajes");
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

  const tbody = table.querySelector("tbody");

  // En caso que no haya puntajes guardados
  if (puntajes.length === 0) {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4; // .colSpan para que el mensaje ocupe toda la fila
    td.textContent = "No hay puntajes guardados.";
    row.appendChild(td);
    tbody.appendChild(row);
    // Hay puntajes guardados
  } else {
    // Ordenar puntajes de mayor a menor antes de mostrar
    const puntajesOrdenados = puntajes
      .concat() // contact vacio para crear una copia del array y no modificar el original
      .sort((a, b) => b.puntaje - a.puntaje);
    puntajesOrdenados.forEach((puntaje, index) => {
      const row = document.createElement("tr");

      // Puesto
      const tdPuesto = document.createElement("td");
      tdPuesto.textContent = index + 1;
      row.appendChild(tdPuesto);

      // Fecha
      const tdFecha = document.createElement("td");
      tdFecha.textContent = puntaje.fecha;
      row.appendChild(tdFecha);

      // Puntaje
      const tdPuntaje = document.createElement("td");
      tdPuntaje.textContent = `${puntaje.puntaje}/${puntaje.total}`;
      row.appendChild(tdPuntaje);

      // Botón eliminar con imagen
      const tdEliminar = document.createElement("td");
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn-eliminar");
      const imgEliminar = document.createElement("img");
      imgEliminar.src = "../assets/images/eliminar_icon.jpg";
      imgEliminar.alt = "Boton de eliminar";
      btnEliminar.appendChild(imgEliminar);
      // Evento de click para el botón
      btnEliminar.addEventListener("click", () => {
        // Buscar el puntaje en el array original
        const busquedaPuntaje = puntajes.findIndex(
          (puntajeAEliminar) =>
            puntajeAEliminar.fecha === puntaje.fecha &&
            puntajeAEliminar.puntaje === puntaje.puntaje &&
            puntajeAEliminar.total === puntaje.total
        );
        // Si se encuentra, eliminarlo
        if (busquedaPuntaje !== -1) {
          puntajes.splice(busquedaPuntaje, 1);
          // Actualizar el localStorage con el nuevo array del puntaje eliminado
          if (puntajes.length === 0) {
            localStorage.removeItem("puntajes");
          } else {
            localStorage.setItem("puntajes", JSON.stringify(puntajes));
          }
          mostrarPuntajes();
        }
      });

      tdEliminar.appendChild(btnEliminar);
      row.appendChild(tdEliminar);

      tbody.appendChild(row);
    });
  }

  listaPuntajes.appendChild(table);
}

mostrarPuntajes();
