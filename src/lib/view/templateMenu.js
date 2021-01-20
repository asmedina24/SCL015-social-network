import contentLogin from '../function/login.js';

export const menu = () => {
  const ViewMenu = ` 
  <nav class="navegacion">
  <img class="img_infopet" src="https://i.imgur.com/kIhEsP5.png">
  <div id='nav' class="nav">   
    <ul> 
      <a href="#/home">Home</a>
      <a href="#/register">Registro</a>
    </ul> 
  </div>
  <div id='navLogin' class="navLogin">   
    <button id="singOut" class="cerrar_sesion">Cerrar Sesion</button>
  </div>
  </nav>
    
     `;
  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      const nav = document.getElementById('nav');
      const navLogin = document.getElementById('navLogin');
      nav.style.display = 'none';
      navLogin.style.display = 'block';
      const cerrar = document.querySelector(('#singOut'));
      cerrar.addEventListener('click', () => {
        contentLogin.cerrarsesion();
      });
    } else {
      const nav = document.getElementById('nav');
      const navLogin = document.getElementById('navLogin');
      nav.style.display = 'block';
      navLogin.style.display = 'none';
    }
  });
  return ViewMenu;
};
