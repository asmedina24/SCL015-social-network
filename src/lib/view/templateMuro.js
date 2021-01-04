export const muro = () => {
  firebase.firestore().collection('profile').where('email', '==', 'alejandramedina1215@gmail.com').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userName = doc.data().userName;
        const email = doc.data().email;
        const divMuro = document.createElement('div');
        const ViewMuro = `<div id="muro"> 
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
        const publicar = divMuro.querySelector('#btn_muro'); // boton para publicar
        publicar.addEventListener('click', () => {
          const comentario = document.getElementById('coment_muro').value; // trae lo q esta en texarea
          const lista = document.getElementById('public_muro'); // trae lo q esta en id q se  va a publicar
          const listaComentario = document.createElement('div'); // crea un div
          // listaComentario.appendChild(document.createTextNode(comentario));
          lista.appendChild(listaComentario); // id public muro se crea un div
          const formMuro = document.getElementById('form_muro');
          formMuro.reset();
          const firestore = firebase.firestore();
          const docRef2 = firestore.doc('samples/registro');
          docRef2.collection('coment').add({
            comentarios: comentario,
          });
          firestore.collection('coment').onSnapshot((querySnapshot) => {
            // vaciando div para que no se repitan los post
            listaComentario.innerHTML = '';
            querySnapshot.forEach((doc) => {
              listaComentario.innerHTML += `<div> <p> o</p>
              <textarea class=""> ${doc.data().comentarios}</textarea>
              <button class="">Comentarios</button>
              <button class="">Borrar</button>
              </div>
              <div class="commentDiv">
                </div>`;
            });
          });
        });
      });
    });
  return muro;
};
