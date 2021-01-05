export const muro = () => {
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
  const publicar = divMuro.querySelector(('#btn_muro'));
  publicar.addEventListener('click', () => {
    const comentario = document.getElementById('coment_muro').value;
    const formMuro = document.getElementById('form_muro');
    formMuro.reset();
    const firestore = firebase.firestore();
    firestore.collection('coment').add({
      comentarios: comentario,
      date: new Date(),
    }).then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    // firestore.collection('coment').get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     // eslint-disable-next-line no-consolesssssssss
    //     const lista = document.getElementById('public_muro');
    //     // const listaComentario = document.createElement('div');
    //     // listaComentario.appendChild(document.createTextNode(`${doc.data().comentarios}`));
    //     // lista.appendChild(listaComentario);
    //     lista.innerHTML = '';
    //     lista.innerHTML += `<div>
    //           <textarea class=""> ${doc.data().comentarios}</textarea>
    //           <button class="">Comentarios</button>
    //           <button class="">Borrar</button>
    //           </div>
    //           <div class="commentDiv">
    //             </div>`;
    //   });
    // });
  });
  const firestore = firebase.firestore();
  firestore.collection('coment', 'users').onSnapshot((querySnapshot) => {
    const lista = document.getElementById('public_muro');
    lista.innerHTML = '';
    querySnapshot.forEach((doc) => {
      // console.log('Document data:', doc.data());
      // const lista = document.getElementById('public_muro');
      // const formMuro = document.getElementById('form_muro');
      // formMuro.reset();
      // lista.innerHTML = '';
      lista.innerHTML += `<div id="postDiv-${doc.id}">
        <div class="text-area"> 
                <p>Publicado por ${doc.data().nombre}</p>
                <p class=""> ${doc.data().comentarios}</p>
                <p class=""> ${doc.data().date}</p>
                 </div>
                <button class="" id="delete-${doc.id} ">Editar</button>
                <button class="" id="delete">Borrar</button>
                <button class="">Me gusta</button>
                </div>
                <div class="commentDiv">
                  </div>`;
    });
    // const borrar = divMuro.querySelector('#delete');
    // borrar.addEventListener('click', () => {
    //   firestore.collection('coment').doc('coment').delete().then(() => {
    //     console.log('Document successfully deleted!');
    //   })
    //     .catch((error) => {
    //       console.error('Error removing document: ', error);
    //     });
    // });
  });
  return divMuro;
};
