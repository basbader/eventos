// js/eventos.js

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
