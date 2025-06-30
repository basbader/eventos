// js/inicio.js

// Función para mostrar las pestañas correspondientes
function showTab(tabName) {
  const contentSections = document.querySelectorAll('.content');
  contentSections.forEach(section => section.classList.remove('active'));

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  document.getElementById(tabName).classList.add('active');
  document.querySelector(`a[href='#${tabName}']`).classList.add('active');
}

// Función para alternar el menú en dispositivos móviles
function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.toggle('active');
}

// Slider de imágenes (cambia cada 5 segundos)
let currentImageIndex = 0;
const images = document.querySelectorAll('.slider-image');
const totalImages = images.length;

function changeImage() {
  // Ocultar la imagen actual
  images[currentImageIndex].style.opacity = 0;

  // Cambiar al siguiente índice
  currentImageIndex = (currentImageIndex + 1) % totalImages;

  // Mostrar la nueva imagen
  images[currentImageIndex].style.opacity = 1;
}

// Iniciar el cambio de imágenes cada 5 segundos
setInterval(changeImage, 5000);

// Inicializa el slider mostrándolo
images[currentImageIndex].style.opacity = 1;

// Clase para manejar eventos
class Evento {
  constructor(tipoEvento, nombre, apellido, telefono, email) {
    this.tipoEvento = tipoEvento;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
  }

  // Método para mostrar la información del evento en formato HTML
  toHTML() {
    return `
      <tr>
        <td>${this.tipoEvento}</td>
        <td>${this.nombre}</td>
        <td>${this.apellido}</td>
        <td>${this.telefono}</td>
        <td>${this.email}</td>
        <td>
          <button class="editar-btn">Editar</button>
          <button class="eliminar-btn">Eliminar</button>
          <button class="estado-btn">Estado</button>
        </td>
      </tr>
    `;
  }
}

// Clase para gestionar el formulario
class Formulario {
  constructor(formulario, tablaBody, mensajeExito) {
    this.formulario = formulario;
    this.tablaBody = tablaBody;
    this.mensajeExito = mensajeExito;

    // Maneja el evento de envío del formulario
    this.formulario.addEventListener('submit', this.registrarEvento.bind(this));
  }

  // Maneja el registro del evento
  registrarEvento(event) {
    event.preventDefault(); // Evita la recarga de la página

    // Obtener los valores del formulario
    const tipoEvento = document.getElementById('tipo-evento').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    // Validar los campos
    if (!this.validarCampos(nombre, apellido, telefono, email)) {
      return;  // Si la validación falla, no continuamos
    }

    // Crear un nuevo evento
    const nuevoEvento = new Evento(tipoEvento, nombre, apellido, telefono, email);

    // Guardar el evento en localStorage
    this.guardarEvento(nuevoEvento);

    // Limpiar el formulario
    this.formulario.reset();

    // Mostrar mensaje de éxito
    this.mostrarMensajeExito();

    // Agregar el evento a la tabla
    this.agregarEventoATabla(nuevoEvento);

    // Redirigir a la página de eventos después de registrar
    setTimeout(() => {  // Esperamos un poco para asegurar que todo se haya procesado
      window.location.href = "eventos.html";  // Redirige automáticamente a eventos.html
    }, 1500); // Espera 1.5 segundos antes de redirigir
  }

  // Guardar el evento en localStorage
  guardarEvento(evento) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(evento);
    localStorage.setItem('registros', JSON.stringify(registros));
  }

  // Mostrar el mensaje de éxito
  mostrarMensajeExito() {
    this.mensajeExito.style.display = 'block';
    setTimeout(() => {
      this.mensajeExito.style.display = 'none';
    }, 3000);
  }

  // Agregar el evento a la tabla
  agregarEventoATabla(evento) {
    this.tablaBody.innerHTML += evento.toHTML();

    // Agregar los eventos de los botones
    this.agregarEventosBotones();
  }

  // Agregar los eventos de los botones de editar, eliminar y estado
  agregarEventosBotones() {
    document.querySelectorAll('.editar-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const nombre = row.querySelector('td:nth-child(2)').textContent;
        alert(`Editando el evento: ${nombre}`);
      });
    });

    document.querySelectorAll('.eliminar-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        row.remove();
      });
    });

    document.querySelectorAll('.estado-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const estado = prompt('Estado del evento: Activo, Pendiente, Finalizado', 'Activo');
        if (estado) {
          row.querySelector('td:nth-child(6)').textContent = estado;
        }
      });
    });
  }

  // Función para validar los campos del formulario
  validarCampos(nombre, apellido, telefono, email) {
    // Regex para nombre (solo letras y espacios)
    const regexNombreApellido = /^[a-zA-Z\s]+$/;
    if (!regexNombreApellido.test(nombre) || !regexNombreApellido.test(apellido)) {
      alert('El nombre y el apellido deben contener solo letras y espacios.');
      return false;
    }

    // Regex para teléfono (solo números enteros)
    const regexTelefono = /^\d+$/;  // Solo acepta números enteros
    if (!regexTelefono.test(telefono)) {
      alert('El teléfono debe contener solo números.');
      return false;
    }

    // Regex para correo electrónico
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email)) {
      alert('Por favor ingrese un correo electrónico válido.');
      return false;
    }

    return true;
  }
}

// Clase principal para manejar la lógica de la app
class App {
  constructor() {
    this.formulario = document.getElementById('registro-form');
    this.tablaBody = document.getElementById('tablaBody');
    this.mensajeExito = document.getElementById('mensaje-exito');

    // Crear una instancia de la clase Formulario para gestionar los registros
    this.formularioApp = new Formulario(this.formulario, this.tablaBody, this.mensajeExito);

    // Cargar los eventos guardados al cargar la página
    this.cargarEventosGuardados();
  }

  // Cargar los registros guardados al cargar la página
  cargarEventosGuardados() {
    const eventosGuardados = JSON.parse(localStorage.getItem('registros')) || [];
    eventosGuardados.forEach((evento) => {
      this.formularioApp.agregarEventoATabla(evento);
    });
  }
}

// Inicializar la aplicación
const app = new App();
