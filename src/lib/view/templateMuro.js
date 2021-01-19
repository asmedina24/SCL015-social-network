import contentMuro from '../function/muro.js';
import contentLogin from '../function/login.js';

export const muro = () => {
  const currentUserData = firebase.auth().currentUser;
  const displayName = currentUserData.displayName;
  const divMuro = document.createElement('div');
  const ViewMuro = `<div id="muro">
  <div class= "saludoCierre">
  <button id="singOut" class="btnSingOut">Cerrar Sesion</button>
  <p class="saludo">Hola ${displayName} </p>
  </div>
  <form id ="form_muro"><h3 class="titulo_muro">¿Qué estas pensando?</h3>
  <input type= "text" class= "inputPublicar" id="coment_muro">
  <button id="btn_muro">Publicar</button>
  </form>
   <div id="public_muro"></div>
 
  <br>
  <br>
  <br>
  <br>
  <br>
  </div>  
         `;

  divMuro.innerHTML = ViewMuro;

  const publicar = divMuro.querySelector(('#btn_muro'));
  publicar.addEventListener('click', () => {
    const formMuro = document.getElementById('form_muro');
    contentMuro.guardar();
    formMuro.reset();
  });
  const cerrar = divMuro.querySelector(('#singOut'));
  cerrar.addEventListener('click', () => {
    contentLogin.cerrarsesion();
  });
  contentMuro.contenidoMuro();
  contentMuro.btnBorrar();

  return divMuro;
};
