// Declaro la variable global para almacenar los datos de las películas
let peliculasData = [];

document.addEventListener('DOMContentLoaded', () => {
    // Cargo los datos de la API
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            peliculasData = data; 
            console.log("Películas cargadas:", peliculasData); // Verifica que los datos se cargaron
        })
        .catch(error => console.error("Error al cargar los datos:", error));
});

// Evento de búsqueda
document.getElementById("btnBuscar").addEventListener("click", () => {
    let consulta = document.getElementById("inputBuscar").value.toLowerCase().trim();
    console.log("Consulta de búsqueda:", consulta); // Verificar si la búsqueda se está ejecutando

    if (consulta) {
        const resultados = peliculasData.filter(pelicula => 
            pelicula.title.toLowerCase().includes(consulta) || // Busca por título
            (pelicula.genres && pelicula.genres.some(genero => genero.name.toLowerCase().includes(consulta))) || // Busca por género
            (pelicula.tagline && pelicula.tagline.toLowerCase().includes(consulta)) || // Busca por tagline
            (pelicula.overview && pelicula.overview.toLowerCase().includes(consulta)) // Busca por overview
        );
        console.log("Resultados de la búsqueda:", resultados); // Verifica los resultados
        mostrarResultados(resultados); 
    } else {
        mostrarResultados([]); // Si no hay consulta, limpiar la lista
    }
});

// Función para mostrar los resultados
function mostrarResultados(resultados) {
    const listaPeliculas = document.getElementById("lista");
    listaPeliculas.innerHTML = ""; // Limpiar la lista

    if (resultados.length === 0) {
        listaPeliculas.innerHTML = "<li class='list-group-item'>No se encontraron resultados.</li>";
        return;
    }

    resultados.forEach(pelicula => {
        const estrellas = convertirEstrellas(pelicula.vote_average); // Convertir puntaje a estrellas
        const elementoLista = document.createElement("li");
        elementoLista.className = "list-group-item";

        // Crear el contenido del elemento de la lista
        elementoLista.innerHTML = `
            <h5 class="titulo-pelicula">${pelicula.title}</h5>
            <p>${pelicula.tagline || 'No hay descripción disponible'}</p>
            <p>${estrellas}</p>
        `;

        listaPeliculas.appendChild(elementoLista); // Agregar la película a la lista
    });
}

// Función auxiliar para convertir el puntaje en estrellas
function convertirEstrellas(vote_average) {
    const maxEstrellas = 5;
    const puntajeEstrellas = (vote_average / 10) * maxEstrellas;
    let estrellasHTML = "";
    for (let i = 0; i < maxEstrellas; i++) {
        if (i < puntajeEstrellas) {
            estrellasHTML += '<i class="fa fa-star"></i>'; // Estrella llena
        } else {
            estrellasHTML += '<i class="fa fa-star-o"></i>'; // Estrella vacía
        }
    }
    return estrellasHTML;
}