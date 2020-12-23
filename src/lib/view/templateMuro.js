export const muro = () => {
  const divMuro = document.createElement('div');
  const ViewMuro = `<div id="muro"> 
  <form id ="form_muro"><h3 class="titulo_muro">¿Qué estas pensando?</h3>
  <textarea name="" id="coment_muro" cols="20" rows="10"></textarea>
  <button id="btn_muro">Publicar</button>
  </form>
  <fieldset class="contenido_muro"> 
  <div id="public_muro"></div>
  <br>
  <br>
  <br>
  <br>
  <br>
  </fieldset> 
  </div>  
         `;
  divMuro.innerHTML = ViewMuro;
  const publicar = divMuro.querySelector(('#btn_muro'));
  publicar.addEventListener('click', () => {
    const comentario = document.getElementById('coment_muro').value;
    const lista = document.getElementById('public_muro');
    const listaComentario = document.createElement('div');
    listaComentario.appendChild(document.createTextNode(comentario));
    lista.appendChild(listaComentario);
    const formMuro = document.getElementById('form_muro');
    formMuro.reset();
    const firestore = firebase.firestore();
    const docRef2 = firestore.doc('samples/registro');
    docRef2.collection('coment').add({
      comentarios: comentario,
    });
  });

  // comentPublicado.innerHTML += comentario;
  // const formMuro = document.getElementById('form_muro');
  // formMuro.reset();
  return divMuro;
};
