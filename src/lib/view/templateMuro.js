import contentMuro from '../function/muro.js';
import contentLogin from '../function/login.js';

export const muro = () => {
  contentLogin.estadoLogin();
  const divMuro = document.createElement('div');
  const ViewMuro = `<div id="muro">
  <div id="nameUser" >
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
  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      const nombre = document.querySelector('#nameUser');
      nombre.innerHTML = `
      <p class="saludo">Hola ${user.displayName}</p>
      <button id="singOut" class="titulo_muro">Cerrar Sesion</button>
      `;
      // User is signed in.
    } else {
      // User is signed out.

    }
    const cerrar = divMuro.querySelector(('#singOut'));
    cerrar.addEventListener('click', () => {
      contentLogin.cerrarsesion();
    });
  });

  const publicar = divMuro.querySelector(('#btn_muro'));
  publicar.addEventListener('click', () => {
    const formMuro = document.getElementById('form_muro');
    contentMuro.guardar();
    formMuro.reset();
  });
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      contentMuro.contenidoMuro(user.uid, user.displayName);
    }
  });

  contentMuro.btnBorrar();

  // contentMuro.editar();
  return divMuro;
};
