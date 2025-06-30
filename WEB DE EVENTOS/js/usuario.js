document.addEventListener('DOMContentLoaded', () => {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];

  // Función para crear una fila en la tabla de registros
  const crearFila = (usuario, index) => {
    const fila = document.createElement('tr');
    fila.dataset.index = index;

    fila.innerHTML = `
      <td>${usuario.tipoEvento}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td>${usuario.telefono}</td>
      <td>${usuario.email}</td>
      <td><button class="state" onclick="cambiarEstado(${index})">${usuario.estado}</button></td>
      <td>
        <button class="edit" onclick="editarUsuario(${index})">Editar</button>
        <button class="delete" onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;

    return fila;
  };

  // Función para cambiar el estado (Activo, Pendiente, Finalizado)
  window.cambiarEstado = (index) => {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const usuario = registros[index];
    const nuevoEstado = prompt("Ingrese el nuevo estado (Activo, Pendiente, Finalizado):", usuario.estado);
    
    if (nuevoEstado && ["Activo", "Pendiente", "Finalizado"].includes(nuevoEstado)) {
      usuario.estado = nuevoEstado;
      localStorage.setItem('registros', JSON.stringify(registros));
      actualizarFila(index, usuario); // Actualizar la fila directamente
    } else {
      alert("Estado inválido.");
    }
  };

  // Función para editar los usuarios
  window.editarUsuario = (index) => {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const usuario = registros[index];

    const nuevoNombre = prompt('Nuevo nombre', usuario.nombre);
    const nuevoApellido = prompt('Nuevo apellido', usuario.apellido);
    const nuevoTelefono = prompt('Nuevo teléfono', usuario.telefono);
    const nuevoEmail = prompt('Nuevo correo electrónico', usuario.email);

    if (nuevoNombre && nuevoApellido && nuevoTelefono && nuevoEmail) {
      usuario.nombre = nuevoNombre;
      usuario.apellido = nuevoApellido;
      usuario.telefono = nuevoTelefono;
      usuario.email = nuevoEmail;

      localStorage.setItem('registros', JSON.stringify(registros));
      actualizarFila(index, usuario); // Actualizar la fila directamente
    }
  };

  // Función para eliminar un usuario
  window.eliminarUsuario = (index) => {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      const registros = JSON.parse(localStorage.getItem('registros')) || [];
      registros.splice(index, 1);
      localStorage.setItem('registros', JSON.stringify(registros));
      eliminarFila(index); // Eliminar la fila directamente
    }
  };

  // Función para cargar la tabla de registros
  const cargarTabla = () => {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const tabla = document.getElementById('usuario-table').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar la tabla antes de volver a llenarla

    registros.forEach((usuario, index) => {
      tabla.appendChild(crearFila(usuario, index));
    });
  };

  // Función para actualizar una fila existente en la tabla
  const actualizarFila = (index, usuario) => {
    const fila = document.querySelector(`[data-index="${index}"]`);
    fila.innerHTML = `
      <td>${usuario.tipoEvento}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td>${usuario.telefono}</td>
      <td>${usuario.email}</td>
      <td><button class="state" onclick="cambiarEstado(${index})">${usuario.estado}</button></td>
      <td>
        <button class="edit" onclick="editarUsuario(${index})">Editar</button>
        <button class="delete" onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;
  };

  // Función para eliminar una fila de la tabla
  const eliminarFila = (index) => {
    const fila = document.querySelector(`[data-index="${index}"]`);
    fila.remove();
  };

  // Función para agregar un nuevo usuario a la tabla
  window.agregarUsuario = (usuario) => {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(usuario);
    localStorage.setItem('registros', JSON.stringify(registros));
    cargarTabla(); // Recargar la tabla para reflejar el nuevo registro
  };

  // Llamada inicial para cargar los registros guardados al cargar la página
  cargarTabla();

  // Función para alternar el menú en dispositivos móviles
  function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
  }

  // Asignamos el evento al botón hamburguesa
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', toggleMenu);
  }
});
