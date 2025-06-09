// Función para mostrar la tabla de puntajes guardados y permitir su eliminación
export function mostrarPuntajes() {
  const listaPuntajes = document.getElementById("lista-puntajes"); // ID contenedor donde se mostrará la tabla de puntajes

  // Función para construir y mostrar la tabla de puntajes
  function mostrarPuntajes() {
    // Recupera los puntajes almacenados en localStorage (o un array vacío si no hay)
    const puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
    listaPuntajes.innerHTML = ""; // Limpia el contenedor antes de mostrar la tabla

    // Crea la estructura de la tabla para mostrar los puntajes
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
    if (puntajes.length === 0) {
      const row = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 4; // Hace que el mensaje ocupe toda la fila
      td.textContent = "No hay puntajes guardados.";
      row.appendChild(td);
      tbody.appendChild(row);
      // Hay puntajes guardados
    } else {
      // Si hay puntajes, los ordena de mayor a menor antes de mostrarlos
      const puntajesOrdenados = puntajes
        .concat() // Crea una copia del array para no modificar el original
        .sort((a, b) => b.puntaje - a.puntaje); // Ordena por puntaje descendente
      puntajesOrdenados.forEach((puntaje, index) => {
        const row = document.createElement("tr");

        // Columna puesto (ranking)
        const tdPuesto = document.createElement("td");
        tdPuesto.textContent = index + 1; // El índice + 1 para mostrar el puesto
        row.appendChild(tdPuesto);

        // Columna fecha y hora del puntaje
        const tdFecha = document.createElement("td");
        tdFecha.textContent = puntaje.fecha;
        row.appendChild(tdFecha);

        // Columna puntaje obtenido
        const tdPuntaje = document.createElement("td");
        tdPuntaje.textContent = `${puntaje.puntaje}/${puntaje.total}`;
        row.appendChild(tdPuntaje);

        // Columna con el botón para eliminar el puntaje
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
        imgEliminar.src =
          "/coderhouse_javascript/assets/images/eliminar_icon.jpg"; // Icono de eliminar
        imgEliminar.alt = "Boton de eliminar";
        btnEliminar.appendChild(imgEliminar);
        // Evento para eliminar el puntaje seleccionado
        btnEliminar.addEventListener("click", () => {
          // Busca el índice del puntaje a eliminar en el array original (por fecha, puntaje y total)
          const busquedaPuntaje = puntajes.findIndex(
            (puntajeAEliminar) =>
              puntajeAEliminar.fecha === puntaje.fecha &&
              puntajeAEliminar.puntaje === puntaje.puntaje &&
              puntajeAEliminar.total === puntaje.total
          );
          // Si se encuentra el puntaje, lo elimina
          if (busquedaPuntaje !== -1) {
            puntajes.splice(busquedaPuntaje, 1); // Elimina el puntaje del array
            // Si ya no quedan puntajes, elimina la clave del localStorage
            if (puntajes.length === 0) {
              localStorage.removeItem("puntajes");
            } else {
              // Si quedan puntajes, actualiza el array en localStorage
              localStorage.setItem("puntajes", JSON.stringify(puntajes));
            }
            // Notificacion de Toastify para confirmar la eliminación
            Toastify({
              text: "¡Puntaje eliminado exitosamente!",
              duration: 3000,
              gravity: "top",
              position: "right",
              backgroundColor: "#ff9800",
              stopOnFocus: true,
            }).showToast();
            mostrarPuntajes(); // Actualiza la tabla tras eliminar
          }
        });

        tdEliminar.appendChild(btnEliminar);
        row.appendChild(tdEliminar);

        tbody.appendChild(row); // Agrega la fila al cuerpo de la tabla
      });
    }

    listaPuntajes.appendChild(table); // Inserta la tabla en el contenedor
  }

  mostrarPuntajes();
}
