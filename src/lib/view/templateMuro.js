import contentMuro from '../function/muro.js';
import contentLogin from '../function/login.js';

export const muro = () => {
  const divMuro = document.createElement('div');
  const ViewMuro = `<div id="muro">
  <div id="nameUser" >
  </div>
  <form id ="form_muro"><h3 class="titulo_muro">¿Qué estas pensando?</h3>
  <textarea name="" id="coment_muro" cols="20" rows="10"></textarea>
  <div id="muro fotos">
  <label class="customFile">
  <input type="file" id="img_muro" class="img_muro">
  </label>
  </div>
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
    const publicar = divMuro.querySelector(('#btn_muro'));
    publicar.addEventListener('click', () => {
      const formMuro = document.getElementById('form_muro');
      contentMuro.imagen();
      contentMuro.guardar();
      formMuro.reset();
    });
    contentMuro.contenidoMuro(user.uid, user.displayName);

  });


  // contentMuro.editar();
  return divMuro;
};
