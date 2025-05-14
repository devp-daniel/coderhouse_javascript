// Array de objetos para las preguntas y respuestas 

const preguntasTrivia = [
    {
        pregunta: "¿Cuál es la capital de Argentina? ✈️ \n" + "\nPor favor, escribe el numero. \n",
        opciones: ["1. Buenos Aires", "2. Santiago", "3. Montevideo", "4. Roma"],
        respuestaCorrecta: 1 // Es un number!!!
    },
    {
        pregunta: "¿Cómo se llama el lenguage que estamos aprendiendo? 🖥️ \n" + "\nPor favor, escribe el numero. \n",
        opciones: ["1. Python", "2. C++", "3. JavaScript", "4. HTML"],
        respuestaCorrecta: 3
    },
    {
        pregunta: "¿Cómo se llama el deporte que se patea un balón y se debe anotar gol en una porteria? ⚽ \n" + "\nPor favor, escribe el numero.\n",
        opciones: ["1. Baloncesto", "2. Futbol", "3. Tennis", "4. Beisbol"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuál es la capital de Colombia? 🌄 \n" + "\nPor favor, escribe el numero. \n",
        opciones: ["1. Medellin", "2. Caracas", "3. Bogota", "4. Lima"],
        respuestaCorrecta: 3
    },    
];

console.log(preguntasTrivia);

// Función para mostrar una pregunta y recibir respuesta

function hacerPregunta(preguntaArray) {
    let mensaje = preguntaArray.pregunta + "\n";
    // Bucle para las preguntas y opciones    
    for (let i = 0; i < preguntaArray.opciones.length; i++) {
        mensaje = mensaje + preguntaArray.opciones[i] + "\n";
    }

    let respuestaUsuario = parseInt(prompt(mensaje)); // parseInt para convertir la respuesta a numero porque el solo prompt lo convertia en texto y fallaba :(

    console.log("Las respuestas elegidas fueron: ", respuestaUsuario);

    return respuestaUsuario === preguntaArray.respuestaCorrecta;
}

// Funcion para que el usuario pueda agregar una pregunta mediante .push()

function agregarNuevaPregunta() {
    alert("¡Vamos a agregar una nueva pregunta a la trivia! 🥳🎉 \n");

    let nuevaPreguntaTexto = prompt("\nPor favor escribe la nueva pregunta: \n");

    let nuevasOpciones = [];
    for (let i = 1; i <= 4; i++) {
        let opcion = prompt("Escribe la opción " + i + ":");
        nuevasOpciones.push(i + ". " + opcion);
    }

    let nuevaRespuestaCorrecta = parseInt(prompt("¿Cuál es el número de la respuesta correcta? ✅ \n" + "\nPor favor escribe un número del 1 al 4: \n"));

    if (nuevaRespuestaCorrecta >= 1 && nuevaRespuestaCorrecta <= 4) {
        const nuevaPregunta = {
            pregunta: nuevaPreguntaTexto + "\n" + "Por favor, escribe el número. \n",
            opciones: nuevasOpciones,
            respuestaCorrecta: nuevaRespuestaCorrecta
        };

        preguntasTrivia.push(nuevaPregunta);
        alert("¡Nueva pregunta agregada exitosamente! 🎉");
    } else {
        alert("Número inválido. No se agregó la nueva pregunta ❌");
    }
}
// Función principal del juego

function jugarTrivia() {
    alert("¡Bienvenido al juego de Trivia!📝❓✍️");
    let puntaje = 0;

    for (let i = 0; i < preguntasTrivia.length; i++) {
        // Bucle para mostrar las preguntas e ir guardando el puntaje
        let correcta = hacerPregunta(preguntasTrivia[i]);
        if (correcta) {
            alert("¡Correcto! ✅");
            puntaje++;
        } else {
            alert("Respuesta incorrecta ❌");
        }
    }

    alert("Juego terminado. Tu puntaje final es: " + puntaje + "/" + preguntasTrivia.length + " 🎉" );
    console.log("Puntaje final:", puntaje);
}


// Bucle do while que da la opción de agregar una preguntar y jugar nuevamente inclyuendo la nueva pregunta

let seguirJugando;

do {
    jugarTrivia();

    seguirJugando = prompt("¿Quieres agregar una nueva pregunta y volver a jugar? \n" + "\nPor favor escribe si o no \n");
    
    if (seguirJugando === "si") {
        agregarNuevaPregunta();
    }
} while (seguirJugando === "si")