// js/login.js

// Clase Usuario
class Usuario {
  constructor(username, password, isAdmin = false) {
    this.username = username;  // Usamos 'username'
    this.password = password;
    this.isAdmin = isAdmin;  // Determina si es administrador
  }
}

class Login {
  constructor() {
    this.form = document.getElementById("login-form");
    this.errorMessage = document.getElementById("error-message");  // Mensaje de error
    this.successMessage = document.getElementById("success-message");  // Mensaje de éxito

    // Lista de usuarios (admin y user)
    this.usuarios = [
      new Usuario("admin", "Admin123@", true),  // Admin con contraseña fija
    ];

    // Llamamos a esta función para verificar si hay sesión activa y cerrarla automáticamente
    this.cerrarSesionAutomaticamente();

    this.form.addEventListener("submit", (event) => this.iniciarSesion(event));

    // Función para alternar el menú en dispositivos móviles
    this.toggleMenu = this.toggleMenu.bind(this); // Esto asegura que la función se pueda usar en el contexto correcto
    document.querySelector('.hamburger-menu').addEventListener('click', this.toggleMenu);
  }

  // Función para iniciar sesión
  iniciarSesion(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;  // Usamos 'username' en lugar de 'email'
    const password = document.getElementById("password").value;

    // Regex para validar la contraseña
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Regex para el username (al menos 3 caracteres y solo letras o números)
    const regexUsername = /^[a-zA-Z0-9]{3,}$/;

    // Validar los campos
    if (!regexUsername.test(username)) {
      this.mostrarError("El nombre de usuario debe tener al menos 3 caracteres y solo puede contener letras y números.");
      return;
    }

    if (!regexPassword.test(password)) {
      this.mostrarError("La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.");
      return;
    }

    // Buscar usuario en la lista de usuarios
    let usuario = this.usuarios.find(u => u.username === username);

    if (!usuario) {
      // Si el usuario no está en la lista, creamos un nuevo usuario con contraseña válida
      if (regexPassword.test(password)) {
        usuario = new Usuario(username, password); // Crear un usuario dinámico
        this.usuarios.push(usuario); // Guardar el nuevo usuario en la lista
        localStorage.setItem("sesionActiva", JSON.stringify(usuario)); // Guardamos el usuario en localStorage
        this.mostrarExito(usuario.isAdmin);
      } else {
        this.mostrarError("La contraseña no cumple con los requisitos.");
      }
    } else {
      // Si el usuario existe en la lista, validamos la contraseña
      if (usuario.isAdmin) {
        // Si es admin, solo validamos la contraseña fija
        if (password === usuario.password) {
          localStorage.setItem("sesionActiva", JSON.stringify(usuario));
          this.mostrarExito(usuario.isAdmin);  // Mostrar mensaje de éxito
        } else {
          this.mostrarError("Contraseña incorrecta para el administrador.");
        }
      } else {
        // Si es usuario regular, validamos que la contraseña cumpla con el regex
        if (regexPassword.test(password)) {
          if (password === usuario.password) {
            localStorage.setItem("sesionActiva", JSON.stringify(usuario));
            this.mostrarExito(usuario.isAdmin);  // Mostrar mensaje de éxito
          } else {
            this.mostrarError("Contraseña incorrecta para el usuario.");
          }
        } else {
          this.mostrarError("La contraseña no cumple con los requisitos.");
        }
      }
    }
  }

  // Función para mostrar los mensajes de éxito
  mostrarExito(isAdmin) {
    this.successMessage.style.display = "block";  // Mostrar mensaje de éxito
    this.errorMessage.style.display = "none";  // Ocultar mensaje de error
    setTimeout(() => {
      this.redirigir(isAdmin);  // Redirige según el tipo de usuario (admin o usuario regular)
    }, 2000);  // Redirige después de 2 segundos
  }

  // Función para redirigir según el tipo de usuario
  redirigir(isAdmin) {
    if (isAdmin) {
      window.location.href = "usuario.html";  // Redirigir a la página de Usuario si es admin
    } else {
      window.location.href = "eventos.html";  // Redirigir a la página de Eventos si es usuario regular
    }
  }

  // Función para mostrar los mensajes de error
  mostrarError(message) {
    this.errorMessage.style.display = "block";  // Mostrar mensaje de error
    this.errorMessage.textContent = message;
    this.successMessage.style.display = "none";  // Ocultar mensaje de éxito
  }

  // Función para verificar si ya hay una sesión activa
  verificarSesion() {
    const sesionActiva = JSON.parse(localStorage.getItem("sesionActiva"));
    if (sesionActiva) {
      this.mostrarExito(sesionActiva.isAdmin);  // Llama a mostrarExito para redirigir
    }
  }

  // Función para cerrar la sesión automáticamente si ya está activa
  cerrarSesionAutomaticamente() {
    const sesionActiva = JSON.parse(localStorage.getItem("sesionActiva"));
    if (sesionActiva) {
      localStorage.removeItem("sesionActiva");  // Eliminar sesión activa
    }
  }

  // Función para alternar el menú en dispositivos móviles
  toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
  }
}

// Inicialización del Login
const login = new Login();
