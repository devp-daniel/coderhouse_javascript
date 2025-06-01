const form = document.getElementById("formPregunta");
const lista = document.getElementById("listaPreguntas");

// Cargar preguntas del localStorage al iniciar

mostrarPreguntas();

form.addEventListener("submit", (e) => {
  e.preventDefault(); //Para evitar que se recargue la página cada vez que se envía el formulario

  // Recoge los valores de los inputs del formulario
  const pregunta = document.getElementById("pregunta").value;
  const opcionA = document.getElementById("opcionA").value;
  const opcionB = document.getElementById("opcionB").value;
  const opcionC = document.getElementById("opcionC").value;
  const respuesta = document.getElementById("respuesta").value.toUpperCase(); // .toUpperCase() para que la respuesta siempre sea mayúscula y no genere un error :(

  if (!["A", "B", "C"].includes(respuesta)) {
    // Siempre en mayúscula
    alert("La respuesta debe ser A, B o C");
    return;
  }

  // Arrays que preparan la información para el objeto de las nuevas preguntas
  const opciones = [opcionA, opcionB, opcionC];
  const indiceRespuesta = { A: 0, B: 1, C: 2 }[respuesta]; // Convierte la letra de la respuesta en un número, esta en mayuscula!!
  const respuestaCorrecta = opciones[indiceRespuesta];

  // Formato del objeto que guarda las nuevas preguntas
  const nuevaPregunta = {
    pregunta,
    opciones,
    respuestaCorrecta,
  };

  // Primero obtener las preguntas guardadas en localStorage
  let preguntasGuardadas =
    JSON.parse(localStorage.getItem("preguntasGuardadas")) || [];
  // Usar push para añadir la nueva pregunta al array de preguntas guardadas
  preguntasGuardadas.push(nuevaPregunta);
  // Guardar el nuevo array en localStorage
  localStorage.setItem(
    "preguntasGuardadas",
    JSON.stringify(preguntasGuardadas)
  );

  form.reset(); // Limpia el formulario después de enviar y así no queda información de la pregunta anterior
  mostrarPreguntas(); // Nuevamente llamar la función para actualizar la lista de preguntas
});

// Funcion para mostrar las preguntas guardadas en una tabla y sus 4 columnas
function mostrarPreguntas() {
  lista.innerHTML = ""; // Limpia la lista y quita la información que queda al refrescar la página

  // Crear tabla
  const table = document.createElement("table");
  table.classList.add("tabla-preguntas"); // Añadir clase para el CSS
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

  const tbody = table.querySelector("tbody"); //querySelector para eligir el cuerpo de la tabla
  const preguntas =
    JSON.parse(localStorage.getItem("preguntasGuardadas")) || []; // Recuperar las preguntas guardadas en localStorage

  preguntas.forEach((pregunta, index) => {
    const row = document.createElement("tr");

    // Pregunta
    const tdPregunta = document.createElement("td");
    tdPregunta.textContent = pregunta.pregunta;
    row.appendChild(tdPregunta);

    // Opciones
    const tdOpciones = document.createElement("td");
    tdOpciones.innerHTML = `
        A: ${pregunta.opciones[0]} <br>
        B: ${pregunta.opciones[1]} <br>
        C: ${pregunta.opciones[2]}
      `;
    row.appendChild(tdOpciones);

    // Respuesta
    const tdRespuesta = document.createElement("td");
    tdRespuesta.textContent = pregunta.respuestaCorrecta;
    row.appendChild(tdRespuesta);

    // Botón eliminar con imagen
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
    imgEliminar.src = "../assets/images/eliminar_icon.jpg";
    imgEliminar.alt = "Boton de eliminar";
    btnEliminar.appendChild(imgEliminar);
    // Evento de click para el boton
    btnEliminar.addEventListener("click", () => {
      preguntas.splice(index, 1); // .splice para eliminar la pregunta especifica del array
      // Guardar el nuevo array con la pregunta eliminada en localStorage
      localStorage.setItem("preguntasGuardadas", JSON.stringify(preguntas));
      mostrarPreguntas();
    });
    tdEliminar.appendChild(btnEliminar);
    row.appendChild(tdEliminar);

    tbody.appendChild(row);
  });

  // Insertar la tabla
  lista.appendChild(table);
}
