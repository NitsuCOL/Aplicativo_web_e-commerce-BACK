// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario de login
    const loginForm = document.getElementById('loginForm');
    
    // Agregar un evento submit al formulario
    loginForm.addEventListener('submit', function(e) {
        // Prevenir el comportamiento por defecto del formulario
        e.preventDefault();
        
        // Obtener los valores ingresados por el usuario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Cargar el archivo JSON con las credenciales
        fetch('/assets/js/usuarios.json')
            .then(response => {
                // Verificar si la respuesta es correcta
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo JSON');
                }
                return response.json();
            })
            .then(data => {
                // Buscar si existe un usuario con las credenciales proporcionadas
                const usuario = data.usuarios.find(user => 
                    user.email === email && user.password === password
                );
                
                // Obtener el elemento donde mostraremos el mensaje
                const mensajeElement = document.getElementById('mensaje');
                
                // Verificar si el usuario existe
                if (usuario) {
                    // Login exitoso
                    mensajeElement.textContent = `¡Bienvenido ${usuario.nombre}!`;
                    mensajeElement.style.color = 'green';
                    
                    // Guardar información del usuario en localStorage para mantener la sesión
                    localStorage.setItem('usuarioActual', JSON.stringify({
                        nombre: usuario.nombre,
                        email: usuario.email
                    }));
                    
                    // Redirigir a la página principal después de un breve retraso
                    setTimeout(() => {
                        window.location.href = '/index.html';
                    }, 1500);
                } else {
                    // Credenciales incorrectas
                    mensajeElement.textContent = 'Correo electrónico o contraseña incorrectos';
                    mensajeElement.style.color = 'red';
                }
            })
            .catch(error => {
                // Manejar errores en la carga del JSON
                console.error('Error:', error);
                document.getElementById('mensaje').textContent = 'Error en el sistema. Intente más tarde.';
                document.getElementById('mensaje').style.color = 'red';
            });
    });
});