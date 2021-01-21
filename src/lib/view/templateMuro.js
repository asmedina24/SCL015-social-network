import contentMuro from '../function/muro.js';

export const muro = () => {
  const divMuro = document.createElement('div');
  const ViewMuro = `<div id="muro">
  <div id="nameUser" >
  </div>
  <form id ="form_muro"><h3 class="titulo_muro">¿Qué estas pensando?</h3>
  <textarea name="" id="coment_muro" cols="20" rows="10"></textarea>
  <input type="file" id="img_muro" class="img_muro"> <br> <button id="btn_subir">Adjuntar</button>
  </form>
  <button id="btn_muro" class="button">Publicar</button>
   <div id="public_muro"></div>

 
  <br>
  <br>
  <br>
  <br>
  <br>
  </div>  
         `;

  divMuro.innerHTML = ViewMuro;
  firebase.auth().onAuthStateChanged((user) => { // Autenticar usuario
    if (user !== null) {
      const nombre = document.querySelector('#nameUser');
      nombre.innerHTML = `
      <p class="saludo">Hola ${user.displayName}</p>

      `;
      // User is signed in.
    } else {
      // User is signed out.

    }

    const subir = divMuro.querySelector(('#btn_subir'));
    subir.addEventListener('click', () => {
      contentMuro.imagen();
    });
    const publicar = divMuro.querySelector(('#btn_muro'));
    publicar.addEventListener('click', () => {
      const formMuro = document.getElementById('form_muro');
      // contentMuro.imagen(user.uid);
      contentMuro.urlImg(user.uid, user.displayName);
      formMuro.reset();
    });

    contentMuro.contenidoMuro(user.uid, user.displayName);
  });

  return divMuro;
};
