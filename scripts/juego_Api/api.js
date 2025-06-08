// Función asíncrona para obtener preguntas de trivia desde la API Open Trivia Database
export async function obtenerPreguntasTrivia(cantidad = 5) {
  try {
    // amount: cantidad de preguntas - category=9: categoría General Knowledge - difficulty=easy: dificultad fácil - type=multiple: preguntas de opción múltiple
    const respuesta = await fetch(
      `https://opentdb.com/api.php?amount=${cantidad}&category=9&difficulty=easy&type=multiple`
    );
    const data = await respuesta.json();
    return data.results;
  } catch (error) {
    // Si ocurre un error en la petición o el parseo, lo muestra en consola
    console.error("Error al obtener las preguntas:", error);
    // Devuelve un array vacío en caso de error
    return [];
  }
}
