import contentMuro from '../function/muro.js';
import contentLogin from '../function/login.js';

export const muro = () => {
  const currentUserData = firebase.auth().currentUser;
  const displayName = currentUserData.displayName;
  const divMuro = document.createElement('div');
  const ViewMuro = `<div id="muro">
  <div>
  <p class="saludo">Hola ${displayName} </p>
  <button id="singOut" class="titulo_muro">Cerrar Sesion</button>
  </div>
  <form id ="form_muro"><h3 class="titulo_muro">¿Qué estas pensando?</h3>
  <textarea name="" id="coment_muro" cols="20" rows="10"></textarea>
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
