// Función para mostrar y gestionar las preguntas personalizadas
export function mostrarPreguntas() {
  const form = document.getElementById("formPregunta"); // Formulario de ingreso de preguntas
  const lista = document.getElementById("listaPreguntas"); // Contenedor donde se muestra la lista de preguntas

  // Evento de envío del formulario para agregar una nueva pregunta
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtiene los valores ingresados por el usuario en el formulario
    const pregunta = document.getElementById("nuevaPregunta").value; // Texto
    const opcionA = document.getElementById("opcionA").value; // Opción A
    const opcionB = document.getElementById("opcionB").value; // Opción B
    const opcionC = document.getElementById("opcionC").value; // Opción C
    const respuesta = document.getElementById("respuesta").value.toUpperCase(); // Respuesta correcta A, B o C en mayúscula

    // Validación de la respuesta y notificacion de Toastify diciendo que debe ser A, B o C en mayúscula
    if (!["A", "B", "C"].includes(respuesta)) {
      Toastify({
        text: "La respuesta debe ser A, B o C",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ff6b6b",
        stopOnFocus: true,
      }).showToast();
      return;
    }

    const opciones = [opcionA, opcionB, opcionC]; // Array de opciones
    const indiceRespuesta = { A: 0, B: 1, C: 2 }[respuesta]; // Convierte la letra en índice numérico
    const respuestaCorrecta = opciones[indiceRespuesta]; // Obtiene el texto de la respuesta correcta

    // Crea el objeto de la nueva pregunta personalizada
    const nuevaPregunta = {
      pregunta,
      opciones,
      respuestaCorrecta,
    };

    // Recupera las preguntas guardadas en localStorage (o un array vacío si no hay)
    let preguntasGuardadas =
      JSON.parse(localStorage.getItem("preguntasGuardadas")) || [];
    // Agrega la nueva pregunta al array
    preguntasGuardadas.push(nuevaPregunta);
    // Guarda el array actualizado en localStorage
    localStorage.setItem(
      "preguntasGuardadas",
      JSON.stringify(preguntasGuardadas)
    );

    form.reset(); // Limpia el formulario después de agregar la pregunta
    // Notificación de éxito usando Toastify
    Toastify({
      text: "¡Pregunta guardada exitosamente!",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#4caf50",
    }).showToast();
    mostrarPreguntas(); // Actualiza la lista de preguntas mostrada en pantalla
  });

  // Función para mostrar todas las preguntas guardadas en una tabla
  function mostrarPreguntas() {
    lista.innerHTML = ""; // Limpia el contenedor antes de mostrar la tabla

    // Crea la estructura de la tabla para mostrar preguntas
    const table = document.createElement("table");
    table.classList.add("tabla-preguntas"); // Clase para estilos CSS
    table.innerHTML = `
      <thead>
        <tr>
          <th>Pregunta</th>
          <th>Opciones</th>
          <th>Respuesta</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody"); // Obtiene el cuerpo de la tabla
    const preguntas =
      JSON.parse(localStorage.getItem("preguntasGuardadas")) || []; // Recupera preguntas guardadas

    // Recorre cada pregunta y la agrega como una fila en la tabla
    if (preguntas.length === 0) {
      // Si no hay preguntas, muestra un mensaje en la tabla
      const row = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 4;
      td.textContent = "No hay preguntas guardadas";
      td.classList.add("text-center", "font-semibold", "py-4");
      row.appendChild(td);
      tbody.appendChild(row);
    } else {
      preguntas.forEach((pregunta, index) => {
        const row = document.createElement("tr");

        // Columna de pregunta
        const tdPregunta = document.createElement("td");
        tdPregunta.textContent = pregunta.pregunta;
        row.appendChild(tdPregunta);

        // Columna de opciones A, B, C
        const tdOpciones = document.createElement("td");
        tdOpciones.innerHTML = `
          A: ${pregunta.opciones[0]} <br>
          B: ${pregunta.opciones[1]} <br>
          C: ${pregunta.opciones[2]}
        `;
        row.appendChild(tdOpciones);

        // Columna de respuesta correcta
        const tdRespuesta = document.createElement("td");
        tdRespuesta.textContent = pregunta.respuestaCorrecta;
        row.appendChild(tdRespuesta);

        // Columna de botón para eliminar la pregunta
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
        // Evento para eliminar la pregunta seleccionada
        btnEliminar.addEventListener("click", () => {
          preguntas.splice(index, 1); // Elimina la pregunta del array
          // Guarda el array actualizado en localStorage
          localStorage.setItem("preguntasGuardadas", JSON.stringify(preguntas));
          // Notificación de Toastify informando que la pregunta fue eliminada
          Toastify({
            text: "Pregunta eliminada exitosamente!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ff9800",
            stopOnFocus: true,
          }).showToast();
          mostrarPreguntas(); // Actualiza la tabla tras eliminar
        });
        tdEliminar.appendChild(btnEliminar);
        row.appendChild(tdEliminar);

        tbody.appendChild(row);
      });
    }

    // Inserta la tabla en el contenedor de la lista
    lista.appendChild(table);
  }

  mostrarPreguntas();
}
