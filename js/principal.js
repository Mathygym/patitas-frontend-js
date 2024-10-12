window.addEventListener('load', function() {
    // Referencia del elemento de la página
    const msgSuccess = this.document.getElementById('msgSuccess');
    const logoutButton = this.document.getElementById('cerrar-seccion'); // Referencia al botón de cierre de sesión
    
    // Recuperar el nombre del usuario del localStorage
    const result = JSON.parse(this.localStorage.getItem('result'));
    console.log(result); 

    if (result && result.nombreUsuario) {
        mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);
    } else {
        mostrarAlerta("No se encontraron datos del usuario. Por favor, inicie sesión nuevamente.");
        // Redirigir a la página de inicio si no hay datos
        window.location.href = 'inicio.html';
        return; // Salir de la función
    }

    logoutButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del enlace
        await cerrarSesion(result); // Llamar a la función de cierre de sesión
    });
});

// Función para mostrar la alerta
function mostrarAlerta(mensaje) {
    const msgSuccess = document.getElementById('msgSuccess');
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = "block";
}

// Función para cerrar sesión
async function cerrarSesion(result) {
    if (!result || !result.tipoDocumento || !result.numeroDocumento) {
        mostrarAlerta("Error: Datos de usuario no válidos.");
        return; // Salir de la función si no hay datos válidos
    }

    const logoutRequest = {
        tipoDocumento: result.tipoDocumento.trim(), // Asegúrate de limpiar espacios
        numeroDocumento: result.numeroDocumento.trim(), // Asegúrate de limpiar espacios
    };
    
    console.log(logoutRequest); // Verifica los datos antes de enviarlos

    try {
        const response = await fetch('http://localhost:8084/login/logout-async', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logoutRequest),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Manejar la respuesta del servidor
            throw new Error(`Error ${response.status}: ${errorData.message || 'Error desconocido'}`);
        }

        const data = await response.json(); // Manejar la respuesta del servidor
        console.log("Cierre de sesión exitoso:", data);
        mostrarAlerta(data.message); // Mostrar mensaje de éxito
        localStorage.removeItem('result');
        window.location.href = 'inicio.html'; // Redirigir a la página de inicio
        console.log(logoutRequest); 
    } catch (error) {
        console.error("Error durante el cierre de sesión:", error);
        mostrarAlerta(`Error al cerrar sesión: ${error.message}`);
    }
}